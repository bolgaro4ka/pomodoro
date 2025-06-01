<script setup lang="ts">
import { RouterView } from 'vue-router'
import FullScreenLoader from './components/FullScreenLoader.vue'
import { onMounted } from 'vue';
import { useParamStore } from './stores/main';

const paramStore = useParamStore()


onMounted(() => {
  paramStore.apply()
})
</script>

<template>
  <Suspense>
    <RouterView />
    <template #fallback>
      <FullScreenLoader />
    </template>
  </Suspense>

</template>

<style scoped lang="scss"></style>
