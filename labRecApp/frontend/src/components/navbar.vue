<template>
  <div class="card relative z-2 navbar">
    <div class="card relative z-2">
      <Menubar :model="items" class="navbarmenu">
        <template #start>
          <img alt="logo" src="../assets/Logo.png" height="60" class="mr-2" />
        </template>
      </Menubar>
    </div>
  </div>
</template>

<script lang="ts">
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
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