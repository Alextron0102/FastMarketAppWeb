import Loader from '../../shared/Loader'
import Pager from '../../shared/Pager'

export default {
    name: 'DeudaView',
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
                idCliente: null,
                orden: {
                    idOrden: null,
                    cliente: null,
                    fecha: null,
                    estadoPago:null,
                    detalleOrdenes: [],
                },
                cliente:{
                    idCliente: null,
                    direccion: null,
                    telefono: null,
                    dni: null,
                    nombres: null,
                    apellidos: null,
                    lineaCredito: null,
                    lineaConsumida: null
                },
                tasa: {
                    idTasa: null,
                    valor: null,
                    tipoTasa: null,
                    descripcion: null
                },
                montoInicial: null,
                montoAcumulado: null,
                montoInteres: null,
                fechaDePago: null,
                estadoDeuda: null,
                Pagos: []                
            },          
        }
    },
    methods: {
        initialize() {
            this.isLoading = true;
            this.model.idDeuda = this.$route.params.id;
            this.$proxies.deudaProxy.getById(this.model.idDeuda).then(x=>{
                this.model = x.data 
                this.isLoading=false; 
            }).catch(() => {
                this.$notify({
                    group: "global",
                    type: "is-danger",
                    text: 'Ocurrió un error inesperado'
                });
                this.$router.push({name: 'Deudas'});
            });            
        }        
    }
}