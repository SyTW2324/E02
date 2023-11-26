<template>
  <h1>Hello {{ authStore.name }}</h1>
</template>
<script lang="ts">
import { userAuthentication } from "../tools/store"; 

export default {
  name: 'HomePageView',
  props: {

  },
  components: {

  },
  setup() {
    const authStore = userAuthentication();

    return {
      authStore
    }
  }
} 
</script>
<style scoped>
</style>