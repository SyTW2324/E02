<template>
  <div id="app">
    <header>
      <div class="card relative z-2 navbar">
        <div class="card relative z-2">
          <Menubar :model="items">
            <template #start>
              <img alt="logo" src="https://primefaces.org/cdn/primevue/images/logo.svg" height="40" class="mr-2" />
            </template>
            <!-- ... el resto de tu código para los elementos de Menubar ... -->
            <template #end>
              <InputText placeholder="Search" type="text" />
            </template>
          </Menubar>
        </div>
      </div>
    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <!-- Contenido del pie de página -->
    </footer>
  </div>
</template>

<script setup lang="ts">
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import Menubar from 'primevue/menubar';

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
</script>

<style scoped></style>
