<template>
  <div>
    <h1 class="title">
      Visualizacion de la deuda ID: {{model.idDeuda}}
    </h1>

    <Loader v-if="isLoading" />
    <div v-else >
      <div>
        <p>DATOS DEL CLIENTE</p>
        <p>
          Nombres: {{model.apellidos + ','+model.nombres}}
        </p>

      </div>

      <div >
        <router-link :to="{name: 'Deudas'}">
          <button class="button is-danger is-normal">
            Salir
          </button>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script src="./DeudaView.js"></script>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>