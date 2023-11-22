import { defineStore, createPinia } from 'pinia';
import * as user from '../interfaces/user_store'

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
    setAuthenticationData(token: string, email: string) {
      this.token = token;
      this.email = email;
      this.userAuthenticated = true;
    },
    getAuthentication(): boolean {
      return this.userAuthenticated;
    },
    setUserData(user: user.User_data) {
      this.name = user.name
      this.surnames = user.surnames
      this.dni = user.dni
      this.phone = user.phone
      this.administrator = user.administrator
      this.afiliateNumber = user.afiliateNumber
      this.vacationsDays = user.vacationsDays
    },
    clearAuthenticationData() {
      this.userAuthenticated = false;
      this.token = "null";
      this.name = "";
      this.surnames = "";
      this.dni = "";
      this.phone = 0;
      this.email = "";
      this.administrator = 0;
      this.afiliateNumber = 0;
      this.vacationsDays = 0;
      //TODO localStorage.removeItem('token');
    },
    
  }
})