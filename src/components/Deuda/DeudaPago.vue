<template>
  <div>
    <h1 class="title">Registrar pago para deuda ID: {{ model.idDeuda }}</h1>
    <h2 class="subtitle">Introduzca los pagos de la deuda.</h2>

    <Loader v-if="isLoading" />
    <form v-else @submit.prevent="save">
      <div style="height: 50px" class="columns is-mobile">
        Monto incial por el que se generó la deuda: {{ model.montoInicial }}
        <br />
        Monto por el cual se debe actualmente: {{ model.montoAcumulado }}
        <br/>
        Fecha en la cual se registró: {{model.fechaInicio}}
      </div>

      <div style="height: 50px" class="columns is-mobile">
        <div class="column has-text-right">
          <a @click="AgregarPago()"><button  type="button" class="button is-primary">
            Agregar pago
          </button></a>
        </div>
      </div>

      <table
        class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
      >
        <thead>
          <th>Monto</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in model.pagosold" :key="item.idPago? item.idPago : index">
            <td>
              <input
              v-model="item.montoPago"
              class="input"
              type="number"
              placeholder="Ingrese el monto"
              />
            </td>
            <td>              
              <input
              v-model="item.fecha"
              class="input"
              type="date"
              placeholder="seleccione la fecha"
              />
            </td>
            <td>              
              <a v-if="item.idPago === null" @click="EliminarPago(index)"><button  type="button" class="button is-danger is-small">
                Eliminar
              </button></a>
            </td>
          </tr>
          <tr v-for="(item, index) in model.pagos" :key="item.idPago? item.idPago : index">
            <td>
              <input
              v-model="item.montoPago"
              class="input"
              type="number"
              placeholder="Ingrese el monto"
              />
            </td>
            <td>              
              <input
              v-model="item.fecha"
              class="input"
              type="date"
              placeholder="seleccione la fecha"
              />
            </td>
            <td>              
              <a v-if="item.idPago === null" @click="EliminarPago(index)"><button  type="button" class="button is-danger is-small">
                Eliminar
              </button></a>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="field">
        <button type="submit" class="button is-info">Guardar</button>
        <router-link :to="{ name: 'Deudas' }">
          <button class="button is-danger is-normal">Salir</button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script src="./DeudaPago.js"></script>

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