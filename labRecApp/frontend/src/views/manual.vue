<template>
  <div class="app" id="manual">
    <header>
      <NavBarComponent />
    </header>
    <ManualComponent />
    <footer>
      <footerComponent />
    </footer>
  </div>
</template>

<script lang="ts">
import NavBarComponent from "../components/mainNavbar.vue"
import footerComponent from "../components/footer.vue";
import ManualComponent from "../components/manualComponent.vue"

export default {
  name: "manualView",
  components: {
    NavBarComponent,
    ManualComponent,
    footerComponent,
  }
};
</script>

<style scoped>
</style>