<template>
<div class="container ">
  <div class='w-full px-3 mb-6 md:w-1/2'>
    <label class='block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase' >Monto</label>
    <input v-model="montoConvertir" class='input' pattern=".{1,10}"  type='number' required>
  </div>
 
  
  <BaseSelectMoneda v-model:cambio="mndOrigen" :SelectMonedas="SelectMonedas" />
  <BaseSelectMoneda v-model:cambio="mndObjetivo" :SelectMonedas="SelectMonedas" />
  
  <div class="flex justify-center md:w-1/2">
    <button @click="convertirDivisa" class="w-1/3 px-6 py-2 font-bold text-white bg-green-700 rounded-lg hover:bg-green-600">
      Convertir
    </button>
  </div>

  <div class="h-24 p-2 mt-6 text-sm text-center bg-gray-200 border-b md:text-base md:w-1/2">
      <p v-if="valorFinal" class="text-lg font-bold"> {{ montoConvertir }}  {{mndOrigen}} = {{valorFinal}} {{mndObjetivo}}</p>
  </div>

</div>
</template>

<script>
import { computed, reactive, toRefs,watch } from 'vue';
import { useStore } from 'vuex';
import numeral from 'numeral'
export default {
  setup(){
    
    const estado = reactive({
      mndObjetivo : '',
      mndOrigen :  '',
      montoConvertir : 1,
      valorFinal : 0
    })

    watch(
      () =>  estado.montoConvertir,
      () => validandoMonto()
    )

    const validandoMonto = () => {
      if (estado.montoConvertir) {
        estado.montoConvertir = estado.montoConvertir < 1 ? 1 : estado.montoConvertir  
      }
    }

    const store = useStore()
    const SelectMonedas = computed(() => {
      return store.state.monedas
    })

    function convertirDivisa() {
      if (!estado.mndOrigen && !estado.mndObjetivo) estado.mndOrigen = store.state.monedas[0]['id'] , estado.mndObjetivo = store.state.monedas[0]['id']
      let  {valor}  =  store.state.monedas.filter( moneda => moneda.id === estado.mndOrigen)[0] 
      let  vrConvert  =  store.state.monedas.filter( moneda => moneda.id === estado.mndObjetivo)[0]['valor']
      estado.valorFinal = numeral((estado.montoConvertir / valor  ) * vrConvert).format('0,0') 
    }

    return { ...toRefs(estado), SelectMonedas, convertirDivisa }
  }

}
</script>

<style>
.input {
  @apply block w-full px-4 py-3 leading-tight text-gray-700 bg-white border border-gray-400 rounded-md shadow-inner appearance-none focus:outline-none focus:border-blue-500;
}

</style>