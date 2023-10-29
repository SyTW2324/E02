<template class="login_component_template">
  <div class="login_Component">
    <img alt="Login logo" src="../assets/login_Logo.png" />
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

  export default defineComponent({
    name: 'LoginComponent',
    setup() {   
      const user_data = {
        email: "",
        password: ""
      }  
      const on_click = () => {
        console.log(user_data.email)
        console.log(user_data.password)        
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