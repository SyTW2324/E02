<template>
    <div>
      <table>
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
                backgroundColor = 'red';
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
            const response = await axios.get(`https://perfect-cod-pantsuit.cyclic.app/record`);
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
    /* Estilo común para las etiquetas de estado */
.status-label {
display: inline-block;
padding: 5px 10px;
font-weight: bold;
color: white;
border-radius: 10px; /* Ajusta el valor según sea necesario */
}
</style>