<template>
  <div class="home_Component">
    <img alt="Bienvenidos A Registro Laboral" src="../assets/Bienvenidos.png"/>
    <div>
      <Carousel :value="images">
        <template #item="{ data }">
          <img :src=data.images alt="Imágen"/>
        </template>
      </Carousel>
    </div>
  </div>
</template>
<script lang="ts">
import "../styles/home_style.css"
import Carousel from 'primevue/carousel';

  export default {
    name: 'homeComponent',
    components: {
      Carousel
    },
    data() {
      return {
        images: [
          "../assets/Registro.png",
          "../assets/Cuenta.png",
          "../assets/Calendario.png",
          "../assets/Manual.png"
        ]
      }
    }
  }
</script>
<style scoped>
</style>