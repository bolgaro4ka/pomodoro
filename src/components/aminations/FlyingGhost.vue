<script setup lang="ts">
import { useParamStore } from '@/stores/main';


const paramStore = useParamStore();

</script>
<template>
  <div class="ghost">{{ paramStore.smile }}</div>
</template>
<style lang="scss" scoped>
.ghost {
  font-size: 120px;
  animation: float 3s ease-in-out infinite;
  color: var(--main-animation-color);
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  25% {
    transform: translateY(-20px) rotate(5deg);
  }

  50% {
    transform: translateY(-10px) rotate(-5deg);
  }

  75% {
    transform: translateY(-25px) rotate(3deg);
  }
}
</style>
