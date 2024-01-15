<template>
    <div v-if="showForm" class="register-form">
        <div class="form-container">
            <label for="action">Acción:</label>
            <Dropdown v-model="selectedAction" :options="actionOptions" optionLabel="label"/>

            <div v-if="selectedAction && selectedAction.value === 'pausa'">
                <label for="reason">Motivo de pausa:</label>
                <Dropdown v-model="selectedReason" :options="reasonOptions" optionLabel="label" />
            </div>

            <label for="datetime">Fecha y hora:</label>
            <Calendar v-model="selectedDateTime" showTime />

            <button @click="submitForm">Enviar</button>
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

        const submitForm = () => {
            const formData = {
                action: "",
                reason: "",
                datetime: null
            };
            selectedAction.value.value ? formData.action = selectedAction.value.value : formData.action = "ERROR"
            selectedReason.value.value ? formData.reason = selectedReason.value.value : formData.reason = ""
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
        };
    },
};
</script>

<style scoped>
.register-form {
    background-color: rgba(0, 0, 0, 0.5);
    /* Fondo semitransparente */
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
    /* Ajusta el ancho según tus necesidades */
    margin: auto;
}

/* Estilo para separación entre preguntas */
.form-container label,
.form-container .p-dropdown,
.form-container .p-calendar {
    margin-bottom: 15px;
}
</style>
