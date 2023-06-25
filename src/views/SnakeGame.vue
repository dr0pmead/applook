<template>
    <div class="flex flex-col mt-28 px-56 gap-14 justify-center items-center">
      <div class="flex w-[536px] items-center justify-center">
        <router-link to="/" class="play-button">
          <span class="text-2xl text-[#838383] font-[Montserrat] flex gap-4 items-center">
            <svg width="45" height="24" viewBox="0 0 37 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4853 22.6066L0.93934 13.0606C0.353555 12.4748 0.353555 11.5251 0.93934 10.9393L10.4853 1.39335C11.0711 0.807565 12.0208 0.807565 12.6066 1.39335C13.1924 1.97914 13.1924 2.92889 12.6066 3.51467L5.62132 10.5L37 10.5L37 13.5L5.62132 13.5L12.6066 20.4852C13.1924 21.071 13.1924 22.0208 12.6066 22.6066C12.0208 23.1923 11.0711 23.1923 10.4853 22.6066Z" fill="#838383"/>
            </svg>
            Назад к коллекции
          </span>
        </router-link>
      </div>
      <div class="flex space-between gap-[2rem] px-24 w-full">
        <div class="snake-field w-full h-[536px] relative" ref="field" tabindex="0" @keydown="handleKeyDown" @focus="startGame">
                <div
                v-for="(segment, index) in snake"
                :key="index"
                class="snake-segment absolute bg-[#fff] w-[20px] h-[20px] rounded-full"
                :style="getSegmentStyle(segment)"
            ></div>
            <div
                v-for="(apple, index) in apples"
                :key="index"
                class="apple"
                :style="getAppleStyle(apple)"
                >
                <img src="@/assets/applePoint.png"/>
                </div>
            <div class="absolute top-0 left-0 w-full h-full backdrop-blur-sm justify-center items-center flex-col gap-6 rounded-[12px] flex duration-150" id="game-over-screen" :class="{ hidden: !gameOver }">
        <span class="text-3xl font-bold font-[Montserrat] text-[#766C66]">Игра окончена!</span>
        <div class="flex flex-col items-center justify-center gap-6">
          <div class="text-[#766C66] font-bold text-4xl font-[Montserrat] best-score flex justify-center items-center">{{ score }}</div>
          <button @click="restartGame" class="w-[215px] h-[35px] rounded-[12px] text-[#1c1c1e] bg-[#fff] hover:bg-[#979797] duration-150 font-[Montserrat] text-lg">Рестарт</button>
        </div>
      </div>
</div>
        <div class="info-container w-[30%] h-[536px] flex flex-col font-[Montserrat] justify-between p-3 items-center">
            <div class="w-full flex justify-center items-center flex-col">
                <span class="text-2xl font-bold text-[#838383]">Счет:</span>
                <!-- <span>{{ score }}</span> -->
            </div>
            <button @click="restartGame" class="w-[215px] h-[35px] rounded-[12px] text-[#1c1c1e] bg-[#fff] hover:bg-[#979797] duration-150 font-[Montserrat] text-lg">Рестарт</button>
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      snake: [{ x: 0, y: 0 }],
      direction: 'right',
      gameInterval: null,
      gameOver: false,
      apples: [],
    };
  },
  methods: {
    getSegmentStyle(segment) {
      return {
        left: `${segment.x * 20}px`,
        top: `${segment.y * 20}px`,
      };
    },
    moveSnake() {
      const head = { ...this.snake[0] };

      switch (this.direction) {
        case 'up':
          head.y--;
          break;
        case 'down':
          head.y++;
          break;
        case 'left':
          head.x--;
          break;
        case 'right':
          head.x++;
          break;
      }

      const container = this.$refs.field; // Получаем ссылку на контейнер
  const containerWidth = container.getBoundingClientRect().width / 20; // Получаем фактическую ширину контейнера и делим на ширину сегмента
  const containerHeight = container.getBoundingClientRect().height / 20; // Получаем фактическую высоту контейнера и делим на высоту сегмента
        
  if (head.x < 0 || head.x >= containerWidth || head.y < 0 || head.y >= containerHeight) {
    this.gameOver = true;
    return;
  }

  // Проверка столкновения с "яблоками"
  for (let i = 0; i < this.apples.length; i++) {
    if (this.apples[i].x === head.x && this.apples[i].y === head.y) {
      // Увеличение длины змейки
      this.snake.push({ ...this.snake[this.snake.length - 1] });

      // Удаление "съеденного" яблока
      this.apples.splice(i, 1);
      this.generateApple();
      break;
    }
  }

  this.snake.unshift(head);
  this.snake.pop();
    },
    getAppleStyle(apple) {
    return {
      left: `${apple.x * 20}px`,
      top: `${apple.y * 20}px`,
      // Дополнительные стили, если необходимо
    };
  },

  generateApple() {
  const maxX = this.containerWidth / 20; // Максимальное значение координаты X
  const maxY = this.containerHeight / 20; // Максимальное значение координаты Y

  const newApple = {
    x: Math.floor(Math.random() * maxX), // Случайная координата X
    y: Math.floor(Math.random() * maxY), // Случайная координата Y
  };

  this.apples.push(newApple);
},

    handleKeyDown(event) {
      switch (event.key) {
        case 'ArrowUp':
          this.direction = 'up';
          break;
        case 'ArrowDown':
          this.direction = 'down';
          break;
        case 'ArrowLeft':
          this.direction = 'left';
          break;
        case 'ArrowRight':
          this.direction = 'right';
          break;
      }
    },
    startGame() {
      this.gameInterval = setInterval(this.moveSnake, 500);
    },
    checkCollisionWithApple() {
  const head = this.snake[0];
  const appleIndex = this.apples.findIndex(apple => apple.x === head.x && apple.y === head.y);

  if (appleIndex !== -1) {
    // Змейка съела яблоко
    this.snake.push({ ...this.snake[this.snake.length - 1] }); // Добавляем новый сегмент змейки

    // Удаляем съеденное яблоко и добавляем новое в случайное место
    this.apples.splice(appleIndex, 1);
    this.generateApple();
  }
},
  },
  mounted() {
  document.addEventListener('keydown', this.handleKeyDown.bind(this));
  setInterval(this.moveSnake.bind(this), 500);
  this.generateApple(); // Генерация первого "яблока"
},
  beforeUnmount() {
    clearInterval(this.gameInterval);
  },
};
</script>
  
  <style>
  .snake-field {
    background-color: #000;
    border-radius: 12px;
  }

  .snake-segment {
  margin: 0;
  padding: 0;
  border: none;
}
  
  .info-container {

    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 12px;
  }
  .apple {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: transparent;
}
  </style>