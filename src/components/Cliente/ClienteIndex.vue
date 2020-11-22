<template>
  <div>
    <h1 class="title">Módulo de Clientes</h1>
    <h2 class="subtitle">Desde aquí puedes gestionar los clientes</h2>

    <Loader v-if="isLoading"/>
    <template v-else>
      <div style="height: 50px" class="columns is-mobile">
        <div class="column has-text-right">
            <router-link :to="{name: 'ClienteRegistro'}">
                <button type="button" class="button is-primary">Agregar nuevo cliente</button>
            </router-link>
        </div>
      </div>
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Dni</th>
          <th>Telefono</th>
          <th>Direccion</th>
          <th>Acciones</th>
        </thead>
        <tbody>
          <tr v-for="item in collection.items" :key="item.idCliente">
            <td>{{item.nombres}}</td>
            <td>{{item.apellidos}}</td>
            <td>{{item.dni}}</td>
            <td>{{item.telefono}}</td>
            <td>{{item.direccion}}</td>
            <td>
              <router-link :to="{name: 'ClienteModificar', params: {id: item.idCliente}}"><button type="button" class="button is-small is-link">Editar</button></router-link>
              <a @click="remove(item.idCliente)"><button type="button" class="button is-small is-danger">Eliminar</button></a>
            </td>
          </tr>
        </tbody>
      </table>
      <Pager :paging="p => getAll(p)" :page="collection.page" :pages="collection.pages" />
    </template>
  </div>
</template>

<script src="./ClienteIndex.js"></script>