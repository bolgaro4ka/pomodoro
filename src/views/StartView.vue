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

function handleGoToGithub() {
  location.href = 'https://github.com/bolgaro4ka/pomodoro'
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

          <div class="param__github">
            <button @click="handleGoToGithub">
              <svg height="32" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="32"
                data-view-component="true" class="octicon octicon-mark-github v-align-middle">
                <path
                  d="M12 1C5.9225 1 1 5.9225 1 12C1 16.8675 4.14875 20.9787 8.52125 22.4362C9.07125 22.5325 9.2775 22.2025 9.2775 21.9137C9.2775 21.6525 9.26375 20.7862 9.26375 19.865C6.5 20.3737 5.785 19.1912 5.565 18.5725C5.44125 18.2562 4.905 17.28 4.4375 17.0187C4.0525 16.8125 3.5025 16.3037 4.42375 16.29C5.29 16.2762 5.90875 17.0875 6.115 17.4175C7.105 19.0812 8.68625 18.6137 9.31875 18.325C9.415 17.61 9.70375 17.1287 10.02 16.8537C7.5725 16.5787 5.015 15.63 5.015 11.4225C5.015 10.2262 5.44125 9.23625 6.1425 8.46625C6.0325 8.19125 5.6475 7.06375 6.2525 5.55125C6.2525 5.55125 7.17375 5.2625 9.2775 6.67875C10.1575 6.43125 11.0925 6.3075 12.0275 6.3075C12.9625 6.3075 13.8975 6.43125 14.7775 6.67875C16.8813 5.24875 17.8025 5.55125 17.8025 5.55125C18.4075 7.06375 18.0225 8.19125 17.9125 8.46625C18.6138 9.23625 19.04 10.2125 19.04 11.4225C19.04 15.6437 16.4688 16.5787 14.0213 16.8537C14.42 17.1975 14.7638 17.8575 14.7638 18.8887C14.7638 20.36 14.75 21.5425 14.75 21.9137C14.75 22.2025 14.9563 22.5462 15.5063 22.4362C19.8513 20.9787 23 16.8537 23 12C23 5.9225 18.0775 1 12 1Z">
                </path>
              </svg>
              By bolgaro4ka
            </button>
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

.param__github {
  width: 100%;
  margin-top: 10px;

}

.param__github button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px 20px;
  gap: 20px;
  justify-content: center;
  border-radius: 10px;
  border: none;
  background-color: black;
  color: white;

  svg {
    fill: white;
  }

}

.param__github button:hover {
  background-color: white;
  color: black;

  svg {
    fill: black;
  }
}
</style>
