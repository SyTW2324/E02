<template>
  <div class="card relative z-2 navbar">
    <div class="card relative z-2">
      <Menubar :model="items" class="navbarmenu">
        <template #start>
          <a href="/"><img alt="logo" src="../assets/Logo.png" height="60" class="mr-2"/></a>
        </template>
      </Menubar>
    </div>
  </div>
</template>

<script lang="ts">
import Menubar from 'primevue/menubar';
import "../styles/navbar_style.css"

const items = [
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    to: '/',
  },
  {
    label: 'Login',
    icon: 'pi pi-fw pi-sign-in',
    to: '/login',
  },
];

export default {
  data() {
    return {
      items
    }
  },
  name: "navbarComponent",
  components: {
    Menubar
  }
}
</script>

<style scoped>
</style>