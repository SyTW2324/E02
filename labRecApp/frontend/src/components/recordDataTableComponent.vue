<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Fecha y Hora</th>
            <th>Ubicación</th>
            <th>Acción</th>
            <th>Estado</th>
            <th>Jornada</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in records" :key="record._id">
            <td>{{ record.name }}</td>
            <td>{{ record.email }}</td>
            <td>{{ record.dateTime }}</td>
            <td>{{ record.ubication }}</td>
            <td>{{ record.action }}</td>
            <td>{{ record.estado }}</td>
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
  
      onMounted(async () => {
        try {
          const response = await axios.get(`https://perfect-cod-pantsuit.cyclic.app/record`);
          records.value = response.data;
        } catch (error) {
          console.error('Error fetching records:', error);
        }
      });
  
      return { records };
    },
  };
  </script>
  
  <style scoped>
  /* Agrega estilos según sea necesario */
  </style>