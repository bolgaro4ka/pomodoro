<script setup lang="ts">
import { useParamStore } from '@/stores/main';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const Chours = ref()
const Cminutes = ref()
const Cseconds = ref()
const Cmilliseconds = ref()

const audio = ref()

let interval;
let minutes: number;
let seconds: number;
let hours: number;

const route = useRoute()
const router = useRouter()
const paramStore = useParamStore()

function mainHandler() {
  if (paramStore.isWorkTime) {
    const Rminutes = paramStore.timeMinutesWork
    const Rseconds = paramStore.timeSecondsWork
    const Rhours = paramStore.timeHoursWork

    minutes = minutes != undefined ? minutes : Rminutes as number
    seconds = seconds != undefined ? seconds : Rseconds as number
    hours = hours != undefined ? hours : Rhours as number



    interval = setInterval(() => {
      if (seconds <= 0) {
        if (minutes <= 0) {
          if (hours <= 0) {
            clearInterval(interval)
            paramStore.isWorkTime = false
            minutes = undefined
            seconds = undefined
            hours = undefined
            if (paramStore.makeSoundIfWorkSessionEnd) {
              audio.value.play()
            }
            if (!paramStore.stopIfWorkSessionEnd) {
              mainHandler()
            } else {
              minutes = 0
              seconds = 0
              hours = 0

            }

          } else {
            hours--
            minutes = 59
            seconds = 59
          }
        } else {
          minutes--
          seconds = 59
        }
      } else {
        seconds--
      }

      Chours.value.textContent = String(hours).padStart(2, '0')
      Cminutes.value.textContent = String(minutes).padStart(2, '0')
      Cseconds.value.textContent = String(seconds).padStart(2, '0')
    }, 1000)


  } else {
    const Rminutes = paramStore.timeMinutesChill
    const Rseconds = paramStore.timeSecondsChill
    const Rhours = paramStore.timeHoursChill

    minutes = minutes != undefined ? minutes : Rminutes as number
    seconds = seconds != undefined ? seconds : Rseconds as number
    hours = hours != undefined ? hours : Rhours as number

    interval = setInterval(() => {
      if (seconds <= 0) {
        if (minutes <= 0) {
          if (hours <= 0) {
            clearInterval(interval)
            paramStore.isWorkTime = true
            minutes = undefined
            seconds = undefined
            hours = undefined

            mainHandler()
          } else {
            hours--
            minutes = 59
            seconds = 59
          }
        } else {
          minutes--
          seconds = 59
        }
      } else {
        seconds--
      }

      Chours.value.textContent = String(hours).padStart(2, '0')
      Cminutes.value.textContent = String(minutes).padStart(2, '0')
      Cseconds.value.textContent = String(seconds).padStart(2, '0')
    }, 1000)
  }
}

function handlePause() {
  clearInterval(interval);
  paramStore.pause = true
}

function handleStart() {
  paramStore.pause = false
  mainHandler()
}

function handleBreak() {
  clearInterval(interval);
  paramStore.recoveryState();
  router.push('/');
}

onMounted(() => {
  mainHandler()
})





</script>

<template>
  <div class="timer__wrapper">
    <div class="timer__box">
      <div class="timer">
        <div class="time">
          <div class="time__block">
            <p class="time__hours" ref="Chours"></p>
            <p>Часы</p>
          </div>
          <p class="time__title">:</p>
          <div class="time__block">
            <p class="time__minutes" ref="Cminutes"></p>
            <p>Минуты</p>
          </div>
          <p class="time__title">:</p>
          <div class="time__block">
            <p class="time__seconds" ref="Cseconds"></p>
            <p>Секунды</p>
          </div>
          <!-- <div class="time__block">
            <p class="time__milliseconds" ref="Cmilliseconds"></p>
            <p class="time__title">Миллисекунды</p>
          </div> -->

        </div>
      </div>
    </div>
    <div class="timer__buttons">
      <button @click="handlePause" v-if="!paramStore.pause"><svg xmlns="http://www.w3.org/2000/svg" height="24px"
          viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
          <path
            d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" />
        </svg></button>
      <button @click="handleStart" v-else><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
          width="24px" fill="#e8eaed">
          <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
        </svg></button>
      <button @click="handleBreak"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
          width="24px" fill="#e8eaed">
          <path d="M320-640v320-320Zm-80 400v-480h480v480H240Zm80-80h320v-320H320v320Z" />
        </svg></button>
    </div>
    <audio src="/sound.mp3" ref="audio" style="display: none"></audio>
  </div>
</template>

<style lang="scss" scoped>
.timer__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}


.time__hours,
.time__minutes,
.time__seconds,
.time__milliseconds {
  font-size: 60px;
}

.timer__buttons {
  button {
    background-color: transparent;
    border: 1px solid var(--main-text-color);
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    margin: 10px;
  }

  button:hover {
    background-color: var(--main-text-color);
    color: var(--main-background-color);

    svg {
      fill: var(--main-background-color);
    }
  }

  svg {
    fill: var(--main-text-color);
  }
}

.time__title {
  font-size: 32px;
}

.time__block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.timer__box {
  width: 100%;
}

.time,
.titles {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 40px;
  color: var(--main-text-color);


}
</style>
