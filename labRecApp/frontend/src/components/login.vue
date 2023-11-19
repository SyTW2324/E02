<template class="login_component_template">
  <div class="login_Component">
    <img alt="Login logo" src="../assets/Login_usuario.png" />
    <div class="login_form">
      <input type="text" placeholder="Email" v-model="user_data.email"/>
    </div>
    <div class="login_form">
      <input type="password" placeholder="Password" v-model="user_data.password"/>
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
import axios from 'axios';
import jwt from 'jsonwebtoken'

  export default defineComponent({
    name: 'LoginComponent',
    setup() {   
      const user_data = {
        email: "",
        password: ""
      }  
      const on_click = () => {
        // console.log(user_data.email)
        // console.log(user_data.password)
        const data = {
          email: user_data.email,
          password: user_data.password
        }

        axios.post('http://localhost:3000/users/login', data)
          .then(response => {
            console.log(response.data)
        })
        .catch(error => {
          console.error('Error de autentificación: ', error);
        });

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