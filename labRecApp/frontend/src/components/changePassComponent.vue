<template>
    <div v-if="showForm" class="register-form">
        <div class="form-container">
            <div class="title">
              <h2>Cambio de contraseña</h2>
            </div>

            <div class="form-group">
                <label for="currentPassword">Contraseña actual: <span class="required">*</span></label>
                <InputText v-model="currentPassword" type="password" class="full-width" />
            </div>

            <div class="form-group">
                <label for="repeatCurrentPassword">Repita la contraseña actual: <span class="required">*</span></label>
                <InputText v-model="repeatCurrentPassword" type="password" class="full-width" />
            </div>

            <div v-if="selectedAction && selectedAction.value === 'pausa'" class="form-group">
                <label for="newPassword">Nueva contraseña: <span class="required">*</span></label>
                <InputText v-model="newPassword" type="password" class="full-width" />
            </div>

            <div class="button-container">
                <button class="submit-button" @click="submitForm">Enviar</button>
                <button style="margin-left: 13px;" class="close-button" @click="closeFormWithoutSubmit">Cerrar</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import InputText from "primevue/inputtext";


export default {
    name: "changePassComponent",
    props: {
        showForm: {
            type: Boolean,
            default: false,
        },
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

