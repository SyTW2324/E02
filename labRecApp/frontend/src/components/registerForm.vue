<template>
    <div v-if="showForm" class="register-form" @keydown.esc="closeFormOnEscape()">
        <div class="title">
          <h2>Registro de Actividad</h2>
        </div>
        <div class="form-container">
            <div class="form-group">
                <label for="action">Acción: <span class="required">*</span></label>
                <Dropdown v-model="selectedAction" :options="actionOptions" optionLabel="label" class="full-width" />
            </div>

            <div v-if="selectedAction && selectedAction.value === 'pausa'" class="form-group">
                <label for="reason">Motivo de pausa: <span class="required">*</span></label>
                <Dropdown v-model="selectedReason" :options="reasonOptions" optionLabel="label" class="full-width" />
            </div>

            <div class="form-group">
                <label for="datetime">Fecha y hora: <span class="required">*</span></label>
                <Calendar v-model="selectedDateTime" showTime class="full-width" />
            </div>

            <button @click="submitForm">Enviar</button>

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
        const selectedReason = ref();
        const selectedDateTime = ref(null);
        const errorMessage = ref("");

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

        const closeFormOnEscape = () => {
            emit("close");
        }

        const submitForm = () => {
            // Verifica si los campos obligatorios están llenos
            if (!selectedAction.value || !selectedDateTime.value || (selectedAction.value && selectedAction.value.value === "pausa" && !selectedReason.value)) {
                errorMessage.value = "Por favor, complete todos los campos obligatorios.";
                return;
            }

            const formData = {
                action: "",
                reason: "",
                datetime: null
            };
            selectedAction.value.value ? formData.action = selectedAction.value.value : formData.action = ""
            if (selectedAction.value.value === "pausa" && !selectedReason.value) {
                formData.reason = selectedReason.value.value
            }
            selectedDateTime.value ? formData.datetime = selectedDateTime.value : formData.datetime = null
            console.log("Datos enviados:", formData);
            emit("close");
            // APLICAR LOGICA PARA EL BACKEND MAS ADELANTE
        };

        return {
            selectedAction,
            selectedReason,
            selectedDateTime,
            actionOptions,
            reasonOptions,
            submitForm,
            errorMessage,
            closeFormOnEscape
        };
    },
};
</script>

<style scoped>
.register-form {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container {
  background-color: #cac9c9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: auto;
}

.form-group {
  margin-bottom: 20px;
}

.full-width {
  width: 100%;
}

.required {
  color: rgb(168, 27, 27);
  margin-left: 3px;
}

.error-message {
  color: rgb(168, 27, 27);
  margin-top: 10px;
}
.title {
  text-align: center;
  color: #b28d53; /* Puedes ajustar el color según tus preferencias */
  font-size: 1.5em;
  margin-bottom: 20px;
}
</style>

