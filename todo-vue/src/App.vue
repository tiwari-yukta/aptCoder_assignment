<script setup>
import { onMounted } from "vue";

import { useTodos } from "./composables/useTodos.js";
import AppToast from "./components/AppToast.vue";
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TaskList from "./components/TaskList.vue";

const {
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
} = useTodos();

onMounted(fetchTodos);
</script>

<template>
  <div class="app">
    <div class="container">
      <AppToast :toastMsg="toastMsg" :error="error" @retry="fetchTodos" />

      <TodoHeader
        :total="todos.length"
        :openCount="openTasks.length"
        :doneCount="completedTasks.length"
        :progressPct="progressPct"
      />
      <TodoInput :isAdding="isAdding" @add="addTodo" />

      <TaskList
        :openTasks="openTasks"
        :completedTasks="completedTasks"
        :isLoading="isLoading"
        @toggle="toggleTodo"
        @update="(todo, title) => updateTodo(todo, title)"
        @delete="deleteTodo"
      />
    </div>
  </div>
</template>

<style>
@import "/src/assets/todo.css";

.app {
  padding: 2.5rem 1.5rem;
  min-height: 100vh;
}

.container {
  max-width: 680px;
  margin: 0 auto;
  position: relative;
}
</style>
