<template>
  <div>
    <Header />

    <router-view></router-view>
    
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/headerComp.vue";
import Footer from "@/components/footerComp.vue";

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
/* Ваш стилевой код для компонента App.vue */
</style>
