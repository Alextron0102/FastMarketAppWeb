<template>
  <div>
    <h1 class="title">
      {{ model.productoId ? "Editar producto" : "Registrar producto" }}
    </h1>
    <h2 class="subtitle">
      {{ model.productoId ? " " : "Ingrese los datos del producto." }}
    </h2>

    <Loader v-if="isLoading" />
    <form v-else @submit.prevent="save">
      <div class="field">
        <input
          :class="{ error: validation.hasError('model.nombre') }"
          v-model="model.nombre"
          class="input"
          type="text"
          placeholder="Ingrese el nombre"
        />
        <p class="help is-danger">
          {{ validation.firstError("model.nombres") }}
        </p>
      </div>

      <div class="field">
        <input
          :class="{ error: validation.hasError('model.stock') }"
          v-model="model.stock"
          class="input"
          type="text"
          placeholder="Ingrese el stock"
        />
        <p class="help is-danger">{{ validation.firstError("model.stock") }}</p>
      </div>

      <div class="field">
        <input
          :class="{ error: validation.hasError('model.precio') }"
          v-model="model.precio"
          class="input"
          type="text"
          placeholder="Ingrese el precio"
        />
        <p class="help is-danger">
          {{ validation.firstError("model.precio") }}
        </p>
      </div>
      <div class="field">
        <input
          v-model="model.imagen"
          class="input"
          type="text"
          placeholder="Ingrese la imagen"
        />
      </div>
      <div class="field">
        <button type="submit" class="button is-info">Guardar</button>
        <router-link :to="{name: 'Productos'}">
          <button class="button is-danger is-normal">
            Salir
          </button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script src="./ProductoCreateOrUpdate.js"></script>

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