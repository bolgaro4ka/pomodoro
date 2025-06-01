<script setup lang="ts"></script>
<template>
  <div class="pulse-circle"></div>
</template>
<style lang="scss" scoped>
.pulse-circle {
  width: 160px;
  height: 160px;
  background: var(--main-animation-color);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.9);
    opacity: 0.7;
  }

  50% {
    transform: scale(1.1);
    opacity: 1;
  }

  100% {
    transform: scale(0.9);
    opacity: 0.7;
  }
}
</style>



<!--
<script setup lang="ts"></script>
<template></template>
<style lang="scss" scoped></style>
-->
