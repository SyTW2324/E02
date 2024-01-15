<template>
    <div>
        <NavBarComponent />
        <UserProfileComponent />
        <footerComponent />
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
.container {
    position: relative;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    /* Asegúrate de que el encabezado tenga un índice z mayor que el contenido del usuario */
}

.user-profile {
    margin-top: 100px;
    /* Ajusta según la altura de tu encabezado */
    text-align: center;
}

.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    /* Asegúrate de que el pie de página tenga un índice z mayor que el contenido del usuario */
}</style>