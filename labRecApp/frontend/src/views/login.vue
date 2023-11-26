<template class="login_component_template">
  <div class="login_Component">
    <img alt="Login logo" src="../assets/Login_usuario.png" />
    <div class="login_form">
      <input type="text" placeholder="Email" v-model="user_data.email"/>
    </div>
    <div class="login_form">
      <input type="password" placeholder="Password" v-model="user_data.password" @keyup.enter="on_click"/>
    </div>
    <div class="login_form">
      <button @click="on_click">
        Login
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import "../styles/login_style.css"
import { userAuthentication } from "../tools/store";

  export default defineComponent({
    name: 'LoginComponent',
    setup() {  
      const authStore = userAuthentication();
      const user_data = {
        email: "",
        password: ""
      }  
      const on_click = async () => {
        const response = await authStore.login(user_data);
        console.log(authStore.getUserData())
        console.log(authStore.getAuthentication());
        // Si el response es "loged" logueamos al usuario
        // Si es "wrong" emitimos error  
      }
      return {
        user_data,
        on_click
      } 
        }
  })
</script>
<style scoped>
</style>