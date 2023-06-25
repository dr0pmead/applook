<template>
  <div>
    <div class="p-6 px-56">
      <h1 class="text-2xl font-bold mb-6 text-[#838383]">Коллекция игр</h1>

      <div class="grid grid-cols-4 gap-4">
        <div class="w-full rounded-[12px] border border-[#838383] card cursor-pointer ">
          <img src="@/assets/tfe-logo.png" />
          <router-link to="/2048" class="play-button">
            <span>Играть</span>
          </router-link>
        </div>
        <div class="w-full rounded-[12px] border border-[#838383] card cursor-pointer ">
          <img src="@/assets/tic-tac-toe.jpg" />
          <router-link to="/TicTakToe" class="play-button">
            <span>Играть</span>
          </router-link>
        </div>
        <div class="w-full rounded-[12px] border border-[#838383] card cursor-pointer ">
          <img src="@/assets/snake.jpg" />
          <router-link to="/snake" class="play-button">
            <span>Играть</span>
          </router-link>
        </div>
        <!-- Добавьте другие объекты сетки здесь -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Ваш код логики для домашней страницы
}
</script>

<style scoped>
.card > img {
  border-radius: 12px;
}

.card {
  position: relative;
  overflow: hidden;
}

.play-button {
  position: absolute;
  bottom: -0px; /* Расстояние от нижней границы */
  left: 50%; /* Центрирование по горизонтали */
  transform: translateX(-50%); /* Центрирование по горизонтали */
  width: 95%; /* Ширина кнопки */
  height: 40px;
  background-color: #f2f2f7;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s, all 0.3s;
  transform-origin: bottom;
}

.card:hover .play-button {
  opacity: 1;
  transform: translateX(-50%) translateY(-10px); /* Анимация выезда */
}

.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Затемнение (здесь используется полупрозрачный черный цвет) */
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.3s;
}

.card:hover::before {
  opacity: 1;
}

.play-button:hover {
  background-color: #cbcbce;
}


</style>
