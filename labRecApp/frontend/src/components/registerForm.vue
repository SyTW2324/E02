<template>
    <transition name="fade">
        {{ showForm }}
        <div v-if="showForm" class="register-form">
            <div class="form-container">
                <label for="action">Acción:</label>
                <Dropdown v-model="selectedAction" :options="actionOptions" />

                <div v-if="selectedAction === 'pausa'">
                    <label for="reason">Motivo de pausa:</label>
                    <Dropdown v-model="selectedReason" :options="reasonOptions" />
                </div>

                <label for="datetime">Fecha y hora:</label>
                <Calendar v-model="selectedDateTime" showTime />

                <button @click="submitForm">Enviar</button>
            </div>
        </div>
    </transition>
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
        const selectedAction = ref("");
        const selectedReason = ref("");
        const selectedDateTime = ref(null);

        const actionOptions = [
            { label: "Iniciar jornada", value: "iniciar" },
            { label: "Finalizar jornada", value: "finalizar" },
            { label: "Comienzo de pausa laboral", value: "pausa" },
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
                action: selectedAction.value,
                reason: selectedReason.value,
                datetime: selectedDateTime.value,
            };
            console.log("Datos enviados:", formData);
            emit("close");
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
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.form-container {
    background-color: #cac9c9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: auto;
}</style>