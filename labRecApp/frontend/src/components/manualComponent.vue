<template>
  <div>
    <div id="contenedor">
      <iframe id="visorPDF" :src="pdfPath" type="application/pdf"></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import "../styles/manual_style.css";
import pdfPath from "@/assets/manual.pdf";
export default {
  name: "ManualComponent",
  data() {
    return {
      pdfPath
    };
  }
};
</script>
<style scoped>

</style>
