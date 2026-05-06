<script setup>
import { ref } from "vue";

defineProps({ isAdding: Boolean });


const emit = defineEmits(["add"]);

const newTask = ref("");

function handleAdd() {
  if (!newTask.value.trim()) return;
  emit("add", newTask.value.trim());
  newTask.value = "";
}
</script>

<template>
  <div class="add-task" :class="{ disabled: isAdding }">
    <input
      v-model="newTask"
      placeholder="What needs to be done?"
      :disabled="isAdding"
      @keydown.enter="handleAdd"
    />
    <button @click="handleAdd" :disabled="isAdding">
      <span v-if="isAdding" class="spinner" />
      <span v-else>Add task</span>
    </button>
  </div>
</template>

<style scoped>
.add-task {
  display: flex;
  gap: 8px;
  margin-bottom: 1.5rem;
  background: #fff;
  border: 0.5px solid #D4D2CB;
  border-radius: 12px;
  padding: 6px 6px 6px 14px;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.add-task:focus-within {
  border-color: #888780;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

.add-task.disabled { opacity: 0.6; }

.add-task input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  color: #1a1a18;
  padding: 4px 0;
}

.add-task input::placeholder { color: #aaa9a3; }
.add-task input:disabled      { cursor: not-allowed; }

.add-task button {
  background: #1a1a18;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
  white-space: nowrap;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-task button:hover:not(:disabled)  { background: #333330; }
.add-task button:active:not(:disabled) { transform: scale(0.97); }
.add-task button:disabled              { opacity: 0.6; cursor: not-allowed; }
</style>