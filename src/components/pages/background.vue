<template>
  <div class="fixed inset-0 w-full h-full bg-black">
    <!-- 애니메이션 배경 그라데이션 -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-900 to-black opacity-50"></div>

    <!-- 플로팅 도형 -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.35;
  }
}
</style>