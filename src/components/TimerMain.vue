<script setup lang="ts">
import { useParamStore } from '@/stores/main';
import { onMounted, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

const audio = ref()

let interval;
const minutes: Ref<number | undefined> = ref(undefined);
const seconds: Ref<number | undefined> = ref(undefined);
const hours: Ref<number | undefined> = ref(undefined);

const router = useRouter()
const paramStore = useParamStore()

function mainHandler() {
  if (paramStore.isWorkTime) {
    const Rminutes = paramStore.timeMinutesWork
    const Rseconds = paramStore.timeSecondsWork
    const Rhours = paramStore.timeHoursWork

    minutes.value = minutes.value != undefined ? minutes.value : Rminutes as number
    seconds.value = seconds.value != undefined ? seconds.value : Rseconds as number
    hours.value = hours.value != undefined ? hours.value : Rhours as number



    interval = setInterval(() => {
      if (seconds.value <= 0) {
        if (minutes.value <= 0) {
          if (hours.value <= 0) {
            clearInterval(interval)
            paramStore.isWorkTime = false
            minutes.value = undefined
            seconds.value = undefined
            hours.value = undefined
            if (paramStore.makeSoundIfWorkSessionEnd) {
              audio.value.play()
            }
            if (!paramStore.stopIfWorkSessionEnd) {
              mainHandler()
            } else {
              minutes.value = 0
              seconds.value = 0
              hours.value = 0

            }

          } else {
            hours.value--
            minutes.value = 59
            seconds.value = 59
          }
        } else {
          minutes.value--
          seconds.value = 59
        }
      } else {
        seconds.value--

      }
    }, 1000)


  } else {
    const Rminutes = paramStore.timeMinutesChill
    const Rseconds = paramStore.timeSecondsChill
    const Rhours = paramStore.timeHoursChill

    minutes.value = minutes.value != undefined ? minutes.value : Rminutes as number
    seconds.value = seconds.value != undefined ? seconds.value : Rseconds as number
    hours.value = hours.value != undefined ? hours.value : Rhours as number

    interval = setInterval(() => {
      if (seconds.value <= 0) {
        if (minutes.value <= 0) {
          if (hours.value <= 0) {
            clearInterval(interval)
            paramStore.isWorkTime = true
            minutes.value = undefined
            seconds.value = undefined
            hours.value = undefined
            if (paramStore.makeSoundIfWorkSessionEnd) {
              audio.value.play()
            }

            mainHandler()
          } else {
            hours.value--
            minutes.value = 59
            seconds.value = 59
          }
        } else {
          minutes.value--
          seconds.value = 59
        }
      } else {
        seconds.value--

      }
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

function handleTimeLineChange(e) {
  clearInterval(interval)
  let all_time;
  if (paramStore.isWorkTime) {
    all_time = Number(paramStore.timeHoursWork) * 60 * 60 + Number(paramStore.timeMinutesWork) * 60 + Number(paramStore.timeSecondsWork)
  } else {
    all_time = Number(paramStore.timeHoursChill) * 60 * 60 + Number(paramStore.timeMinutesChill) * 60 + Number(paramStore.timeSecondsChill)
  }

  const percente = e.target.value

  let alr = all_time - (percente / 100) * all_time
  if (alr > all_time) {
    alr = all_time
  }
  hours.value = Math.floor(alr / 60 / 60)
  minutes.value = Math.floor((alr - hours.value * 60 * 60) / 60)
  seconds.value = Math.floor(alr - hours.value * 60 * 60 - minutes.value * 60)
  if (!paramStore.pause) {
    mainHandler()
  }

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
            <p class="time__hours">{{ String(hours).padStart(2, '0') }}</p>
            <p>Часы</p>
          </div>
          <p class="time__title">:</p>
          <div class="time__block">
            <p class="time__minutes">{{ String(minutes).padStart(2, '0') }}</p>
            <p>Минуты</p>
          </div>
          <p class="time__title">:</p>
          <div class="time__block">
            <p class="time__seconds">{{ String(seconds).padStart(2, '0') }}</p>
            <p>Секунды</p>
          </div>
          <!-- <div class="time__block">
            <p class="time__milliseconds" ref="Cmilliseconds"></p>
            <p class="time__title">Миллисекунды</p>
          </div> -->

        </div>
      </div>
    </div>
    <div class="timeline">
      <input type="range" min="0" max="100" v-if="paramStore.showTimeline"
        :value="paramStore.isWorkTime ? (100 - Math.round(((hours * 60 * 60 + minutes * 60 + seconds) / (Number(paramStore.timeHoursWork) * 60 * 60 + Number(paramStore.timeMinutesWork) * 60 + Number(paramStore.timeSecondsWork))) * 100)) : (100 - Math.round(((hours * 60 * 60 + minutes * 60 + seconds) / (Number(paramStore.timeHoursChill) * 60 * 60 + Number(paramStore.timeMinutesChill) * 60 + Number(paramStore.timeSecondsChill))) * 100))"
        @change="handleTimeLineChange($event)">
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

.timeline {
  width: 100%;
  padding: 0 60px;

  input[type="range"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    height: 18px;
    padding-top: 15px;
    padding-bottom: 10px;
    border: none;
    border-radius: 4px;
    overflow: hidden;
    background-color: transparent;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    background: var(--main-back-time-line-color);
    /* Цвет полосы */
    height: 3px;
    /* Высота полосы */
    border-radius: 4px;
    /* Закругленные края */
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background-color: var(--main-time-line-color);
    border: 0px solid var(--main-time-line-color);
    border-radius: 50%;
    height: 18px;
    width: 18px;
    margin-top: -7px;
    box-shadow: calc(-100vmax - 18px) 0 0 100vmax var(--main-time-line-color);
    clip-path: polygon(100% 0,
        2px 0,
        0 7px,
        -100vmax 7px,
        -100vmax 11px,
        0 11px,
        2px 100%,
        100% 100%);
  }

  &::-moz-range-track {
    height: 6px;
    background: var(--main-back-time-line-color);
    border-radius: 5px;
  }

  &::-moz-range-progress {
    height: 6px;
    background: var(--main-time-line-color);
    border-radius: 5px;
  }

  &::-moz-range-thumb {
    height: 16px;
    width: 16px;
    background: var(--main-time-line-color);
    border-radius: 50%;
    border: none;
  }

}
</style>
