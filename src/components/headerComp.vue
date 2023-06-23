<template>
    <header class="text-white p-6 px-12">
        <div class="w-full max-h-[80px] flex justify-between items-center">
            <div class="logo">
                <router-link to="/"><img src="../assets/logo-applock.svg" alt="Логотип" class="w-[150px]"></router-link>
            </div>
        
            <div class="login-icon">
              <button ><svg width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="hover:opacity-[0.8] duration-150">
                <path d="M18.3333 11.6667L16 14L20.3333 18.3333H3.33334V21.6667H20.3333L16 26L18.3333 28.3333L26.6667 20L18.3333 11.6667ZM33.3333 31.6667H20V35H33.3333C35.1667 35 36.6667 33.5 36.6667 31.6667V8.33333C36.6667 6.5 35.1667 5 33.3333 5H20V8.33333H33.3333V31.6667Z" fill="#f2f2f7"/>
                </svg>
                
                </button>
            </div>

        </div>
    </header>
  </template>
  
  <script>
  export default {
    // Ваш код логики компонента, если необходимо
  }
  </script>
  
  <style scoped>


.logo {
  font-size: 24px;
}

.login-icon {
  font-size: 20px;
}
</style>