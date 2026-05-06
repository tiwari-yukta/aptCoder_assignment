<script setup>
import { ref } from "vue";

const props = defineProps({
  todo: { type: Object, required: true },
});

const emit = defineEmits(["toggle", "update", "delete"]);
``;
const isEditing = ref(false);
const editText = ref("");

function startEdit() {
  editText.value = props.todo.title;
  isEditing.value = true;
}

function cancelEdit() {
  isEditing.value = false;
  editText.value = "";
}

function saveEdit() {
  const trimmed = editText.value.trim();
  if (!trimmed) return cancelEdit();
  if (trimmed !== props.todo.title) emit("update", props.todo, trimmed);
  cancelEdit();
}

const vFocus = {
  mounted(el) {
    el.focus();
    el.select();
  },
};
</script>

<template>
  <div class="task-item" :class="{ completed: todo.completed }">
    <!-- Checkbox -->
    <div
      class="checkbox-wrap"
      :class="{ checked: todo.completed }"
      @click="$emit('toggle', todo)"
    >
      <svg
        v-if="todo.completed"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <polyline
          points="2,6 5,9 10,3"
          stroke="white"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <template v-if="isEditing">
      <input
        v-focus
        class="inline-edit"
        v-model="editText"
        @keydown.enter="saveEdit"
        @keydown.esc="cancelEdit"
      />
      <div class="edit-actions">
        <button class="btn-save" @click="saveEdit">Save</button>
        <button class="btn-cancel" @click="cancelEdit">Cancel</button>
      </div>
    </template>

    <template v-else>
      <div class="task-body">
        <span class="task-title">{{ todo.title }}</span>
        <span class="task-date">{{ todo.createdAt }}</span>
      </div>
      <div class="task-actions">
        <button
          v-if="!todo.completed"
          class="btn-icon"
          @click="startEdit"
          title="Edit"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <button
          class="btn-icon danger"
          @click="$emit('delete', todo.id)"
          title="Delete"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 3.5h10M5 3.5V2.5h4v1M5.5 6v4M8.5 6v4M3 3.5l.7 7.2A1 1 0 004.7 12h4.6a1 1 0 001-.8L11 3.5"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  border-bottom: 0.5px solid #edecea;
  transition: background 0.1s;
}

.task-item:last-child {
  border-bottom: none;
}
.task-item:hover {
  background: #fafaf8;
}
.task-item.completed {
  opacity: 0.6;
}

.checkbox-wrap {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border: 1.5px solid #c8c6be;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    border-color 0.15s,
    background 0.15s;
}

.checkbox-wrap.checked {
  background: #1a1a18;
  border-color: #1a1a18;
}

.task-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.task-title {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a18;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: #888780;
}

.task-date {
  font-size: 11px;
  color: #aaa9a3;
  font-family: "DM Mono", monospace;
  margin-top: 2px;
}

.inline-edit {
  flex: 1;
  border: 0.5px solid #888780;
  border-radius: 7px;
  padding: 6px 10px;
  font-size: 14px;
  font-family: "DM Sans", sans-serif;
  color: #1a1a18;
  outline: none;
  background: #f7f6f3;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

.edit-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.btn-save {
  background: #1a1a18;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 5px 12px;
  font-size: 12px;
  font-family: "DM Sans", sans-serif;
  font-weight: 500;
  cursor: pointer;
}

.btn-save:hover {
  background: #333330;
}

.btn-cancel {
  background: transparent;
  color: #888780;
  border: 0.5px solid #d4d2cb;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 12px;
  font-family: "DM Sans", sans-serif;
  cursor: pointer;
}

.btn-cancel:hover {
  background: #f0efea;
  color: #1a1a18;
}

.task-actions {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.15s;
}
.task-item:hover .task-actions {
  opacity: 1;
}

.btn-icon {
  border: none;
  background: transparent;
  width: 30px;
  height: 30px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #888780;
  transition:
    background 0.1s,
    color 0.1s;
}

.btn-icon:hover {
  background: #f0efea;
  color: #1a1a18;
}
.btn-icon.danger:hover {
  background: #fcebeb;
  color: #a32d2d;
}
</style>
