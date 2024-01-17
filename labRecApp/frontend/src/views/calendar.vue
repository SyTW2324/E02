<template>
    <div class="app" id="calendar">
      <header>
        <NavBarComponent />
      </header>
      <CalendarComponent />
      <footer>
        <footerComponent />
      </footer>
    </div>
  </template>
  
  <script lang="ts">
  import NavBarComponent from "../components/mainNavbar.vue"
  import footerComponent from "../components/footer.vue";
  import CalendarComponent from "../components/calendarComponent.vue"
  
  export default {
    name: "calendarView",
    components: {
      NavBarComponent,
      CalendarComponent,
      footerComponent,
    }
  };
  </script>
  
  <style scoped>
  </style>