<script setup lang="ts"></script>
<template>
  <div class="pyramid">
    <div class="face front"></div>
    <div class="face back"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>
</template>
<style lang="scss" scoped>
.pyramid {
  position: relative;
  width: 200px;
  height: 200px;
  transform-style: preserve-3d;
  animation: rotate 5s infinite linear;
}

.face {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
}

.front {
  border-bottom: 200px solid var(--main-animation-color);
  opacity: 0.3;
  transform: translateZ(50px) rotateX(30deg);
}

.back {
  border-bottom: 200px solid var(--main-animation-color);
  opacity: 0.3;
  transform: rotateY(180deg) translateZ(50px) rotateX(30deg);
}

.left {
  border-bottom: 200px solid var(--main-animation-color);
  opacity: 0.5;
  transform: rotateY(-90deg) translateZ(50px) rotateX(30deg);
}

.right {
  border-bottom: 200px solid var(--main-animation-color);
  opacity: 0.5;
  transform: rotateY(90deg) translateZ(50px) rotateX(30deg);
}

@keyframes rotate {
  100% {
    transform: rotateY(360deg);
  }
}
</style>
