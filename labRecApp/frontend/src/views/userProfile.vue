<template>
    <div class="user-profile">
        <div class="profile-header">
            <img :src="user.photo" alt="User Photo" class="profile-photo" />
            <div class="user-info">
                <h2>{{ user.fullName }}</h2>
            </div>
        </div>

        <div class="profile-details">
            <h3>Datos del Usuario</h3>
            <table>
                <tr>
                    <td>Email:</td>
                    <td>{{ user.email }}</td>
                </tr>
                <tr>
                    <td>Número de Teléfono:</td>
                    <td>{{ user.phoneNumber }}</td>
                </tr>
                <!-- Agrega más filas según los datos que desees mostrar -->
            </table>
        </div>

        <div class="extra-info-panel">
            <div class="panel-item">
                <h3>Número de Seguridad Social</h3>
                <p>{{ user.socialSecurityNumber }}</p>
            </div>
            <div class="panel-item">
                <h3>Días Trabajados</h3>
                <p>{{ user.workingDays }}</p>
            </div>
            <!-- Agrega más paneles según la información adicional que desees mostrar -->
        </div>
    </div>
</template>

<script lang="ts">
import "../styles/userProfile_style.css"
import { userAuthentication } from "../tools/store";
export default {
    data() {
    },
    setup() {
        const authStore = userAuthentication(); 

        const getUserPhoto = () => {
            return "../assets/Login_usuario.png"
        }

        const getUserFullName = () => {
            var fullName = "";
            authStore.name ? fullName += authStore.name : "null";
            if (authStore.surnames) {
                fullName += " "
                fullName += authStore.surnames
            }
            return fullName;
        }

        const getUserDni = () => {
            var dni_ = ""
            authStore.dni ? dni_ = authStore.dni : dni_ = "null";
            return dni_;
        }

        const getUserPhone = () => {
            var userPhone;
            authStore.phone ? userPhone = authStore.phone : userPhone = "null";
            return userPhone;
        }

        const getUserEmail = () => {
            var userEmail;
            authStore.email ? userEmail = authStore.email : userEmail = "null";
            return userEmail;
        }

        const getUserRol = () => {
            var userRol;
            authStore.administrator == 1 ? userRol = "Administrador" : userRol = "Empleado"
            return userRol;
        }

        const getUserVacationAvailableDays = () => {
            var userVacationAvailableDays;
            authStore.vacationsDays ? userVacationAvailableDays = authStore.vacationsDays : userVacationAvailableDays = "No hay vacaciones,trabaja";
            return userVacationAvailableDays;
        }

        return {
            getUserPhoto,
            getUserFullName,
            getUserDni,
            getUserPhone,
            getUserEmail,
            getUserRol,
            getUserVacationAvailableDays
        }
    }
};
</script>

<style scoped>
</style>
