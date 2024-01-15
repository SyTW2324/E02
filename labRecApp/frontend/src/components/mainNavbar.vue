<template>
  <div class="card relative z-2 navbar">
    <div class="card relative z-2">
      <Menubar :model="items" class="navbarmenu">
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
import { userAuthentication } from "../tools/store";
import { useRouter } from 'vue-router';

export default {
  data() {
  },
  name: "mainNavbarComponent",
  components: {
    Menubar
  },
  setup() {
    const authStore = userAuthentication();
    const router = useRouter();
    const logout = () => {
      //console.log("Esta entrando aqui ...")

      // limpiamos los datos del usuario
      authStore.clearAuthenticationData();
      // enviamos al usuario a la pagina de inicio
      router.push('/');
    } 

    const redirectToProfie = () => {
      router.push('/profile')
    }

    const items = [
      {
        label: 'Mi cuenta',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Perfil',
            icon: 'pi pi-fw pi-align-justify',
            command: redirectToProfie
          },
          {
            label: 'Cambiar la contraseña',
            icon: 'pi pi-fw pi-cog',
            to: ''
          },
          {
            label: 'Cerrar sesión',
            icon: 'pi pi-fw pi-sign-out',
            command: logout
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

    return {
      items
    }
  }
}
</script>

<style scoped>
</style>