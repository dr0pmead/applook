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
      <div class="game-container p-3 rounded-[12px] w-[536px] h-[536px] bg-[#BBAE9F] flex justify-center items-center relative">
        <div class="grid grid-cols-3 gap-6">
          <!-- Реализация игрового поля -->
          <div v-for="(cell, index) in cells" :key="index" class="cell w-[153px] h-[153px] bg-[#CCC1B5] rounded-[12px] flex items-center justify-center font-[Montserrat] font-bold" @click="makeMove(index)">
            <span v-if="cell === 'X'" class="text-8xl text-[#766C66]">X</span>
            <span v-else-if="cell === 'O'" class="text-8xl text-[#766C66]">O</span>
          </div>
          <div class="absolute top-0 left-0 w-full h-full backdrop-blur-sm justify-center items-center flex-col gap-6 rounded-[12px] flex duration-150" id="game-over-screen" :class="{ hidden: !gameOver }">
            <span class="text-3xl font-bold font-[Montserrat] text-[#766C66]">Игра окончена!</span>
            <div class="flex flex-col items-center justify-center gap-6">
              <div class="text-[#766C66] font-bold text-4xl font-[Montserrat] flex justify-center items-center text-center">
                Результат игры: {{ result }}
              </div>
              <button @click="restartGame" class="w-[215px] h-[55px] rounded-[12px] text-[#FBF6F7] bg-[#F1B17A] hover:bg-[#F59564] duration-150 font-[Montserrat] text-xl">Рестарт</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <span class="text-2xl font-[Montserrat] font-bold text-[#838383]">Ходит: <span>{{ currentPlayer }}</span></span>
      </div>
    </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      cells: Array(9).fill(null),
      currentPlayer: 'Человек',
      gameOver: false,
      result: '',
    };
  },
  mounted() {
    this.makeHumanMove();
  },
  computed: {
    getCurrentPlayerLabel() {
      return this.currentPlayer === 'Человек' ? 'человек' : 'компьютер';
    },
  },
  methods: {
    makeHumanMove() {
      this.currentPlayer = 'Человек';
      this.gameOver = false;
      this.result = '';
    },
    makeComputerMove() {
      this.currentPlayer = 'Компьютер';

      // Реализация логики хода компьютера
      const emptyCells = this.cells.map((cell, index) => (cell === null ? index : null)).filter((cell) => cell !== null);

      // Проверяем, есть ли возможность завершить игру путем выстроения ряда для компьютера
      const winningMove = this.getWinningMove(emptyCells, 'O');
      if (winningMove !== null) {
        this.makeMove(winningMove);
        return;
      }

      // Проверяем, есть ли возможность блокировать ряд противника
      const blockingMove = this.getWinningMove(emptyCells, 'X');
      if (blockingMove !== null) {
        this.makeMove(blockingMove);
        return;
      }

      // Если нет возможности завершить игру или заблокировать ряд, выбираем случайную клетку
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const randomCell = emptyCells[randomIndex];
      this.makeMove(randomCell);
    },
    makeMove(index) {
      if (!this.gameOver && this.cells[index] === null) {
        this.cells.splice(index, 1, this.currentPlayer === 'Человек' ? 'X' : 'O');
        if (this.checkGameOver()) {
          this.result = this.currentPlayer === 'Человек' ? 'Победа' : 'Поражение';
          this.gameOver = true;
        } else if (this.cells.every((cell) => cell !== null)) {
          this.result = 'Ничья';
          this.gameOver = true;
        } else {
          this.currentPlayer = this.currentPlayer === 'Человек' ? 'Компьютер' : 'Человек';
          if (this.currentPlayer === 'Компьютер') {
            setTimeout(() => {
              this.makeComputerMove();
            }, 1000);
          }
        }
      }
    },
    checkGameOver() {
      const winningCombinations = [
        [0, 1, 2], // горизонтальные
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // вертикальные
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // диагональные
        [2, 4, 6],
      ];

      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (this.cells[a] && this.cells[a] === this.cells[b] && this.cells[a] === this.cells[c]) {
          return true;
        }
      }

      return false;
    },
    restartGame() {
      this.cells = Array(9).fill(null);
      this.makeHumanMove();
    },
    getWinningMove(emptyCells, symbol) {
      for (const cell of emptyCells) {
        const tempCells = [...this.cells];
        tempCells.splice(cell, 1, symbol);
        if (this.checkGameOverForCells(tempCells)) {
          return cell;
        }
      }
      return null;
    },
    checkGameOverForCells(cells) {
      const winningCombinations = [
        [0, 1, 2], // горизонтальные
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // вертикальные
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // диагональные
        [2, 4, 6],
      ];

      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
          return true;
        }
      }

      return false;
    },
  },
};
</script>