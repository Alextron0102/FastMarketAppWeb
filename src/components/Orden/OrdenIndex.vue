<template>
  <div>
    <h1 class="title">Módulo de Ordenes</h1>
    <h2 class="subtitle">Desde aquí puedes gestionar las ordenes</h2>

    <Loader v-if="isLoading"/>
    <template v-else>
      <div style="height: 50px" class="columns is-mobile">
        <div class="column has-text-right">
            <router-link :to="{name: 'ClienteSeleccion'}">
                <button type="button" class="button is-primary">Agregar nueva orden</button>
            </router-link>
        </div>
      </div>
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <th>Cliente</th>
          <th>Fecha</th>
          <th>Estado de pago</th>
        </thead>
        <tbody>
          <tr v-for="item in collection.items" :key="item.idOrden">
            <td>{{item.cliente.apellidos + ', ' + item.cliente.nombres}}</td>
            <td>{{item.fecha}}</td>
            <td>{{item.estadoPago}}</td>
            <td>
              <a @click="remove(item.idOrden)"><button type="button" class="button is-small is-danger">Cancelar</button></a>
            </td>
          </tr>
        </tbody>
      </table>
      <Pager :paging="p => getAll(p)" :page="collection.page" :pages="collection.pages" />
    </template>
  </div>
</template>

<script src="./OrdenIndex.js"></script>