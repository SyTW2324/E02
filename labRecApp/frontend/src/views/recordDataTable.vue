<template>
    <div class="app" id="registroUsuarios">
      <header>
        <NavBarComponent />
      </header>
      <RecordDataTableComponent />
      <footer>
        <footerComponent />
      </footer>
    </div>
</template>

<script lang="ts">
import NavBarComponent from "../components/mainNavbar.vue"
import footerComponent from "../components/footer.vue";
import RecordDataTableComponent from "../components/recordDataTableComponent.vue"

export default {
    components: {
        NavBarComponent,
        RecordDataTableComponent,
        footerComponent,
    },
};
</script>

<style scoped>
@media screen and (max-height: 740px) {
    #registroUsuarios footer, #registroUsuarios header {
        position: static;
    }
}
</style>