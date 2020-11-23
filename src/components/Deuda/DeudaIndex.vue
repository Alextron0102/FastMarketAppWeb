<template>
  <div>
    <h1 class="title">Módulo de Deudas</h1>
    <h2 class="subtitle">Desde aquí puedes gestionar las deudas</h2>

    <Loader v-if="isLoading" />
    <template v-else>

      <table
        class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
      >
        <thead>
          <th>Orden</th>
          <th>Cliente</th>
          <th>Acciones</th>
        </thead>
        <tbody>
          <tr v-for="item in collection.items" :key="item.idDeuda">
            <td>Estado: {{ item.orden.estadoPago }}<br/> Fecha: {{item.orden.fecha}}</td>
            <td>Nombres: {{ item.cliente.apellidos +', '+ item.cliente.nombres  }}</td>
            <td>
              <router-link :to="{ name: 'DeudaPago', params: {id: item.idDeuda} }">
                <button type="button" class="button is-primary is-small">
                  Pagar
                </button>
              </router-link>
              <p> </p>
              <router-link :to="{ name: 'DeudaDetalle', params: {id: item.idDeuda} }">
                <button type="button" class="button is-info is-small">
                  Ver Detalle
                </button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <Pager
        :paging="(p) => getAll(p)"
        :page="collection.page"
        :pages="collection.pages"
      />
    </template>
  </div>
</template>

<script src="./DeudaIndex.js"></script>