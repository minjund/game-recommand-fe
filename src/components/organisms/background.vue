<template>
  <div class="fixed inset-0 w-full h-full">
    <!-- Background Image -->
    <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('/src/assets/steam-background.svg');"
    ></div>
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/90 to-transparent"></div>
    <!-- Animated Particles -->
    <div class="absolute inset-0">
      <div
          v-for="n in 50"
          :key="n"
          class="particle absolute rounded-full bg-white/20"
          :style="getParticleStyle()"
      ></div>
    </div>
  </div>
</template>

<script setup>
const getParticleStyle = () => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  transform: `scale(${Math.random()})`,
  animationDelay: `${Math.random() * 5}s`,
  width: `${Math.random() * 3}px`,
  height: `${Math.random() * 3}px`
})
</script>