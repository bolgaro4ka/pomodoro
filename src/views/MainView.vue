<script setup lang="ts">
import TimerMain from '@/components/TimerMain.vue';
import FullScreenLoader from '../components/FullScreenLoader.vue'
import Balls from '@/components/aminations/Balls.vue';
import { useParamStore } from '@/stores/main';
import LIST_OF_ANIMATIONS from '@/stores/animations';


const paramStore = useParamStore();
</script>

<template>
  <div>
    <Suspense>
      <div class="start__wrapper">
        <div class="start__content">
          <div :class="paramStore.animationType ? 'main__animation' : ''" >
            <component :is="LIST_OF_ANIMATIONS[paramStore.animationType]" >

            </component>

          </div>
          <div class="start__params">
            <h2 class="title">{{ paramStore.isWorkTime ? 'Время работать!' : 'Время отдыхать!' }}</h2>
            <TimerMain />
          </div>
        </div>
      </div>



      <template #fallback>
        <FullScreenLoader />
      </template>
    </Suspense>
  </div>
</template>

<style scoped lang="scss">
.start__content {
  background-color: var(--main-background-color);
  width: calc(100vw - (var(--main-margin) * 2));
  height: calc(100dvh - (var(--main-margin) * 2));
  margin: var(--main-margin);
  padding: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  h1 {
    color: var(--main-text-color);
  }

  .main__animation {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .start__params {
    width: 50%;
    display: flex;
    height: 30%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}

.param__options {
  display: flex;
  flex-direction: column;

  .param__option {
    display: flex;
    color: var(--main-text-color);
    justify-content: space-between;

    input[type="color"] {
      width: 50%;
      background-color: transparent;
      border: none;
    }

    .param__input {
      display: flex;
      gap: 10px;
      width: 50%;
    }


  }


}

.param__recovery button {
  background-color: transparent;
  color: var(--main-text-color);
  border: 1px solid var(--main-text-color);
  padding: 10px;
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;

}

.param__recovery button:hover {
  background-color: var(--main-text-color);
  color: var(--main-background-color);

}

.title {
  color: var(--main-text-color);

}
</style>
