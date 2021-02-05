import { createStore } from 'vuex'
import { DateTime } from "luxon";
const APP_ID = 'edc060baf1f74d93b4fdae4d9f838811'


export default createStore({
  state: {
    monedas: [],
    historial: []
  },
  mutations: {
     set_monedas : (state, value) => { state.monedas = value } 
  },
  actions: {
    async loadMonedas() {
      const monedas = await fetch(`https://openexchangerates.org/api/currencies.json?app_id=${APP_ID}`)
      return monedas.json()
    },

    async loadValores() {
      const  { rates } = await (await fetch(`https://openexchangerates.org/api/latest.json?app_id=${APP_ID}`)).json()
      return rates
    },

    async loadHistorial(){
      const date = DateTime.local().toISODate()
      const {rates} = await (await fetch(`https://openexchangerates.org/api/historical/${date}.json?app_id=${APP_ID}&base=USD`)).json()
      return rates
    },

    obtenerDatos({ dispatch, commit }) {
      let newArray = []
      Promise.all([dispatch('loadMonedas'), dispatch('loadValores'), dispatch('loadHistorial')]).then((respuesta) => {
        const [monedas,valores, historial] = respuesta
        //  for (const valor of Object.entries(valores)) {
        //    newArray = [...newArray, Object.entries(monedas).filter(m => m[0] === valor[0]).map(n => {
        //     return {
        //       datos : [...n, valor[1]]
        //     }
        //    })]
        //  }
        newArray =  Object.keys(monedas).map(moneda => {
            return {
              id : moneda,
              nombre : monedas[moneda],
              valor : valores[moneda],
              historicoDia : historial[moneda] 
            }
          })
        
        commit('set_monedas',newArray)

      }).catch((err) => {
        console.error('ERROR OBTENIENDO DATOS',err)
      });
    }
  },
  modules: {
  }
})
