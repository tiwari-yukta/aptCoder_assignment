<script setup>
defineProps({
  total:       Number,
  openCount:   Number,
  doneCount:   Number,
  progressPct: Number,
});
</script>

<template>
  <div>

    <div class="header">
      <h1>Tasks</h1>
      <span class="tag">{{ total }} total</span>
    </div>


    <div class="stats">
      <div class="stat-card">
        <div class="stat-label">Open</div>
        <div class="stat-value">{{ openCount }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Done</div>
        <div class="stat-value">{{ doneCount }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Progress</div>
        <div class="stat-value">{{ total ? progressPct + "%" : "—" }}</div>
      </div>
    </div>

    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progressPct + '%' }" />
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 1.5rem;
}

.header h1 {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.4px;
  color: #1a1a18;
}

.tag {
  font-size: 12px;
  font-weight: 500;
  background: #E8E6E0;
  color: #5a5a56;
  padding: 3px 9px;
  border-radius: 20px;
  font-family: 'DM Mono', monospace;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.stat-card {
  background: #fff;
  border: 0.5px solid #D4D2CB;
  border-radius: 12px;
  padding: 14px 16px;
}

.stat-label {
  font-size: 11px;
  color: #888780;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 22px;
  font-weight: 600;
  color: #1a1a18;
  letter-spacing: -0.5px;
  font-family: 'DM Mono', monospace;
}

.progress-bar {
  height: 4px;
  background: #EDECEA;
  border-radius: 2px;
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #1a1a18;
  border-radius: 2px;
  transition: width 0.4s ease;
}
</style>