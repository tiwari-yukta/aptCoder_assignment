<script setup>
import TaskItem from "./TaskItem.vue";

defineProps({
  openTasks:      { type: Array, required: true },
  completedTasks: { type: Array, required: true },
  isLoading:      Boolean,
});

defineEmits(["toggle", "update", "delete"]);
</script>

<template>

  <template v-if="isLoading">
    <div class="section-label">Open tasks</div>
    <div class="card">
      <div v-for="n in 3" :key="n" class="skeleton-row">
        <div class="sk sk-box" />
        <div class="sk-lines">
          <div class="sk sk-line" :style="{ width: (60 + n * 10) + '%' }" />
          <div class="sk sk-line-sm" />
        </div>
      </div>
    </div>
  </template>


  <template v-else>


    <div class="section-label">Open tasks</div>
    <div class="card">
      <div v-if="openTasks.length === 0" class="empty">All caught up!</div>
      <TaskItem
        v-for="todo in openTasks"
        :key="todo.id"
        :todo="todo"
        @toggle="$emit('toggle', $event)"
        @update="$emit('update', $event[0], $event[1])"
        @delete="$emit('delete', $event)"
      />
    </div>

    <div class="section-label" style="margin-top: 1.25rem;">Completed</div>
    <div class="card">
      <div v-if="completedTasks.length === 0" class="empty">Nothing completed yet</div>
      <TaskItem
        v-for="todo in completedTasks"
        :key="todo.id"
        :todo="todo"
        @toggle="$emit('toggle', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>

  </template>
</template>

<style scoped>
.empty {
  padding: 20px;
  font-size: 13px;
  color: #aaa9a3;
  text-align: center;
}


.skeleton-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  border-bottom: 0.5px solid #EDECEA;
}

.skeleton-row:last-child { border-bottom: none; }

.sk {
  background: #EDECEA;
  border-radius: 6px;
  animation: shimmer 1.2s ease-in-out infinite;
}

.sk-box    { width: 20px; height: 20px; flex-shrink: 0; }
.sk-lines  { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.sk-line   { height: 13px; }
.sk-line-sm{ height: 10px; width: 80px; }

@keyframes shimmer {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
</style>