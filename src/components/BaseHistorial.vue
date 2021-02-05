<template>
  <div class="container w-full ">
    <p class="mb-3 text-base font-bold">Fecha consulta : {{ fechaParse }}</p>
   
    <div
      class="overflow-hidden border-b border-gray-200 rounded shadow md:w-1/2 "
    >
      <table class="w-1/6 bg-white sm:min-w-full ">
        <thead class="text-white bg-gray-800">
          <tr>
            <th class="w-1/3 px-4 py-3 text-sm font-semibold text-left uppercase" > Nombre </th>
            <th class="w-1/3 px-4 py-3 text-sm font-semibold text-left uppercase" > Abreviatura </th>
            <th class="w-1/3 px-4 py-3 text-sm font-semibold text-left uppercase" > Precio </th>

          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr v-for="(divisa, index) in historiaDivisas " :key="index" class="border-2 hover:bg-blue-200" :class="index % 2 ? '' : 'bg-gray-100'   ">
            <td class="w-1/3 px-4 py-3 text-left">{{divisa.nombre}}</td>
            <td class="w-1/3 px-4 py-3 text-left">{{divisa.id}}</td>
            <td class="px-4 py-3 text-left"> {{ numeral(divisa.historicoDia).format('0.00000')}} </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import { computed } from 'vue';
import { useStore } from 'vuex'
import numeral from 'numeral';
import { DateTime } from "luxon";

export default {
  setup() {
    const fechaParse = computed(() =>{
     return  DateTime.local().toFormat('dd-LL-yyyy')
    })

  const store = useStore()
    const historiaDivisas = computed(() => {
      return store.state.monedas
    })
 
 return { fechaParse,historiaDivisas,numeral }
 },
};
</script>

<style>
</style>