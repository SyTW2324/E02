<template>
    <div v-if="showForm" class="register-form" @keydown.esc="closeFormOnEscape()">
        <div class="form-container">
            <div class="title">
              <h2>Registro de Actividad</h2>
            </div>
            <div class="form-group">
                <label for="action">Acción: <span class="required">*</span></label>
                <Dropdown v-model="selectedAction" :options="actionOptions" optionLabel="label" class="full-width" />
            </div>

            <div class="form-group">
                <label for="action">Ubicación: <span class="required">*</span></label>
                <Dropdown v-model="selectedUbication" :options="ubicationOptions" optionLabel="label" class="full-width" />
            </div>

            <div v-if="selectedAction && selectedAction.value === 'pausa'" class="form-group">
                <label for="reason">Motivo de pausa: <span class="required">*</span></label>
                <Dropdown v-model="selectedReason" :options="reasonOptions" optionLabel="label" class="full-width" />
            </div>

            <div class="form-group">
                <label for="datetime">Fecha y hora: <span class="required">*</span></label>
                <Calendar v-model="selectedDateTime" showTime class="full-width" />
            </div>

            <div class="button-container">
                <button style="margin-right: 20px;" @click="submitForm">Enviar</button>
                <button @click="closeFormWithoutSubmit">Cerrar</button>
            </div>

            <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import "../styles/registerForm_styles.css"
import { userAuthentication } from "../tools/store";
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: "registerFormComponent",
    props: {
        showForm: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        Dropdown,
        Calendar,
    },
    setup(props, { emit }) {
        const selectedAction = ref();
        const selectedUbication = ref();
        const selectedReason = ref();
        const selectedDateTime = ref(null);
        const errorMessage = ref("");

        const authStore = userAuthentication();

        const actionOptions = [
            { label: "Iniciar jornada", value: "iniciar" },
            { label: "Finalizar jornada", value: "finalizar" },
            { label: "Comienzo de pausa laboral", value: "pausa" },
            { label: "Vuelta de la pausa laboral", value: "retorno"}
        ];

        const reasonOptions = [
            { label: "Almuerzo", value: "almuerzo" },
            { label: "Comida", value: "comida" },
            { label: "Médico", value: "medico" },
            { label: "Desayuno", value: "desayuno" },
            { label: "Asuntos familiares", value: "asuntos" },
            { label: "Otros asuntos", value: "otros" },
        ];

        const ubicationOptions = [
            { label: "Trabajo desde casa", value: "casa" },
            { label: "Trabajo en la oficina", value: "oficina" },
            { label: "Desplazamiento hacia oficina cliente", value: "cliente" }
        ]; 

        const closeFormOnEscape = () => {
            emit("close");
        }

        const closeFormWithoutSubmit = () => {
            // Aquí puedes agregar lógica adicional si es necesario
            emit("close");
        };

        const updateValues = async (param:string, body: any) => {
            try {
                const recordRespone = await axios.patch(`https://perfect-cod-pantsuit.cyclic.app/record/${param}`, body);
                const recordResponseJson = JSON.parse(JSON.stringify(recordRespone.data)); 
                console.log(recordResponseJson);
            } catch (error: any) {
                console.log("Ha ocurrido un error\n");
                let errorMessage = '';
                if (error.response) {
                // El servidor respondió con un código de estado diferente de 2xx
                errorMessage = JSON.stringify(error.response.data.error);
                } else if (error.request) {
                // La solicitud fue realizada, pero no se recibió respuesta
                errorMessage = 'No se recibió respuesta del servidor';
                } else {
                // Ocurrió un error durante la configuración de la solicitud
                errorMessage = `Error de configuración de la solicitud: ${error.message}`;
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage,
                });
            }
        } 

        const formatDate = (dateUnformated:any) => {
            var fechaOriginalStr = "";
            if (dateUnformated) {
                fechaOriginalStr = dateUnformated;
            }
            var fechaOriginal = new Date(fechaOriginalStr);
            var fechaFormateada;
            if (fechaOriginal) {
                fechaFormateada = `${fechaOriginal.toISOString().slice(0, 10)} ${fechaOriginal.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })}`;
            }
            return fechaFormateada;
        } 

        const submitForm = () => {
            // Verifica si los campos obligatorios están llenos
            if (!selectedAction.value || !selectedUbication.value || !selectedDateTime.value || (selectedAction.value && selectedAction.value.value === "pausa" && !selectedReason.value)) {
                errorMessage.value = "Por favor, complete todos los campos obligatorios.";
                return;
            }

            // MODIFICAR MAS ADELANTE PARA PONER EL CUERPO DE LA REQUEST...
            const formData = {
                action: "",
                ubication: "",
                reason: "",
                datetime: null
            };
            selectedAction.value.value ? formData.action = selectedAction.value.value : formData.action = ""
            selectedUbication.value.value ? formData.ubication = selectedUbication.value.value : formData.ubication = ""
            if (selectedAction.value.value === "pausa" && !selectedReason.value) {
                formData.reason = selectedReason.value.value
            }
            selectedDateTime.value ? formData.datetime = selectedDateTime.value : formData.datetime = null
            console.log("Datos enviados:", formData);
            // APLICAR LOGICA PARA EL BACKEND MAS ADELANTE
            // Datos para la petición
            const userEmail = authStore.email;
            // FORMATEO DE LA FECHA:
            const requestBody = {
                action: formData.action,
                dateTime: formatDate(formData.datetime),
                ubication: formData.ubication,
                jornada: "8:00"
            }

            updateValues(userEmail, requestBody);
            
            emit("close");
        };

        return {
            selectedAction,
            selectedReason,
            selectedUbication,
            selectedDateTime,
            actionOptions,
            reasonOptions,
            ubicationOptions,
            submitForm,
            errorMessage,
            closeFormOnEscape,
            closeFormWithoutSubmit
        };
    },
};
</script>

<style scoped>
</style>

