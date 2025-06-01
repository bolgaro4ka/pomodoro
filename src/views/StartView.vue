<script setup lang="ts">
import { useParamStore } from '../stores/main'
import { useRouter } from 'vue-router';

import Balls from '../components/aminations/Balls.vue'
import TitleLine from '@/particles/TitleLine.vue';
import { onMounted } from 'vue';
import LIST_OF_ANIMATIONS from '@/stores/animations';

const paramStore = useParamStore()
const router = useRouter()

function handleChange() {
  paramStore.save()
  paramStore.apply()

}





</script>

<template>
  <div class="start__wrapper">
    <div class="start__content">
      <div :class="paramStore.animationType ? 'main__animation' : ''">
        <component :is="LIST_OF_ANIMATIONS[paramStore.animationType]">

        </component>

      </div>
      <div class="start__params" :style="paramStore.animationType ? '' : 'width: 100%;'">
        <h1>Параметры</h1>
        <div class="param__options">
          <TitleLine title="Анимация" />
          <div class="param__option">
            <p>Тип анимации</p>
            <select v-model="paramStore.animationType" @change="handleChange">
              <option :value="0">Ничего</option>
              <option :value="1" selected>Плавающие шары</option>
              <option :value="2">Куб</option>
              <option :value="3">Волны</option>
              <option :value="4">Пульсирующий круг</option>
              <option :value="5">Пирамидка</option>
              <option :value="6">Текст</option>
            </select>
          </div>
          <div v-if="paramStore.animationType == 2" class="param__option">
            <p>Перспектива</p>
            <div class="param__input">
              <input type="number" v-model="paramStore.perspective" @change="handleChange">
              <p>px</p>
            </div>
          </div>
          <div v-if="paramStore.animationType == 6" class="param__option">
            <p>Текст</p>
            <input type="text" v-model="paramStore.smile" @change="handleChange">
          </div>
          <div class="param__option">
            <p>Цвет анимации</p>
            <input type="color" v-model="paramStore.mainAnimationColor" @change="handleChange">
          </div>
          <TitleLine title="Стили" />
          <div class="param__option">
            <p>Цвет текста</p>
            <input type="color" v-model="paramStore.mainTextColor" @change="handleChange">
          </div>
          <div class="param__option">
            <p>Цвет заднего фона</p>
            <input type="color" v-model="paramStore.mainBackgroundColor" @change="handleChange">
          </div>
          <div class="param__option">
            <p>Цвет рамки</p>
            <input type="color" v-model="paramStore.mainBorderColor" @change="handleChange">
          </div>
          <div class="param__option">
            <p>Внешний отступ</p>
            <div class="param__input">
              <input type="number" v-model="paramStore.margin" @change="handleChange">
              <p>px</p>
            </div>
          </div>
          <TitleLine title="Время" />
          <div class="param__option clock">
            <p>Время работы</p>
            <div>
              <input v-model="paramStore.timeHoursWork" min="0" type="number">
              <p>:</p>
              <input min="0" max="60" type="number"
                :value="(paramStore.timeMinutesWork < 10 ? '0' : '') + paramStore.timeMinutesWork"
                @change="paramStore.timeMinutesWork = $event.target.value; handleChange()">
              <p>:</p>
              <input min="0" max="60" type="number"
                :value="(paramStore.timeSecondsWork < 10 ? '0' : '') + paramStore.timeSecondsWork"
                @change="paramStore.timeSecondsWork = $event.target.value; handleChange()">
            </div>
          </div>

          <div class="param__option clock">
            <p>Время перевыва</p>
            <div>
              <input v-model="paramStore.timeHoursChill" min="0" type="number">
              <p>:</p>
              <input min="0" max="60" type="number"
                :value="(paramStore.timeMinutesChill < 10 ? '0' : '') + paramStore.timeMinutesChill"
                @change="paramStore.timeMinutesChill = $event.target.value; handleChange()">
              <p>:</p>
              <input min="0" max="60" type="number"
                :value="(paramStore.timeSecondsChill < 10 ? '0' : '') + paramStore.timeSecondsChill"
                @change="paramStore.timeSecondsChill = $event.target.value; handleChange()">
            </div>
          </div>

          <TitleLine title="Функции таймера" />
          <div class="param__option">
            <p>Остановить при завершении времени работы</p>
            <input type="checkbox" v-model="paramStore.stopIfWorkSessionEnd" @change="handleChange">
          </div>
          <div class="param__option">
            <p>Подать звуковой сигнал при завершении времени работы</p>
            <input type="checkbox" v-model="paramStore.makeSoundIfWorkSessionEnd" @change="handleChange">
          </div>


          <div class="param__recovery">
            <button @click="paramStore.recoveryTheme()">Сбросить стили по умолчанию</button>
          </div>
          <div class="param__recovery">
            <button @click="paramStore.save(); router.push('/bolgaro4ka')">Начать</button>
          </div>

        </div>

      </div>
    </div>


  </div>
</template>

<style lang="scss" scoped>
.start__content {
  background-color: var(--main-background-color);
  width: calc(100vw - (var(--main-margin) * 2));
  height: calc(100dvh - (var(--main-margin) * 2));
  margin: var(--main-margin);
  padding: 20px;
  display: flex;
  gap: 10px;



  h1 {
    color: var(--main-text-color);
  }

  .main__animation,
  .start__params {
    width: 50%;
  }
}

.main__animation {
  display: flex;
  justify-content: center;
  align-items: center;
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
    }


  }


}

.clock {
  input {
    width: 50px;
  }

  div {
    display: flex;
    gap: 10px;
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
</style>
