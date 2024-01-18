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

            <div class="form-group">
                <label for="newPassword">Nueva contraseña: <span class="required">*</span></label>
                <InputText v-model="newPassword" type="password" class="full-width" />
            </div>

            <div class="button-container">
                <button class="submit-button" @click="submitForm">Enviar</button>
                <button style="margin-left: 13px;" class="close-button" @click="closeFormWithoutSubmit">Cerrar</button>
            </div>

            <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import InputText from "primevue/inputtext";
import {ref} from 'vue'
import { userAuthentication } from "../tools/store";
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
    name: "changePassComponent",
    props: {
        showForm: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        InputText
    },
    setup(props, { emit }) {

        const currentPassword = ref();
        const repeatCurrentPassword = ref();
        const newPassword = ref();
        const errorMessage = ref("");
        const authStore = userAuthentication();

        const updatePass = async ( body: any) => {
            try {
                await axios.get(`https://perfect-cod-pantsuit.cyclic.app/change/password/${authStore.email}`, body);
                let responseMessage = '';
                
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: responseMessage,
                });

            } catch (error: any) {
                console.log("Ha ocurrido un error\n");
                let errorMessage = '';
                if (error.response) {
                    errorMessage = JSON.stringify(error.response.data.error);
                } else if (error.request) {
                    errorMessage = 'No se recibió respuesta del servidor';
                } else {
                    errorMessage = `Error de configuración de la solicitud: ${error.message}`;
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage,
                });
            }
        }

        const submitForm = () => {

            if (!currentPassword.value || !repeatCurrentPassword.value || !newPassword.value) {
                errorMessage.value = "Por favor, complete todos los campos obligatorios.";
                return;
            }
            console.log(authStore.email)
            const reqData = {
                oldPass: currentPassword,
                newPass: newPassword
            }

            updatePass(reqData)
            emit('close')
        }

        const closeFormWithoutSubmit = () => {
            emit('close')
        }

        return {
            submitForm,
            closeFormWithoutSubmit,
            currentPassword,
            repeatCurrentPassword,
            newPassword,
            errorMessage
        };
    },
};
</script>

<style scoped>
</style>

