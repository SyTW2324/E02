import { defineStore, createPinia } from 'pinia';
import * as user from '../interfaces/user_store'
import axios from 'axios';
import { fillUserData } from '../tools/utilities/userLogin_utilities'

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
    vacationsDays: 0,
    loginError: false
  }),
  actions: {
    getAuthentication(): boolean {
      // TODO REALIZAR EXPIRACION DE TIEMPO
      return this.userAuthenticated;
    },
    getToken(): string {
      return this.token;
    },
    setUserData(user: user.User_data) {
      this.token = user.token;
      this.email = user.email;
      this.name = user.name
      this.surnames = user.surnames
      this.dni = user.dni
      this.phone = user.phone
      this.administrator = user.administrator
      this.afiliateNumber = user.afiliateNumber
      this.vacationsDays = user.vacationsDays
      this.userAuthenticated = true;
      //Se almacena el Token en el localStorage del navegador
      localStorage.setItem('Token', this.token);
    },
    getUserData() {
      return {
        email: this.email,
        name: this.name,
        surnames: this.surnames,
        dni: this.dni,
        phone: this.phone,
        administrator: this.administrator,
        afiliateNumber: this.afiliateNumber,
        vacationsDays: this.vacationsDays,
      }
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
      //Se elimina el token del localStorage 
      localStorage.removeItem('Token');
    },
    async login(credentials: { email: string, password: string }) {
      try {
        const userResponse = await axios.post('http://localhost:3000/users/login', credentials)
        const userResponseJSON = JSON.parse(JSON.stringify(userResponse.data));
        const userData = fillUserData(userResponseJSON);
        this.setUserData(userData);
        this.loginError = false;
        return "Success"
      } catch (error) {
        this.loginError = true;
        this.clearAuthenticationData(); //Nos aseguramos de que el store queda vacio, y el localStorage no tiene nada
        return "Error"
      }
    },
  }
})