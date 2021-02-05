<template>
  <div class="container bg-white">
    <nav class="flex sm:flex-row">
      <button :class="tab < 1 ? 'tabActive' : 'tabNormal'" @click="tab = 0">
        Conversión
      </button>
      <button :class="tab > 0 ? 'tabActive' : 'tabNormal'" @click="tab = 1">
        Historial
      </button>
    </nav>
    <h1 class="text-5xl text-center capitalize my-7 md:w-1/2" >Aplicativo divisas</h1>
    

    <div class="mt-4">

    <BaseConversor v-show="tab === 0" />
    
    <BaseHistorial v-show="tab === 1" />
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
export default {
  name: "App",
  setup() {

    const estado = reactive({
      tab: 0,
    });

    const store = useStore()
    onMounted(() => {
      store.dispatch('obtenerDatos')
    })

    return {
      ...toRefs(estado),
    };
  },
};
</script>

<style>
.tabActive {
  @apply block px-6 py-4 font-medium text-gray-600 text-blue-500 border-b-2 border-blue-500 hover:text-blue-500 focus:outline-none;
}

.tabNormal {
  @apply block px-6 py-4 text-gray-600 hover:text-blue-500 focus:outline-none;
}
</style>
