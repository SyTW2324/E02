<template>
  <div class="card relative z-2 navbar">
    <div class="card relative z-2">
      <Menubar :model="items" class="navbarmenu">
        <template #start>
          <a><img alt="logo" src="../assets/Logo.png" height="60" class="logo" @click="redirectToMainPage()"/></a>
        </template>
      </Menubar>
    </div>
    <RegisterForm v-if="registerRequest" :showForm="registerRequest" @close="closeRegister()" />
  </div>
</template>

<script lang="ts">
import Menubar from 'primevue/menubar';
import "../styles/mainNavbar_style.css"
import { userAuthentication } from "../tools/store";
import { useRouter } from 'vue-router';
import RegisterForm from "../components/registerForm.vue"
import {ref} from "vue" 

export default {
  data() {
  },
  name: "mainNavbarComponent",
  components: {
    Menubar,
    RegisterForm
  },
  setup() {
    const authStore = userAuthentication();
    const router = useRouter();
    var registerRequest = ref(false);
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

    const redirectToMainPage = () => {
      router.push('/mainPage')
    }

    const openRegister = () => {
      console.log("ENTRA AQUI")
      registerRequest.value = true;
    }

    const closeRegister = () => {
      registerRequest.value = false;
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
            command: openRegister
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
      items,
      redirectToMainPage,
      registerRequest,
      closeRegister
    }
  }
}
</script>

<style scoped>
</style>