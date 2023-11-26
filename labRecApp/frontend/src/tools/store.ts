import { defineStore, createPinia } from 'pinia';
import * as user from '../interfaces/user_store'
import axios from 'axios';

export const pinia = createPinia();

export const userAuthentication = defineStore({
  id: 'authentication',
  state: () => ({
    userAuthenticated: false,
    token: "",
    name: "",
    surnames: "",
    dni: "",
    phone: 0,
    email: "",
    administrator: 0, 
    afiliateNumber: 0,
    vacationsDays: 0
  }),
  actions: {
    getAuthentication(): boolean {
      return this.userAuthenticated;
    },
    setUserData(user: user.User_data) {
      this.token = user.token;
      this.email = user.email;
      this.userAuthenticated = user.isAunthenticated;
      this.name = user.name
      this.surnames = user.surnames
      this.dni = user.dni
      this.phone = user.phone
      this.administrator = user.administrator
      this.afiliateNumber = user.afiliateNumber
      this.vacationsDays = user.vacationsDays
      // password -> Por razones de seguridad no lo almaceno
    },
    clearAuthenticationData() {
      this.token = "null";
      this.email = "";
      this.userAuthenticated = false;
      this.name = "";
      this.surnames = "";
      this.dni = "";
      this.phone = 0;
      this.administrator = 0;
      this.afiliateNumber = 0;
      this.vacationsDays = 0;
      //TODO localStorage.removeItem('token');
    },
    async login(credentials: { email: string, password: string }) {
      try {
        const userResponse = await axios.post('http://localhost:3000/users/login', credentials)
        console.log(userResponse);
        //const responseData: user.User_data = {
        //  token: userResponse.data.userToken
        //}
      } catch (error) {
        return "Error, credenciales inválidas"
      }

      //TODO ALMACENAR EL TOKEN EL LA LOCAL STORAGE
    },
  }
})