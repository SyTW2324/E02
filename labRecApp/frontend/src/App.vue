<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import './styles/app_style.css';
import {  onBeforeMount} from 'vue';
import { userAuthentication } from './tools/store';

const authStore = userAuthentication();

//onMounted(() => {
//  authStore.initialize();
//});

onBeforeMount(() => {
  authStore.initialize();
});
</script>

<style scoped></style>
