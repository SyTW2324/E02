<template>
  <div class="app" id="mainPage">
    <header>
      <mainNavbarComponent></mainNavbarComponent>
    </header>
    <div class="mainPage_Component">
      <h1>Hello {{ authStore.name }}</h1>
    </div>
    <footer>
      <footerComponent></footerComponent>
    </footer>
  </div>
</template>
<script lang="ts">
import "../styles/mainPage_style.css"
import { userAuthentication } from "../tools/store"; 
import mainNavbarComponent from "../components/mainNavbar.vue"
import footerComponent from "../components/footer.vue";

export default {
  name: 'HomePageView',
  props: {

  },
  components: {
    mainNavbarComponent,
    footerComponent
  },
  setup() {
    const authStore = userAuthentication();

    return {
      authStore
    }
  }
} 
</script>
<style scoped>
</style>