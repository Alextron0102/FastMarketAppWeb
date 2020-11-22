<template>
  <div>
    <h1 class="title">Módulo de Productos</h1>
    <h2 class="subtitle">Desde aquí puedes gestionar los productos</h2>

    <Loader v-if="isLoading"/>
    <template v-else>
      <div style="height: 50px" class="columns is-mobile">
        <div class="column has-text-right">
            <router-link :to="{name: 'ProductoRegistro'}">
                <button type="button" class="button is-primary">Agregar nuevo producto</button>
            </router-link>
        </div>
      </div>
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Stock</th>
          <th>Precio</th>
          <th>Acciones</th>
        </thead>
        <tbody>
          <tr v-for="item in collection.items" :key="item.idProducto">
            <td>
              <figure class="image is-128x128">
                <img :src="item.imagen">
              </figure> 
            </td>
            <td>{{item.nombre}}</td>
            <td>{{item.stock}}</td>
            <td>{{item.precio}}</td>
            <td>
              <router-link :to="{name: 'ProductoModificar', params: {id: item.idProducto}}"><button type="button" class="button is-small is-link">Editar</button></router-link>
              <a @click="remove(item.idProducto)"><button type="button" class="button is-small is-danger">Eliminar</button></a>
            </td>
          </tr>
        </tbody>
      </table>
      <Pager :paging="p => getAll(p)" :page="collection.page" :pages="collection.pages" />
    </template>
  </div>
</template>

<script src="./ProductoIndex.js"></script>