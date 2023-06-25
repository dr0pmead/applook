<template>
  <div class="flex flex-col mt-28 px-56 gap-14 justify-center items-center">
    <div class="flex w-[536px] items-center justify-center">
      <router-link to="/" class="play-button">
            <span class="text-2xl text-[#838383] font-[Montserrat] flex gap-4 items-center"><svg width="45" height="24" viewBox="0 0 37 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.4853 22.6066L0.93934 13.0606C0.353555 12.4748 0.353555 11.5251 0.93934 10.9393L10.4853 1.39335C11.0711 0.807565 12.0208 0.807565 12.6066 1.39335C13.1924 1.97914 13.1924 2.92889 12.6066 3.51467L5.62132 10.5L37 10.5L37 13.5L5.62132 13.5L12.6066 20.4852C13.1924 21.071 13.1924 22.0208 12.6066 22.6066C12.0208 23.1923 11.0711 23.1923 10.4853 22.6066Z" fill="#838383"/>
</svg>
Назад к коллекции</span>
          </router-link>
    </div>
  <div class="flex justify-center gap-[2rem] px-56 rounded-[12px]">
    
    <div class="game-container p-3 rounded-[12px] w-[536px] h-[536px] bg-[#BBAE9F] flex justify-center items-center relative" @keydown="handleKeyDown" tabindex="0" :class="{ 'game-over': gameOver }">
      
      <div class="grid grid-cols-4 gap-4 font-[Montserrat] font-bold">
        <div v-for="(cell, index) in cells" :key="index" class="cell w-28 h-28 bg-[#CCC1B5] rounded-[12px] flex items-center justify-center" :class="getTileClass(cell)">
          <span v-if="cell !== 0">{{ cell }}</span>
        </div>
      </div>
      <div class="absolute top-0 left-0 w-full h-full backdrop-blur-sm justify-center items-center flex-col gap-6 rounded-[12px] flex duration-150" id="game-over-screen" :class="{ hidden: !gameOver }">
        <span class="text-3xl font-bold font-[Montserrat] text-[#766C66]">Игра окончена!</span>
        <div class="flex flex-col items-center justify-center gap-6">
          <div class="text-[#766C66] font-bold text-4xl font-[Montserrat] best-score flex justify-center items-center">{{ score }}</div>
          <button @click="restartGame" class="w-[215px] h-[55px] rounded-[12px] text-[#FBF6F7] bg-[#F1B17A] hover:bg-[#F59564] duration-150 font-[Montserrat] text-xl">Рестарт</button>
        </div>
      </div>
    </div>
    
    <div class="score-settings-container flex flex-col gap-[2.3rem]">
      <div class="p-3 rounded-[12px] w-[536px] h-[137px] bg-[#BBAE9F]">
        <div class="flex items-center justify-center h-full rounded-[12px] bg-[#CCC1B5]">
          <div class="text-center">
            <div class="text-3xl font-bold font-[Montserrat] text-[#FBF6F7]">Мой рекорд:</div>
            <div class="text-[#766C66] font-bold text-4xl font-[Montserrat] score">{{ bestScore }}</div>
          </div>
        </div>
      </div>
      <div class="p-3 rounded-[12px] w-[536px] h-[363px] bg-[#BBAE9F]">
        <div class="flex flex-col items-center justify-between h-full p-3 rounded-[12px] bg-[#CCC1B5]">
          <div>
            <span class="text-3xl font-bold font-[Montserrat] text-[#FBF6F7]">Счет:</span>
            <div class="text-[#766C66] font-bold text-4xl font-[Montserrat] best-score flex justify-center items-center">{{ score }}</div>
          </div>
          <div class="flex gap-3 justify-center items-center">
            <button @click="restartGame" class="w-[184px] h-[43px] rounded-[12px] text-[#FBF6F7] bg-[#F1B17A] hover:bg-[#F59564] duration-150 font-[Montserrat]">Рестарт</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      cells: [],
      score: 0,
      bestScore: 0,
      currentScore: 0,
      gameOver: false,
    };
  },
  methods: {
    getTileClass(cell) {
      return `tile-${cell}`;
    },
    restartGame() {
      this.resetBoard();
          setTimeout(() => {
        this.gameOver = false; // Установить gameOver в false после небольшой задержки
      }, 100);
      // ...
    },
    created() {
  this.bestScore = parseInt(sessionStorage.getItem('bestScore')) || 0; // Восстанавливаем значение рекорда из sessionStorage или устанавливаем 0, если оно не существует
},
resetBoard() {
  this.gameOver = false;

  // Сохраняем текущий bestScore перед сбросом score
  const previousBestScore = this.bestScore;

  // Сбрасываем только score, оставляя bestScore без изменений
  this.score = 0;

  // Clear the cells array and populate it with initial values
  this.cells = Array.from({ length: 16 }, () => 0);
  const firstCellValue = Math.random() < 0.9 ? 2 : 4;
  const secondCellValue = Math.random() < 0.9 ? 2 : 4;

  // Generate random positions for the first two cells
  let firstCellPosition = Math.floor(Math.random() * 16);
  let secondCellPosition;

  // Ensure the second cell is placed in a different position than the first cell
  do {
    secondCellPosition = Math.floor(Math.random() * 16);
  } while (secondCellPosition === firstCellPosition);

  // Assign the values to the corresponding positions in the cells array
  this.cells[firstCellPosition] = firstCellValue;
  this.cells[secondCellPosition] = secondCellValue;

  // Восстанавливаем сохраненный bestScore
  this.bestScore = previousBestScore;

  // After updating the cells array, set gameOver to false
  this.gameOver = true;
},
    generateNewCell() {
  const randomValue = Math.random() < 0.9 ? 2 : 4;
  const emptyCells = this.cells.map((cell, index) => ({ cell, index })).filter(({ cell }) => cell === 0);

  if (emptyCells.length === 0) {
    return; // Возврат из функции, если нет пустых ячеек
  }
  
  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { index } = emptyCells[randomIndex];
    this.cells[index] = randomValue;

    const cellElement = document.querySelector(`.cell:nth-child(${index + 1})`);
      if (cellElement) {
        cellElement.classList.add('tile-appear', 'new');
        cellElement.addEventListener('animationend', function() {
          cellElement.classList.remove('new');
        });
      }
  }

  return randomValue; // Добавлено возвращаемое значение
},
    initializeCells() {
      for (let i = 0; i < 16; i++) {
        this.cells.push(0);
      }
      this.generateNewCell();
      this.generateNewCell();
    },
    generateNewCellWithExclusion() {
  const emptyIndices = [];
  this.cells.forEach((cell, index) => {
    if (cell === 0) {
      emptyIndices.push(index);
    }
  });

  // Проверка на наличие пустых ячеек
  if (emptyIndices.length === 0) {
    return; // Возврат из функции, если нет пустых ячеек
  }

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  const randomValue = this.generateNewCell(); // Генерация нового значения ячейки
  this.cells[randomIndex] = randomValue; // Присваивание значения ячейке
},
    
  handleKeyDown(event) {
  event.preventDefault();

  let canMove = false; // Флаг для отслеживания возможности перемещения

  if (event.key === 'ArrowRight') {
    canMove = this.moveRight();
  } else if (event.key === 'ArrowLeft') {
    canMove = this.moveLeft();
  } else if (event.key === 'ArrowDown') {
    canMove = this.moveDown();
  } else if (event.key === 'ArrowUp') {
    canMove = this.moveUp();
  }

  if (canMove) {
    this.generateNewCellWithExclusion();
    this.updateTileClasses();
    this.renderGameBoard();
  }
},

moveRight() {
  
  const rowIndices = [0, 1, 2, 3];

  let canMove = false;

  rowIndices.forEach((rowIndex) => {
    const row = this.cells.slice(rowIndex * 4, rowIndex * 4 + 4);
    const [newRow, rowCanMove] = this.moveRowRight(row);

    if (rowCanMove) {
      canMove = true;
      for (let i = 0; i < 4; i++) {
        this.cells[rowIndex * 4 + i] = newRow[i];
      }
    }
  });
  let mergedScore = 0;
  if (mergedScore > 0) {
    this.score += mergedScore; // Обновляем общий счет
    if (this.score > this.currentScore) {
      this.currentScore = this.score; // Обновляем текущий счет
      if (this.currentScore > this.bestScore) {
        this.bestScore = this.currentScore; // Обновляем рекордный счет
        sessionStorage.setItem('bestScore', this.bestScore); // Сохраняем рекордный счет в sessionStorage
      }
    }
  }


  this.checkGameOver();

  return canMove;
},

moveRowRight(row) {
  const newRow = row.slice();
  let canMove = false;
  let mergedScore = 0;

  for (let i = 2; i >= 0; i--) {
    if (newRow[i] !== 0) {
      let j = i + 1;
      while (j < 4 && newRow[j] === 0) {
        newRow[j] = newRow[j - 1];
        newRow[j - 1] = 0;
        j++;
        canMove = true;
      }
      if (j < 4 && newRow[j] === newRow[j - 1]) {
        newRow[j] *= 2;
        mergedScore += newRow[j]; // Увеличиваем сумму слияний
        newRow[j - 1] = 0;
        canMove = true;
      }
    }
  }

  if (mergedScore > 0) {
    this.score += mergedScore; // Обновляем общий счет
    if (this.score > this.currentScore) {
      this.currentScore = this.score; // Обновляем текущий счет
      if (this.currentScore > this.bestScore) {
        this.bestScore = this.currentScore; // Обновляем рекордный счет
        sessionStorage.setItem('bestScore', this.bestScore); // Сохраняем рекордный счет в sessionStorage
      }
    }
  }

  return [newRow, canMove];
},

moveLeft() {
  const rowIndices = [0, 1, 2, 3];

  let canMove = false;

  rowIndices.forEach((rowIndex) => {
    const row = this.cells.slice(rowIndex * 4, rowIndex * 4 + 4);
    const [newRow, rowCanMove] = this.moveRowLeft(row);

    if (rowCanMove) {
      canMove = true;
      for (let i = 0; i < 4; i++) {
        this.cells[rowIndex * 4 + i] = newRow[i];
      }
    }
  });
  let mergedScore = 0;
  if (mergedScore > 0) {
    this.score += mergedScore; // Обновляем общий счет
    if (this.score > this.currentScore) {
      this.currentScore = this.score; // Обновляем текущий счет
      if (this.currentScore > this.bestScore) {
        this.bestScore = this.currentScore; // Обновляем рекордный счет
        sessionStorage.setItem('bestScore', this.bestScore); // Сохраняем рекордный счет в sessionStorage
      }
    }
  }
  this.checkGameOver();

  return canMove;
},

moveRowLeft(row) {
  const newRow = row.slice();
  let canMove = false;
  let mergedScore = 0;

  for (let i = 1; i < 4; i++) {
    if (newRow[i] !== 0) {
      let j = i - 1;
      while (j >= 0 && newRow[j] === 0) {
        newRow[j] = newRow[j + 1];
        newRow[j + 1] = 0;
        j--;
        canMove = true;
      }
      if (j >= 0 && newRow[j] === newRow[j + 1]) {
        newRow[j] *= 2;
        mergedScore += newRow[j]; // Увеличиваем сумму слияний
        newRow[j + 1] = 0;
        canMove = true;
      }
    }
  }

  if (mergedScore > 0) {
    this.score += mergedScore; // Обновляем общий счет
    if (this.score > this.currentScore) {
      this.currentScore = this.score; // Обновляем текущий счет
      if (this.currentScore > this.bestScore) {
        this.bestScore = this.currentScore; // Обновляем рекордный счет
        sessionStorage.setItem('bestScore', this.bestScore); // Сохраняем рекордный счет в sessionStorage
      }
    }
  }

  return [newRow, canMove];
},

moveDown() {
  const rowIndices = [0, 1, 2, 3];
  const columnIndices = [0, 1, 2, 3];

  let canMove = false;

  columnIndices.forEach((colIndex) => {
    const column = rowIndices.map((rowIndex) => this.cells[rowIndex * 4 + colIndex]);
    const [newColumn, columnCanMove] = this.moveColumnDown(column);

    if (columnCanMove) {
      canMove = true;
      rowIndices.forEach((rowIndex) => {
        this.cells[rowIndex * 4 + colIndex] = newColumn[rowIndex];
      });
    }
  });
  let mergedScore = 0;
  if (mergedScore > 0) {
    this.score += mergedScore; // Обновляем общий счет
    if (this.score > this.currentScore) {
      this.currentScore = this.score; // Обновляем текущий счет
      if (this.currentScore > this.bestScore) {
        this.bestScore = this.currentScore; // Обновляем рекордный счет
        sessionStorage.setItem('bestScore', this.bestScore); // Сохраняем рекордный счет в sessionStorage
      }
    }
  }
  this.checkGameOver();

  return canMove;
},

moveColumnDown(column) {
  const newColumn = column.slice();
  let canMove = false;
  let mergedScore = 0;

  for (let i = 2; i >= 0; i--) {
    if (newColumn[i] !== 0) {
      let j = i + 1;
      while (j < 4 && newColumn[j] === 0) {
        newColumn[j] = newColumn[j - 1];
        newColumn[j - 1] = 0;
        j++;
        canMove = true;
      }
      if (j < 4 && newColumn[j] === newColumn[j - 1]) {
        newColumn[j] *= 2;
        mergedScore += newColumn[j]; // Увеличиваем сумму слияний
        newColumn[j - 1] = 0;
        canMove = true;
      }
    }
  }

  if (mergedScore > 0) {
    this.score += mergedScore; // Обновляем общий счет
    if (this.score > this.currentScore) {
      this.currentScore = this.score; // Обновляем текущий счет
      if (this.currentScore > this.bestScore) {
        this.bestScore = this.currentScore; // Обновляем рекордный счет
        sessionStorage.setItem('bestScore', this.bestScore); // Сохраняем рекордный счет в sessionStorage
      }
    }
  }

  return [newColumn, canMove];
},

moveUp() {
  const rowIndices = [0, 1, 2, 3];
  const columnIndices = [0, 1, 2, 3];

  let canMove = false;

  columnIndices.forEach((colIndex) => {
    const column = rowIndices.map((rowIndex) => this.cells[rowIndex * 4 + colIndex]);
    const [newColumn, columnCanMove] = this.moveColumnUp(column);

    if (columnCanMove) {
      canMove = true;
      rowIndices.forEach((rowIndex) => {
        this.cells[rowIndex * 4 + colIndex] = newColumn[rowIndex];
      });
    }
  });
  let mergedScore = 0;
  if (mergedScore > 0) {
    this.score += mergedScore; // Обновляем общий счет
    if (this.score > this.currentScore) {
      this.currentScore = this.score; // Обновляем текущий счет
      if (this.currentScore > this.bestScore) {
        this.bestScore = this.currentScore; // Обновляем рекордный счет
        sessionStorage.setItem('bestScore', this.bestScore); // Сохраняем рекордный счет в sessionStorage
      }
    }
  }

  this.checkGameOver();

  return canMove;
},

moveColumnUp(column) {
  const newColumn = column.slice();
  let canMove = false;
  let mergedScore = 0;
  let movedCells = [];

  for (let i = 1; i < 4; i++) {
    if (newColumn[i] !== 0) {
      let j = i - 1;
      while (j >= 0 && newColumn[j] === 0) {
        newColumn[j] = newColumn[j + 1];
        newColumn[j + 1] = 0;
        j--;
        canMove = true;
        movedCells.push({ from: [i, j + 1], to: [i, j] });
      }
      if (j >= 0 && newColumn[j] === newColumn[j + 1]) {
        newColumn[j] *= 2;
        mergedScore += newColumn[j];
        newColumn[j + 1] = 0;
        canMove = true;
        movedCells.push({ from: [i, j + 1], to: [i, j] });
      }
    }
  }

  if (mergedScore > 0) {
    this.score += mergedScore; // Обновляем общий счет
    if (this.score > this.currentScore) {
      this.currentScore = this.score; // Обновляем текущий счет
      if (this.currentScore > this.bestScore) {
        this.bestScore = this.currentScore; // Обновляем рекордный счет
        sessionStorage.setItem('bestScore', this.bestScore); // Сохраняем рекордный счет в sessionStorage
      }
    }

    return [newColumn, canMove];
  } else {
    return [column, canMove];
  }
  
},

animateCellMovement(movedCells, direction) {
  movedCells.forEach((movement) => {
    const [fromRow, fromCol] = movement.from;
    const [toRow, toCol] = movement.to;

    const fromIndex = fromRow * 4 + fromCol;
    const toIndex = toRow * 4 + toCol;

    const fromCellElement = document.querySelector(`.cell:nth-child(${fromIndex + 1})`);
    const toCellElement = document.querySelector(`.cell:nth-child(${toIndex + 1})`);

    if (fromCellElement && toCellElement) {
      // Применяем класс анимации движения в зависимости от выбранной стрелки
      if (direction === 'up') {
        fromCellElement.classList.add('cell-move-up');
        toCellElement.classList.add('cell-move-up');
      } else if (direction === 'down') {
        fromCellElement.classList.add('cell-move-down');
        toCellElement.classList.add('cell-move-down');
      } else if (direction === 'left') {
        fromCellElement.classList.add('cell-move-left');
        toCellElement.classList.add('cell-move-left');
      } else if (direction === 'right') {
        fromCellElement.classList.add('cell-move-right');
        toCellElement.classList.add('cell-move-right');
      }

      // Удаление классов анимации и восстановление состояния после завершения анимации
      const animationDuration = 200; // Длительность анимации в миллисекундах

      setTimeout(() => {
        // Удаляем классы анимации
        fromCellElement.classList.remove('cell-move-up', 'cell-move-down', 'cell-move-left', 'cell-move-right');
        toCellElement.classList.remove('cell-move-up', 'cell-move-down', 'cell-move-left', 'cell-move-right');

        // Восстанавливаем состояние ячеек
        fromCellElement.style.transform = '';
        toCellElement.style.transform = '';
      }, animationDuration);
    }
  });
}




,

checkGameOver() {
  let bestRecord = 0;
  if (this.score > bestRecord) {
    bestRecord = this.score;
  }
  // Проверяем, есть ли свободные ячейки
  const hasEmptyCells = this.cells.some((cell) => cell === 0);

  // Проверяем, есть ли возможные ходы
  const canMove = this.checkMoveAvailability();

  if (!hasEmptyCells && !canMove) {
    // Если нет свободных ячеек и возможных ходов, игра завершается
    const gameOverScreen = document.getElementById('game-over-screen');
    const gameContainer = document.querySelector('.game-container');

    gameOverScreen.classList.remove('hidden');
    gameContainer.setAttribute('tabindex', '-1');
    gameContainer.focus();
  }
},

checkMoveAvailability() {
  // Проверяем, есть ли возможные ходы
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const cellValue = this.cells[row * 4 + col];

      // Проверяем возможность сдвига ячеек вверх
      if (row > 0 && (this.cells[(row - 1) * 4 + col] === 0 || this.cells[(row - 1) * 4 + col] === cellValue)) {
        return true;
      }

      // Проверяем возможность сдвига ячеек вниз
      if (row < 3 && (this.cells[(row + 1) * 4 + col] === 0 || this.cells[(row + 1) * 4 + col] === cellValue)) {
        return true;
      }

      // Проверяем возможность сдвига ячеек влево
      if (col > 0 && (this.cells[row * 4 + col - 1] === 0 || this.cells[row * 4 + col - 1] === cellValue)) {
        return true;
      }

      // Проверяем возможность сдвига ячеек вправо
      if (col < 3 && (this.cells[row * 4 + col + 1] === 0 || this.cells[row * 4 + col + 1] === cellValue)) {
        return true;
      }
    }
  }

  return false;
},
    
updateTileClasses() {
  this.cells.forEach((cell, index) => {
    const tileClass = `tile-${cell}`;
    const cellElement = document.querySelector(`.cell:nth-child(${index + 1})`);
    if (cellElement) {
      cellElement.className = `cell w-28 h-28 bg-[#CCC1B5] rounded-[12px] flex items-center justify-center ${tileClass}`;
    }
  });
},
renderGameBoard() {
  const scoreElement = document.querySelector('.score');
  scoreElement.textContent = this.currentScore;

  // Обновление рекорда
  const bestScoreElement = document.querySelector('.best-score');
  bestScoreElement.textContent = this.bestScore;
},
  },
  mounted() {
    this.initializeCells();
  this.generateNewCell(); // Вызываем generateNewCell() после инициализации ячеек
  }
};
</script>

<style>

.tile-2 {
background-color: #EFE5DB;
color: #766C66;
font-size: 44px;
animation: zoomIn 0.3s;
}
.tile-4 {
background-color: #ECE0C6;
color: #766C66;
font-size: 44px
}
.tile-8 {
background-color: #F1B17A;
color: #FBF6F7;
font-size: 44px
}
.tile-16 {
background-color: #F59564;
color: #FBF6F7;
font-size: 44px
}
.tile-32 {
background-color: #FE7E5E;
color: #FBF6F7;
font-size: 44px
}
.tile-64 {
background-color: #FF5D37;
color: #FBF6F7;
font-size: 44px
}
.tile-128 {
background-color: #FBCD6D;
color: #FBF6F7;
font-size: 44px
}
.tile-256 {
background-color: #F5CE58;
color: #FBF6F7;
font-size: 44px
}
.tile-512{
background-color: #FAC941;
color: #FBF6F7;
font-size: 44px
}
.tile-1024 {
background-color: #FBC72B;
color: #FBF6F7;
font-size: 35px
}
.tile-2048 {
background-color: #FBC301;
color: #FBF6F7;
font-size: 35px
}
.tile-4096 {
background-color: #3E3A32;
color: #FBF6F7;
font-size: 35px
}
.tile-8192 {
background-color: #3E3A32;
color: #FBF6F7;
font-size: 35px
}
.tile-16384 {
background-color: #3E3A32;
color: #FBF6F7;
font-size: 30px
}
.tile-32768 {
background-color: #3E3A32;
color: #FBF6F7;
font-size: 30px
}
.tile-65536{
background-color: #3E3A32;
color: #FBF6F7;
font-size: 30px
}
@keyframes zoomIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.cell {
  animation: zoomIn 0.3s;
}

.cell-move {
  animation: move-cell-animation 0.2s;
}

@keyframes move-cell-animation {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100%, 0);
  }
}

@keyframes tileAppear {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.cell.tile-appear {
  animation: tile-appear 0.2s ease-out;
}

.tile {
  /* Применяем анимацию только к ячейкам с классом tile */
  animation: tileAppear 0.2s ease-in-out forwards;
}

.tile-0 {
  /* Исключаем анимацию для ячеек с классом tile-0 */
  animation: none;
}

@keyframes move-cell-up {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}

@keyframes move-cell-down {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}

@keyframes move-cell-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes move-cell-right {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

.cell-move-up {
  /* Применяем анимацию только к ячейкам с классом tile */
  animation: move-cell-up 0.2s ease-in-out forwards;
}

.cell-move-down {
  /* Применяем анимацию только к ячейкам с классом tile */
  animation: move-cell-down 0.2s ease-in-out forwards;
}

.cell-move-right {
  /* Применяем анимацию только к ячейкам с классом tile */
  animation: move-cell-right 0.2s ease-in-out forwards;
}

.cell-move-left {
  /* Применяем анимацию только к ячейкам с классом tile */
  animation: move-cell-left 0.2s ease-in-out forwards;
}

/* Добавьте стили для остальных тайлов */
</style>
