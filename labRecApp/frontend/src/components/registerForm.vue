<template>
    <div v-if="showForm" class="register-form">
        
    </div>
</template>

<script lang="ts">
export default {
    name: "registerFormComponent",
    props: {
        showForm: {
            type: Boolean,
            default: false,
        },
    },
    setup() {
        // funciones aqui manin
        return {

        }
    }
};
</script>

<style scoped>
</style>