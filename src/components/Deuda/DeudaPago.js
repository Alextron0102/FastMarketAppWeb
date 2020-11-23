import Loader from '../../shared/Loader'
import Pager from '../../shared/Pager'

export default {
    name: 'DeudaPago',
    components: {
        Loader, Pager
    },
    mounted() {
        this.initialize();
    },
    data() {
        return {
            user: this.$store.state.user,
            isLoading: false,
            model: {
                idDeuda: null,
                idTasa: null,
                idCliente: null,
                pagosold: [],
                pagos: [],
                //pagos: {idPago, montoPago, fecha}
                montoInicial: null,
                montoAcumulado: null,
                fechaInicio: null,
            },       
            tipoTasa: {
                'TasaEfectivaMensual': 'Tasa Efectiva Mensual',
                'TasaNominalMensual': 'Tasa Nominal Mensual'
            },
            preciofinal: 0,           
        }
    },
    methods: {
        initialize() {
            this.model.idDeuda = this.$route.params.id;
            //Tenemos que mostrar todos los pagos:
            this.$proxies.deudaProxy.getById(this.model.idDeuda).then(x=>{
                this.model.pagosold = x.data.pagos;
                this.model.pagosold.forEach(element=>{
                    element.fecha = element.fecha.slice(0,element.fecha.search("T"));
                });
                this.model.idCliente = x.data.cliente.idCliente;
                this.model.idTasa = x.data.tasa.idTasa;
                this.model.montoInicial = x.data.montoInicial;
                this.model.montoAcumulado = x.data.montoAcumulado;
                this.model.fechaInicio = x.data.orden.fecha.slice(0,x.data.orden.fecha.search("T"));
            }).catch(() => {
                this.$notify({
                    group: "global",
                    type: "is-danger",
                    text: 'Ocurrió un error inesperado'
                });
                this.$router.push({name: 'Deudas'});
            });            
        },
        save() {         
            this.isLoading = true;
            this.model.pagos.forEach(element => {
                element.montoPago = parseInt(element.montoPago);
            });
            this.$proxies.deudaProxy.update(this.model.idDeuda, this.model)
                .then(() => {
                    this.$notify({
                        group: "global",
                        type: "is-success",
                        text: 'Pago registrado con éxito'
                    });
                    this.$router.push({name: 'Deudas'});
                })
                .catch(x => {
                    console.log(x.response);
                    this.isLoading = false;
                    this.$notify({
                        group: "global",
                        type: "is-danger",
                        text: x.response.data
                    });
                });  
        },
        AgregarPago(){
            this.model.pagos.push({
                idPago: null,
                montoPago: "",
                fecha: ""
            });
        },
        EliminarPago(index){
            this.model.pagos.splice(index,1);
        }
    }
}