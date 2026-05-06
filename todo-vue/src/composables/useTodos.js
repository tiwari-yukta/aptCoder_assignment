import { ref, computed } from "vue";
import axios from "axios";

const API = "http://localhost:3001/todos";

export function useTodos() {
  const todos = ref([]);
  const isLoading = ref(false);
  const isAdding = ref(false);
  const error = ref(null);
  const toastMsg = ref(null);

  let toastTimer = null;

  function showToast(msg) {
    toastMsg.value = msg;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toastMsg.value = null), 3000);
  }

  async function fetchTodos() {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await axios.get(API);
      todos.value = res.data;
    } catch {
      error.value = "Could not load tasks. Is the server running?";
    } finally {
      isLoading.value = false;
    }
  }

  async function addTodo(title) {
    if (!title.trim() || isAdding.value) return;
    isAdding.value = true;
    const now = new Date();
    const todo = {
      title: title.trim(),
      completed: false,
      createdAt:
        now.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
        ", " +
        now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };
    try {
      const res = await axios.post(API, todo);
      todos.value.unshift(res.data);
    } catch {
      showToast("Failed to add task. Please try again.");
    } finally {
      isAdding.value = false;
    }
  }

  async function toggleTodo(todo) {
    todo.completed = !todo.completed;
    try {
      const res = await axios.patch(`${API}/${todo.id}`, {
        completed: todo.completed,
      });
      todo.completed = res.data.completed;
    } catch {
      todo.completed = !todo.completed;
      showToast("Failed to update task.");
    }
  }

  async function updateTodo(todo, newTitle) {
    const oldTitle = todo.title;
    todo.title = newTitle;
    try {
      const res = await axios.patch(`${API}/${todo.id}`, { title: newTitle });
      todo.title = res.data.title;
    } catch {
      todo.title = oldTitle;
      showToast("Failed to save edit.");
    }
  }

  async function deleteTodo(id) {
    const backup = [...todos.value];
    todos.value = todos.value.filter((t) => t.id !== id);
    try {
      await axios.delete(`${API}/${id}`);
    } catch {
      todos.value = backup;
      showToast("Failed to delete task.");
    }
  }

  const openTasks = computed(() => todos.value.filter((t) => !t.completed));
  const completedTasks = computed(() => todos.value.filter((t) => t.completed));
  const progressPct = computed(() => {
    if (!todos.value.length) return 0;
    return Math.round((completedTasks.value.length / todos.value.length) * 100);
  });

  return {
    todos,
    isLoading,
    isAdding,
    error,
    toastMsg,
    openTasks,
    completedTasks,
    progressPct,
    fetchTodos,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
  };
}
