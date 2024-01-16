<template>
    <div>
        <NavBarComponent />
        <RecordDataTableComponent />
        <footerComponent />
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
</style>