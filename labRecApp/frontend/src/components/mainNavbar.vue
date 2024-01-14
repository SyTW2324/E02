<template>
  <div class="card relative z-2 navbar">
    <div class="card relative z-2">
      <Menubar :model="items" class="navbarmenu" @click="handleNavbarClick">
        <template #start>
          <a href=""><img alt="logo" src="../assets/Logo.png" height="60" class="logo"/></a>
        </template>
      </Menubar>
    </div>
  </div>
</template>

<script lang="ts">
import Menubar from 'primevue/menubar';
import "../styles/mainNavbar_style.css"

const items = [
  {
    label: 'Mi cuenta',
    icon: 'pi pi-fw pi-user',
    items: [
      {
        label: 'Datos',
        icon: 'pi pi-fw pi-align-justify',
        to: ''
      },
      {
        label: 'Cambiar la contraseña',
        icon: 'pi pi-fw pi-cog',
        to: ''
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-fw pi-sign-out',
        to: ''
      }
    ]
  },
  {
    label: 'Registros de tiempo',
    icon: 'pi pi-fw pi-clock',
    items: [
      {
        label: 'Registrar',
        icon: 'pi pi-fw pi-plus',
        to: ''
      },
      {
        label: 'Ausencias',
        icon: 'pi pi-fw pi-exclamation-circle',
        to: ''
      },
      {
        label: 'Informe',
        icon: 'pi pi-fw pi-file',
        to: ''
      },
      {
        label: 'Registro de usuarios',
        icon: 'pi pi-fw pi-users',
        to: ''
      }
    ]
  },
  {
    label: 'Calendario',
    icon: 'pi pi-fw pi-calendar',
    to: '',
  },
  {
    label: 'Manual',
    icon: 'pi pi-fw pi-info-circle',
    to: '',
  }
];

export default {
  data() {
    return {
      items
    }
  },
  name: "mainNavbarComponent",
  components: {
    Menubar
  },
  setup() {
    // Función para manejar el clic en la barra de navegación
    const handleNavbarClick = (event: any) => {
      const clickedItemLabel = event.item.label;
      console.log("Se clickea: ")
      console.log(clickedItemLabel)
    };
    return {
      handleNavbarClick
    }
  }
}
</script>

<style scoped>
</style>