<template>
  <div class="app">
    <header>
      <navbarComponent></navbarComponent>
    </header>
    <div class="home_Component">
      <img alt="Bienvenidos A Registro Laboral" src="../assets/Bienvenidos.png"/>
      <div class="carousel">
        <Carousel :value="images" :numVisible="1" :numScroll="1" circular :autoplay-interval="3000">
          <template #item="{ data }">
            <img :src="data" alt="Funcionalidades de la aplicación" class="carousel_img"/>
          </template>
        </Carousel>
      </div>
    </div>
    <footer>
      <footerComponent></footerComponent>
    </footer>
  </div>
</template>
<script lang="ts">
import "../styles/home_style.css"
import Carousel from 'primevue/carousel';
import registro from '@/assets/Registro.png';
import cuenta from '@/assets/Cuenta.png';
import calendario from '@/assets/Calendario.png';
import manual from '@/assets/Manual.png';
import navbarComponent from "../components/navbar.vue";
import footerComponent from "../components/footer.vue";

  export default {
    name: 'homeComponent',
    components: {
      Carousel,
      navbarComponent,
      footerComponent
    },
    data() {
      return {
        images: [registro, cuenta, calendario, manual]
      }
    }
  }
</script>
<style scoped>
</style>