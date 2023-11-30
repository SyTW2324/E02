<template class="login_component_template">
  <div class="app">
    <header>
      <navbarComponent></navbarComponent>
    </header>
    <div class="login_Component">
      <img alt="Login logo" src="../assets/Login_usuario.png" />
      <div class="login_form">
        <input type="text" placeholder="Email" v-model="user_data.email" @input="validateEmail" :class="{valid: isValidEmail == true && user_data.email.length > 0, invalid: isValidEmail == false}"/>
      </div>
      <div class="login_form">
        <input type="password" placeholder="Password" v-model="user_data.password" @keyup.enter="clickk"/>
      </div>
      <div class="login_form">
        <button @click="clickk">
          Login
        </button>
      </div>
    </div>
    <footer>
      <footerComponent></footerComponent>
    </footer>
    <AlertMessage :show="authStore.loginError" :errorMessage="errorLoginMessage" @close="clearLoginErrorMessage"></AlertMessage>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import "../styles/login_style.css"
import { userAuthentication } from "../tools/store";
import AlertMessage from "../components/alertMessage.vue"
import { useRouter } from 'vue-router';
import navbarComponent from "../components/navbar.vue";
import footerComponent from "../components/footer.vue";
import '../styles/app_style.css';

  export default defineComponent({
    name: 'LoginComponent',
    components: {
      AlertMessage,
      navbarComponent,
      footerComponent
    },
    setup() {  
      const authStore = userAuthentication();
      const router = useRouter();
      const errorLoginMessage = "Credenciales Inválidas"
      const user_data = {
        email: "",
        password: ""
      }  
      const clickk = async () => {
        const response = await authStore.login(user_data);
        console.log(authStore.getUserData())
        console.log(authStore.getAuthentication());
        if (response == "Success") {
          //Redirigimos al usuario a la página principal de la aplicación
          router.push('/mainPage')
        } else if (response == "Error") {
          console.log("Credenciales inválidas")
        }
      }
      const clearLoginErrorMessage = () => {
        authStore.loginError = false;
      }
      return {
        user_data,
        clickk,
        authStore,
        errorLoginMessage,
        clearLoginErrorMessage
      } 
    },  
    data() {
      return {
        isValidEmail: true,
      };
    },
    methods: {
      validateEmail() {
        // Expresión regular para validar el formato del correo electrónico
        const emailRegex = /^[^\s@]+@labrecordapp.es/;
        this.isValidEmail = emailRegex.test(this.user_data.email);
      },
    },
  })
</script>
<style scoped>
</style>