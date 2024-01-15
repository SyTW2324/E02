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
export default {
    data() {
        return {
            user: {
                photo: 'ruta/a/la/foto.jpg',
                fullName: 'Nombre del Usuario',
                email: 'usuario@email.com',
                phoneNumber: '123456789',
                socialSecurityNumber: '123-45-6789',
                workingDays: 150,
                // Agrega más propiedades según los datos del usuario
            },
        };
    },
};
</script>

<style scoped>
</style>
