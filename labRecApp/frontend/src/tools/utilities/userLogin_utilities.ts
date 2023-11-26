import * as user from '../../interfaces/user_store'

export function fillUserData(userResponseJSON: any): user.User_data {
  const userDataFilled: user.User_data = {
    token: userResponseJSON.responseData.token,
    name: userResponseJSON.responseData.name,
    surnames: userResponseJSON.responseData.surnames,
    dni: userResponseJSON.responseData.dni,
    phone: userResponseJSON.responseData.phone,
    email: userResponseJSON.responseData.email,
    password: userResponseJSON.responseData.password,
    administrator: userResponseJSON.responseData.administrator,
    afiliateNumber: userResponseJSON.responseData.afiliateNumber,
    vacationsDays: userResponseJSON.responseData.vacationsDays
  }
  return userDataFilled;
}

