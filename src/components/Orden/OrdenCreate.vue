<template>
  <div>
    <h1 class="title">
      Registrar Orden para cliente ID: {{model.idCliente}}
    </h1>
    <h2 class="subtitle">
      Introduzca los datos de la orden.
    </h2>

    <Loader v-if="isLoading" />
    <form v-else @submit.prevent="save">

      <div class="field">
        <div class="select is-fullwidth">
          <select v-model="model.estadoPago">
            <option
              v-for="item in this.tipoPago"
              :key="item.secret"
              :value="item.secret"
            >{{item.value}}</option>
          </select>
        </div>
      </div>

      <div class="field" v-if="(model.estadoPago === 'PagoParte') ">
        <input          
          v-model="model.montoPagado"
          class="input"
          type="text"
          placeholder="Ingrese el monto pagado"
        />
      </div>

      <div/>

      <div class="field" v-if="(model.estadoPago === 'PorPagar') ||  (model.estadoPago === 'PagoParte')">
          <p> Elija la tasa: </p>
        <div class="select is-fullwidth">
          <select v-model="model.idTasa">
            <option
              v-for="item in this.tasas"
              :key="item.secret"
              :value="item.secret"
            >{{item.valor+"% - "+ item.tipoTasa}}</option>
          </select>
        </div>
      </div>
      <p>Productos agregados:</p>
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Stock</th>
          <th>Precio</th>
          <th>Acciones</th>
        </thead>
        <tbody>
          <tr v-for="item in this.model.detalleOrdenes" :key="item.idProducto">
            <td>
              <figure class="image is-128x128">
                <img :src="item.imagen">
              </figure> 
            </td>
            <td>{{item.nombre}}</td>
            <td>{{item.stock}}</td>
            <td>{{item.precio}}</td>
            <td>
              <a @click="EliminarProducto(item.idProducto)"><button type="button" class="button is-small is-danger is-centered">Eliminar</button></a>
            </td>
          </tr>
          <tr>
            <td/><td/><td/>
            <td> Precio final: </td>
            <td>{{this.preciofinal}} </td>
          </tr>
        </tbody>
      </table>
      
      <p>Catalogo de productos:</p>
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Stock</th>
          <th>Precio</th>
          <th>Acciones</th>
        </thead>
        <tbody>
          <tr v-for="item in this.productos.items" :key="item.idProducto">
            <td>
              <figure class="image is-128x128">
                <img :src="item.imagen">
              </figure> 
            </td>
            <td>{{item.nombre}}</td>
            <td>{{item.stock}}</td>
            <td>{{item.precio}}</td>
            <td>
            <div>
                <input
                  v-model="item.cantidad"
                  class="input"
                  type="number"
                  placeholder="cantidad"
                />
              </div>
              <a @click="AgregarProducto(item.idProducto)"><button type="button" class="button is-small is-primary is-centered">Agregar</button></a>
            </td>
          </tr>
        </tbody>
      </table>
      <Pager :paging="p => getAll(p)" :page="this.productos.page" :pages="this.productos.pages" />
      
      <div class="field">
        <button type="submit" class="button is-info">Guardar</button>
        <router-link :to="{name: 'Ordenes'}">
          <button class="button is-danger is-normal">
            Salir
          </button>
        </router-link>
      </div>

    </form>
  </div>
</template>

<script src="./OrdenCreate.js"></script>

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