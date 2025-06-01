<script setup lang="ts"></script>

<template>
  <div class="wave-container">
    <div class="container">
      <div class="waves">
        <div class="wave wave1"></div>
        <div class="wave wave2"></div>
        <div class="wave wave3"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wave-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: transparent;
  margin: 0;
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
}

.container {
  position: relative;
  width: 800px;
  height: 400px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  pointer-events: none;
  /* Разрешаем клики сквозь весь контейнер */
}

/* Контент поверх волн */
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
  pointer-events: auto;
  /* Разрешаем клики только по контенту */
}

.content h1 {
  color: white;
  font-size: 42px;
  margin-bottom: 20px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.content button {
  background: #00bcd4;
  color: white;
  border: none;
  padding: 12px 32px;
  font-size: 18px;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 188, 212, 0.4);
  transition: all 0.3s ease;
}

.content button:hover {
  background: #0097a7;
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(0, 188, 212, 0.6);
}

/* Контейнер для волн */
.waves {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  /* Клики проходят сквозь волны */
}

/* Общие стили для волн */
.wave {
  position: absolute;
  left: 0;
  width: 200%;
  height: 150px;
  background-repeat: repeat-x;
  opacity: 0.8;
  animation: wave-animation 12s linear infinite;
  transform-origin: center bottom;
}

/* Волна 1 */
.wave1 {
  bottom: 0;
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg"><path d="M0 70L50 65L100 75L150 60L200 73L250 65L300 80L350 70L400 85L450 60L500 78L550 65L600 83L650 70L700 88L750 65L800 85L850 60L900 80L950 65L1000 75L1050 60L1100 70L1150 55L1200 65L1200 121L0 121Z" fill="%2300bcd4"/></svg>');
  background-size: 600px 150px;
  animation-duration: 20s;
  z-index: 3;
}

/* Волна 2 */
.wave2 {
  bottom: 30px;
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg"><path d="M0 45L50 55L100 40L150 60L200 45L250 58L300 40L350 52L400 35L450 50L500 38L550 55L600 42L650 60L700 45L750 62L800 40L850 58L900 35L950 52L1000 40L1050 55L1100 42L1150 60L1200 45L1200 121L0 121Z" fill="%23ff4081"/></svg>');
  background-size: 800px 120px;
  animation-duration: 15s;
  z-index: 2;
  opacity: 0.7;
}

/* Волна 3 */
.wave3 {
  bottom: 60px;
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg"><path d="M0 25L50 35L100 20L150 40L200 25L250 38L300 20L350 32L400 15L450 30L500 18L550 35L600 22L650 40L700 25L750 42L800 20L850 38L900 15L950 32L1000 20L1050 35L1100 22L1150 40L1200 25L1200 121L0 121Z" fill="%23ffeb3b"/></svg>');
  background-size: 1000px 100px;
  animation-duration: 10s;
  z-index: 1;
  opacity: 0.6;
}

/* Анимация движения волн */
@keyframes wave-animation {
  0% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(0);
  }
}

/* Пульсирующий эффект для глубины */
@keyframes pulse {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(10px);
  }
}

.wave1 {
  animation: wave-animation 20s linear infinite, pulse 8s ease-in-out infinite;
}

.wave2 {
  animation: wave-animation 15s linear infinite, pulse 10s ease-in-out infinite;
  animation-delay: 0s, 1s;
}

.wave3 {
  animation: wave-animation 10s linear infinite, pulse 12s ease-in-out infinite;
  animation-delay: 0s, 2s;
}
</style>
