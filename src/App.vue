<template>
  <router-view v-slot="{ Component }">
    <transition
        name="fade"
        mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  50% {
    transform: translateY(-100px) scale(1.5);
    opacity: 0.5;
  }
}

.particle {
  animation: float 10s infinite ease-in-out;
}

.preserve-3d {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

/* Netflix 폰트 적용 */
@font-face {
  font-family: 'Netflix Sans';
  src: url('https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Rg.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Netflix Sans';
  src: url('https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Md.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Netflix Sans';
  src: url('https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Bd.woff2') format('woff2');
  font-weight: bold;
  font-style: normal;
}

.netflix-sans {
  font-family: 'Netflix Sans', Helvetica, Arial, sans-serif;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background: linear-gradient(to bottom, #FFFFFF 0%, #888888 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.aspect-video {
  aspect-ratio: 16 / 9;
}

@tailwind base;
@tailwind components;
@tailwind utilities;
</style>