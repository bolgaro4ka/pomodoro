import { ref, type Component } from 'vue'
import { defineStore } from 'pinia'

export const useParamStore = defineStore('param', () => {
  const mainBackgroundColor = ref(
    localStorage.getItem('mainBackgroundColor')
      ? localStorage.getItem('mainBackgroundColor')
      : '#586045',
  )
  const mainTextColor = ref(
    localStorage.getItem('mainTextColor') ? localStorage.getItem('mainTextColor') : '#ffffff',
  )

  const mainBorderColor = ref(
    localStorage.getItem('mainBorderColor') ? localStorage.getItem('mainBorderColor') : '#ffffff',
  )

  const mainAnimationColor = ref(
    localStorage.getItem('mainAnimationColor')
      ? localStorage.getItem('mainAnimationColor')
      : '#ffffff',
  )

  const margin = ref(
    Number(localStorage.getItem('margin')) ? Number(localStorage.getItem('margin')) : 20,
  )

  const timeHoursWork = ref(
    localStorage.getItem('timeHoursWork') ? localStorage.getItem('timeHoursWork') : 1,
  )
  const timeHoursChill = ref(
    localStorage.getItem('timeHoursChill') ? localStorage.getItem('timeHoursChill') : 0,
  )
  const timeMinutesWork = ref(
    localStorage.getItem('timeMinutesWork') ? localStorage.getItem('timeMinutesWork') : 30,
  )
  const timeSecondsWork = ref(
    localStorage.getItem('timeSecondsWork') ? localStorage.getItem('timeSecondsWork') : 0,
  )
  const timeMinutesChill = ref(
    localStorage.getItem('timeMinutesChill') ? localStorage.getItem('timeMinutesChill') : 10,
  )
  const timeSecondsChill = ref(
    localStorage.getItem('timeSecondsChill') ? localStorage.getItem('timeSecondsChill') : 0,
  )

  const isWorkTime = ref(true)
  const pause = ref(false)
  const stopIfWorkSessionEnd = ref(
    localStorage.getItem('stopIfWorkSessionEnd')
      ? Boolean(localStorage.getItem('stopIfWorkSessionEnd'))
      : false,
  )
  const makeSoundIfWorkSessionEnd = ref(
    localStorage.getItem('makeSoundIfWorkSessionEnd')
      ? Boolean(localStorage.getItem('makeSoundIfWorkSessionEnd'))
      : false,
  )
  const animationType = ref(
    localStorage.getItem('animationType') ? Number(localStorage.getItem('animationType')) : 1,
  )
  const perspective = ref(
    localStorage.getItem('perspective') ? Number(localStorage.getItem('perspective')) : 500,
  )

  const smile = ref(localStorage.getItem('smile') ? String(localStorage.getItem('smile')) : '👻')

  const save = () => {
    localStorage.setItem('mainBackgroundColor', mainBackgroundColor.value)
    localStorage.setItem('mainTextColor', mainTextColor.value)
    localStorage.setItem('mainBorderColor', mainBorderColor.value)
    localStorage.setItem('mainBorderColor', mainAnimationColor.value)
    localStorage.setItem('margin', String(margin.value))

    localStorage.setItem('animationType', String(animationType.value))
    localStorage.setItem('perspective', String(perspective.value))

    localStorage.setItem('timeHoursWork', timeHoursWork.value)
    localStorage.setItem('timeHoursChill', timeHoursChill.value)
    localStorage.setItem('timeMinutesWork', timeMinutesWork.value)
    localStorage.setItem('timeSecondsWork', timeSecondsWork.value)
    localStorage.setItem('timeMinutesChill', timeMinutesChill.value)
    localStorage.setItem('timeSecondsChill', timeSecondsChill.value)

    localStorage.setItem('stopIfWorkSessionEnd', String(stopIfWorkSessionEnd.value))
    localStorage.setItem('makeSoundIfWorkSessionEnd', String(makeSoundIfWorkSessionEnd.value))

    localStorage.setItem('smile', String(smile.value))
  }

  const apply = () => {
    document.documentElement.style.setProperty('--main-background-color', mainBackgroundColor.value)
    document.documentElement.style.setProperty('--main-text-color', mainTextColor.value)
    document.documentElement.style.setProperty('--main-border-color', mainBorderColor.value)
    document.documentElement.style.setProperty('--main-animation-color', mainAnimationColor.value)
    document.documentElement.style.setProperty('--main-margin', margin.value + 'px')

    document.documentElement.style.setProperty('--perspective', perspective.value + 'px')
  }

  const recoveryTheme = () => {
    mainBackgroundColor.value = '#586045'
    mainTextColor.value = '#ffffff'
    mainBorderColor.value = '#ffffff'
    mainAnimationColor.value = '#ffffff'
    perspective.value = 500
    margin.value = 20

    save()
    apply()
  }

  function recoveryState() {
    isWorkTime.value = true
    pause.value = false
  }

  return {
    mainBackgroundColor,
    mainTextColor,
    margin,
    animationType,
    save,
    apply,
    recoveryTheme,
    timeMinutesChill,
    timeMinutesWork,
    timeSecondsChill,
    timeSecondsWork,
    isWorkTime,
    timeHoursChill,
    timeHoursWork,
    mainBorderColor,
    pause,
    recoveryState,
    stopIfWorkSessionEnd,
    makeSoundIfWorkSessionEnd,
    perspective,
    mainAnimationColor,
    smile,
  }
})
