<template>
  <div class="app" id="mainPage">
    <header>
      <mainNavbarComponent></mainNavbarComponent>
    </header>
    <mainPageComponent />
    <footer>
      <footerComponent></footerComponent>
    </footer>
  </div>
</template>

<script lang="ts">
import mainNavbarComponent from "../components/mainNavbar.vue"
import footerComponent from "../components/footer.vue";
import MainPageComponent from "../components/mainPageComponent.vue";

export default {
  name: 'HomePageView',
  components: {
    mainNavbarComponent,
    footerComponent,
    MainPageComponent,
  }
} 
</script>

<style scoped>
</style>