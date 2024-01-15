<template>
    <div class="user-profile">
        <div class="profile-header">
            <img src="../assets/Login_usuario.png" alt="User Photo" class="profile-photo" />
            <div class="user-info">
                <h2 class="golden-text" >{{ getUserFullName() }}</h2>
            </div>
        </div>

        <div class="profile-details">
            <h3 class="golden-text" >Datos del Usuario</h3>
            <table>
                <tr>
                    <td>Email:</td>
                    <td>{{ getUserEmail() }}</td>
                </tr>
                <tr>
                    <td>Número de Teléfono:</td>
                    <td>{{ getUserPhone() }}</td>
                </tr>
                <tr>
                    <td>Dni:</td>
                    <td>{{ getUserDni() }}</td>
                </tr>
                <tr>
                    <td>Rol:</td>
                    <td>{{ getUserRol() }}</td>
                </tr>
            </table>
        </div>

        <div class="extra-info-panel">
            <div class="panel-item">
                <h3 class="golden-text" >Número de Seguridad Social</h3>
                <p>{{ getUserSecurityNumber() }}</p>
            </div>
            <div class="panel-item">
                <h3 class="golden-text" >Días de vacacaciones disponibles</h3>
                <p>{{ getUserVacationAvailableDays() }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import "../styles/userProfile_style.css"
import { userAuthentication } from "../tools/store";
export default {
    name: "UserProfileComponent",
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

        const getUserSecurityNumber = () => {
            var userSecurityNumber;
            authStore.afiliateNumber ? userSecurityNumber = authStore.afiliateNumber : userSecurityNumber = "null";
            return userSecurityNumber;
        }

        return {
            getUserPhoto,
            getUserFullName,
            getUserDni,
            getUserPhone,
            getUserEmail,
            getUserRol,
            getUserVacationAvailableDays,
            getUserSecurityNumber
        }
    }
};
</script>
<style scoped>
</style>
