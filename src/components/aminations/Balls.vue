<script setup lang="ts"></script>

<template>
  <div class="floating-balls">
    <div class="ball"></div>
    <div class="ball"></div>
    <div class="ball"></div>
  </div>

</template>

<style lang="scss" scoped>
/* Плавающие шары */
.floating-balls {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ball {
  position: absolute;
  width: 20%;
  height: 20%;
  background: var(--main-animation-color);
  border-radius: 50%;
  animation: float 3s ease-in-out infinite;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.ball:nth-child(2) {
  background: var(--main-animation-color);
  animation-delay: -0.5s;
}

.ball:nth-child(3) {
  background: var(--main-animation-color);
  animation-delay: -1s;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(70%) scale(1);
  }

  50% {
    transform: translateY(-70%) scale(1.1);
  }
}

@keyframes rotate {
  0% {
    transform: rotateX(0) rotateY(0);
  }

  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
}

@keyframes waveFlow {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(0%);
  }
}
</style>
