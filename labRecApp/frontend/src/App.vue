<template>
  <div id="app">
    <header>
      <navbarComponent></navbarComponent>
    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <footerComponent></footerComponent>
    </footer>
  </div>
</template>

<script setup lang="ts">
import navbarComponent from "./components/navbar.vue";
import footerComponent from "./components/footer.vue";
import './styles/app_style.css';
</script>

<style scoped></style>
