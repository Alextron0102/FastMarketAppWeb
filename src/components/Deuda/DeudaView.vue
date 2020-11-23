<template>
  <div>
    <h1 class="title">
      Visualizacion de la deuda ID: {{model.idDeuda}}
    </h1>

    <Loader v-if="isLoading" />
    <div v-else>
      <div>
        <div>
          <br/>
          <h2 class="subtitle">DATOS DEL CLIENTE</h2>
          <p>
            Nombres: {{model.cliente.apellidos + ','+model.cliente.nombres}}<br />
            Telefono:{{model.cliente.telefono}}<br />
            Direccion: {{model.cliente.direccion}}<br />
            DNI: {{model.cliente.dni}}<br />
            Linea de Credito maxima: {{model.cliente.lineaCredito}}<br />
            Linea de Credito Consumida: {{model.cliente.lineaConsumida}}<br />
          </p>
        </div>
        <div>
          <br/>
          <h2 class="subtitle">DATOS DE LA ORDEN</h2>
          <div>
            Fecha de la orden: {{model.orden.fecha}}<br />
            Estado de pago: {{model.orden.estadoPago}}<br />
            <p v-if="model.orden.montoPagado !== 0">
              Monto pagado: {{model.orden.montoPagado}}<br />
            </p>
          </div>
        </div>
        <div>
          <br/>
          <h2 class="subtitle">DATOS DE LA TASA</h2>
          <div>
            Tipo: {{model.tasa.tipoTasa}}<br />
            Descripcion: {{model.tasa.descripcion}}<br />
            Valor: {{model.tasa.valor}}<br />
          </div>
        </div>
        <div>
          <br/>
          <h2 class="subtitle">DATOS DE LA DEUDA</h2>
          <div>
            Estado: {{model.estadoDeuda}}<br />
            Fecha de pago: {{model.fechaDePago}}<br />
            Monto Acumulado: {{model.montoAcumulado}}<br />
            Monto Inicial: {{model.montoInicial}}<br />
            Monto Intereses: {{model.montoInteres}}<br />
          </div>
          <div v-if="model.pagos.length >0">
            <h2 class="subtitle">PAGOS</h2>
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <th>Monto pagado</th>
                <th>Fecha</th>
              </thead>
              <tbody>
                <tr v-for="item in model.pagos" :key="item.idPago">
                  <td>{{ item.montoPago }}</td>
                  <td>{{item.fecha}}</td>                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <br/>
        <router-link :to="{ name: 'DeudaPago', params: {id: parseInt(model.idDeuda)} }">
          <button class="button is-info is-normal">
            Registrar pago
          </button>
        </router-link>
        <router-link :to="{name: 'Deudas'}">
          <button class="button is-danger is-normal">
            Salir
          </button>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script src="./DeudaView.js"></script>

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