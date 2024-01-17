<template>
    <div v-if="showForm" class="register-form">
        <div class="form-container">
            <div class="title">
              <h2>Registro de Actividad</h2>
            </div>

            <div class="button-container">
                <button class="submit-button" @click="submitForm">Enviar</button>
                <button style="margin-left: 13px;" class="close-button" @click="closeFormWithoutSubmit">Cerrar</button>
            </div>


        </div>
    </div>
</template>

<script lang="ts">


export default {
    name: "changePassComponent",
    props: {

    },
    components: {

    },
    setup(props, { emit }) {

        const submitForm = () => {

        }

        const closeFormWithoutSubmit = () => {
            emit('close')
        }

        return {
            submitForm,
            closeFormWithoutSubmit
        };
    },
};
</script>

<style scoped>
</style>

