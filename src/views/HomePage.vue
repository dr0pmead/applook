<template>
  <div>
    <div class="p-6 px-12">
      <h1 class="text-2xl font-bold mb-6 text-[#838383]">Коллекция игр</h1>

      <div class="grid grid-cols-4 gap-4">
        <div class="w-full rounded-[12px] border border-[#838383] card cursor-pointer ">
          <img src="@/assets/tfe-logo.jpg" />
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

</style>
