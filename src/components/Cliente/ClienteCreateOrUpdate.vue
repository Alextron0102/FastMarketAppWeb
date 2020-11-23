<template>
  <div>
    <h1 class="title">
      {{ model.idCliente ? "Editar cliente" : "Registrar cliente" }}
    </h1>
    <h2 class="subtitle">
      {{ model.idCliente ? " " : "Ingrese los datos del cliente." }}
    </h2>

    <Loader v-if="isLoading" />

    <form v-else @submit.prevent="save">
      <div class="field">
        <input
          :class="{ error: validation.hasError('model.nombres') }"
          v-model="model.nombres"
          class="input"
          type="text"
          placeholder="Ingrese sus nombres"
        />
        <p class="help is-danger">
          {{ validation.firstError("model.nombres") }}
        </p>
      </div>
      <div class="field">
        <input
          :class="{ error: validation.hasError('model.apellidos') }"
          v-model="model.apellidos"
          class="input"
          type="text"
          placeholder="Ingrese sus apellidos"
        />
        <p class="help is-danger">
          {{ validation.firstError("model.apellidos") }}
        </p>
      </div>

      <div class="field">
        <input
          :class="{ error: validation.hasError('model.direccion') }"
          v-model="model.direccion"
          class="input"
          type="text"
          placeholder="Ingrese su direccion"
        />
        <p class="help is-danger">
          {{ validation.firstError("model.direccion") }}
        </p>
      </div>

      <div class="field">
        <input
          :class="{ error: validation.hasError('model.telefono') }"
          v-model="model.telefono"
          class="input"
          type="text"
          placeholder="Ingrese su telefono"
        />
        <p class="help is-danger">
          {{ validation.firstError("model.telefono") }}
        </p>
      </div>

      <div class="field">
        <input
          :class="{ error: validation.hasError('model.dni') }"
          v-model="model.dni"
          class="input"
          type="text"
          placeholder="Ingrese su dni"
        />
        <p class="help is-danger">
          {{ validation.firstError("model.dni") }}
        </p>
      </div>

      <div class="field">
        <input
          v-model="model.lineaCredito"
          class="input"
          type="text"
          placeholder="Ingrese el maximo de credito"
        />
      </div>

      <div class="field">
        <button type="submit" class="button is-info">Guardar</button>
        <router-link :to="{ name: 'Clientes' }">
          <button class="button is-danger is-normal">Salir</button>
        </router-link>
      </div>

    </form>
  </div>
</template>

<script src="./ClienteCreateOrUpdate.js"></script>

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