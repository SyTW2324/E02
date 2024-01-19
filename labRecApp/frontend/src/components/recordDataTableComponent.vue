<template>
    <div class="table-container">
      <table class="record-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acción</th>
            <th>Fecha y Hora</th>
            <th>Ubicación</th>
            <th>Estado</th>
            <th>Jornada</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in records" :key="record._id">
            <td>{{ record.name }}</td>
            <td>{{ record.email }}</td>
            <td>{{ record.action }}</td>
            <td>{{ record.dateTime }}</td>
            <td>{{ record.ubication }}</td>
            <td>
              <span :style="getBackgroundColor(record.estado)" class="status-label">
                {{ record.estado }}
              </span>
            </td>
            <td>{{ record.jornada }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
<script lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import * as record from '../interfaces/record_response';

  export default {
    name: "recordDataTableComponent",
    setup() {
        const records = ref<record.recordInterface[]>([]);
        const getBackgroundColor = (estado: string) => {
            let backgroundColor = '';
            switch (estado) {
                case 'offline':
                backgroundColor = 'darkred';
                break;
                case 'online':
                backgroundColor = 'green';
                break;
                case 'pause':
                backgroundColor = 'grey';
                break;
                default:
                backgroundColor = 'transparent';
            }
            return { backgroundColor };
        };

        onMounted(async () => {
            try {
            const response = await axios.get(`https://repulsive-miniskirt-wasp.cyclic.app/record`);
            records.value = response.data;
            } catch (error) {
            console.error('Error fetching records:', error);
            }
        });
  
        return { 
            records,
            getBackgroundColor 
        };
    },
  };
</script>
  
<style scoped>
/* Estilos para la tabla y la caja contenedora */
.table-container {
  background-color: #cac9c9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 20px;
}

.record-table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
}

.record-table th,
.record-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

/* Estilo mejorado para las etiquetas de estado */
.status-label {
  display: inline-block;
  padding: 8px 15px;
  font-weight: bold;
  color: #cac9c9;
  border-radius: 10px;
}

/* Alineación del texto en las celdas de la tabla */
.record-table th,
.record-table td {
  text-align: center;
  vertical-align: middle;
}

</style>
