<template>
  <div v-if="show" class="alert-message">
    <div class="alert-content">
      <p>{{ errorMessage }}</p>
      <button @click="closeAlert">Cerrar</button>
    </div>
  </div>
</template>
<script lang="ts">
  import '../styles/alertMessage_style.css';
  
  export default {
    name: 'AlertMessageComponent',
    props: {
      show: Boolean,
      errorMessage: String  
    },
    setup(props, {emit}) {
      const closeAlert = () => {
        emit('close')
      }
      return {
        closeAlert,
      }
    }
      
  }
</script>
<style scoped>
</style>