<script setup lang="ts"></script>

<template>
  <div class="cube-container">
    <div class="cube">
      <div class="face front"></div>
      <div class="face back"></div>
      <div class="face right"></div>
      <div class="face left"></div>
      <div class="face top"></div>
      <div class="face bottom"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* Вращающийся куб */
.cube-container {
  width: 150px;
  height: 150px;
  perspective: var(--perspective);
  pointer-events: none;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: rotate 8s linear infinite;
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
  border: 2px solid #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: white;
}

.front {
  transform: translateZ(75px);
}

.back {
  transform: rotateY(180deg) translateZ(75px);
}

.right {
  transform: rotateY(90deg) translateZ(75px);
}

.left {
  transform: rotateY(-90deg) translateZ(75px);
}

.top {
  transform: rotateX(90deg) translateZ(75px);
}

.bottom {
  transform: rotateX(-90deg) translateZ(75px);
}

@keyframes rotate {
  0% {
    transform: rotateX(0) rotateY(0);
  }

  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
}
</style>
