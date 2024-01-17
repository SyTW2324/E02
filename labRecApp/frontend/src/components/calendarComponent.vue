<template>
  <div class="calendario">
    <Calendar class="componenteCalendario" v-model="date" inline/>
  </div>
</template>

<script lang="ts">
import "../styles/calendar_style.css";
import Calendar from "primevue/calendar";
import { ref } from "vue";

export default {
  name: "CalendarComponent",
  components: {
    Calendar
  },
  setup() {
    const date = ref();
    return {
      date,
    };
  },
};
</script>

<style scoped>

</style>