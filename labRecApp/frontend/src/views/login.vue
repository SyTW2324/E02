<template class="login_component_template">
  <div class="login_Component">
    <img alt="Login logo" src="../assets/Login_usuario.png" />
    <div class="login_form">
      <input type="text" placeholder="Email" v-model="user_data.email"/>
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
  <AlertMessage :show="authStore.loginError" :errorMessage="errorLoginMessage" @close="clearLoginErrorMessage"></AlertMessage>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import "../styles/login_style.css"
import { userAuthentication } from "../tools/store";
import AlertMessage from "../components/alertMessage.vue"
import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'LoginComponent',
    components: {
      AlertMessage
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
    }
  })
</script>
<style scoped>
</style>