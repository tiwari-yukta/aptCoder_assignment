<script setup>
defineProps({
  toastMsg: String,
  error: String,
});

defineEmits(["retry"]);
</script>

<template>
  <transition name="toast">
    <div v-if="toastMsg" class="toast">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.2" />
        <path
          d="M7 4.5v3M7 9.5h.01"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
        />
      </svg>
      {{ toastMsg }}
    </div>
  </transition>

  <div v-if="error" class="error-banner">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.2" />
      <path
        d="M7 4.5v3M7 9.5h.01"
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linecap="round"
      />
    </svg>
    {{ error }}
    <button class="retry-btn" @click="$emit('retry')">Retry</button>
  </div>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #1a1a18;
  color: #fff;
  font-size: 13px;
  padding: 10px 16px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 100;
  white-space: nowrap;
}

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
}

.error-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fcebeb;
  color: #a32d2d;
  font-size: 13px;
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 1.25rem;
  border: 0.5px solid #f7c1c1;
}

.retry-btn {
  margin-left: auto;
  background: transparent;
  border: 0.5px solid #a32d2d;
  color: #a32d2d;
  font-size: 12px;
  font-family: "DM Sans", sans-serif;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.retry-btn:hover {
  background: #f7c1c1;
}
</style>
