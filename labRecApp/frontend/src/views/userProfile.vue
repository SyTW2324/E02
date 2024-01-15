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
.user-profile {
    max-width: 800px;
    margin: 0 auto;
}

.profile-header {
    display: flex;
    align-items: center;
}

.profile-photo {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin-right: 20px;
}

.user-info {
    h2 {
        margin: 0;
    }
}

.profile-details {
    margin-top: 20px;

    h3 {
        margin-bottom: 10px;
    }

    table {
        width: 100%;

        tr {
            td {
                padding: 8px;
                border-bottom: 1px solid #ddd;
            }
        }
    }
}

.extra-info-panel {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .panel-item {
        flex: 1;
        margin-right: 20px;

        h3 {
            margin-bottom: 10px;
        }
    }
}
</style>
