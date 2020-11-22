<template>
  <div>
    <h1 class="title">
      {{ model.productoId ? "Editar tasa" : "Registrar tasa" }}
    </h1>
    <h2 class="subtitle">
      {{ model.productoId ? " " : "Ingrese los datos de la tasa." }}
    </h2>

    <Loader v-if="isLoading" />
    <form v-else @submit.prevent="save">
      <div class="field">
        <p>Valor de 0 a 100:</p>
        <input
          :class="{ error: validation.hasError('model.valor') }"
          v-model="model.valor"
          class="input"
          type="number"
          placeholder="Ingrese el valor"
        />
        <p class="help is-danger">
          {{ validation.firstError("model.valor") }}
        </p>
      </div>

      <div class="field">
        <input
          v-model="model.descripcion"
          class="input"
          type="text"
          placeholder="Ingrese la descripcion"
        />
      </div>
      <div class="field">
        <div class="select is-fullwidth">
          <select v-model="model.tipoTasa">
            <option
              v-for="item in this.tipoTasa"
              :key="item.secret"
              :value="item.secret"
            >{{item.value}}</option>
          </select>
          <p class="help is-danger">{{validation.firstError('model.tipoTasa')}} </p>
        </div>
      </div>

      <div class="field">
        <button type="submit" class="button is-info">Guardar</button>
        <router-link :to="{name: 'Tasas'}">
          <button class="button is-danger is-normal">
            Salir
          </button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script src="./TasaCreateOrUpdate.js"></script>

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