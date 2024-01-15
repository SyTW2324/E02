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
    min-height: 100vh;
}

.container {
    overflow-y: auto; /* Añadir barra de desplazamiento vertical si es necesario */
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
}

.user-profile {
    margin-top: 100px;
    text-align: center;
    padding-bottom: 80px; /* Ajusta según la altura de tu pie de página */
}

.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    height: 60px; /* Ajusta según la altura de tu pie de página */
}
</style>