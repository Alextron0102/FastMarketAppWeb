<template>
  <div>
    <h1 class="title">Módulo de Tasas</h1>
    <h2 class="subtitle">Desde aquí puedes gestionar las tasas</h2>

    <Loader v-if="isLoading"/>
    <template v-else>
      <div style="height: 50px" class="columns is-mobile">
        <div class="column has-text-right">
            <router-link :to="{name: 'TasaRegistro'}">
                <button type="button" class="button is-primary">Agregar nueva tasa</button>
            </router-link>
        </div>
      </div>
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <th>Valor</th>
          <th>Tipo</th>
          <th>Descripcion</th>
        </thead>
        <tbody>
          <tr v-for="item in collection.items" :key="item.idTasa">
            <td>{{item.valor}}</td>
            <td>{{item.tipoTasa}}</td>
            <td>{{item.descripcion}}</td>
            <td>
              <a @click="remove(item.idTasa)"><button type="button" class="button is-small is-danger">Eliminar</button></a>
            </td>
          </tr>
        </tbody>
      </table>
      <Pager :paging="p => getAll(p)" :page="collection.page" :pages="collection.pages" />
    </template>
  </div>
</template>

<script src="./TasaIndex.js"></script>