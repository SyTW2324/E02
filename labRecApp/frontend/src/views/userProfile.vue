<template>
  <div class="app" id="profile">
    <header>
      <NavBarComponent />
    </header>
    <UserProfileComponent />
    <footer>
      <footerComponent />
    </footer>
  </div>
</template>

<script lang="ts">
import NavBarComponent from "../components/mainNavbar.vue"
import footerComponent from "../components/footer.vue";
import UserProfileComponent from "../components/userProfileComponent.vue"

export default {
  components: {
    NavBarComponent,
    UserProfileComponent,
    footerComponent,
  },
};
</script>

<style scoped>
</style>