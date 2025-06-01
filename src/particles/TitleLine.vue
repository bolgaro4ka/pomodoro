<script setup lang="ts">

const props = defineProps({
  title: String
})

</script>

<template>
  <div class="title-line">
    <div class="line-s"></div>
    <p>{{ props.title }}</p>
    <div class="line-e"></div>
  </div>
</template>

<style lang="scss" scoped>
.line-s,
.line-e {
  width: 100px;
  height: 2px;
  background-color: var(--main-text-color);
  margin: 10px;
}

p {
  width: max-content;
  text-wrap: nowrap;
  word-wrap: none;
  color: var(--main-text-color);
}

.line-e {
  width: 100%;
}

.title-line {
  display: flex;
  align-items: center;
  justify-content: start;
}
</style>
