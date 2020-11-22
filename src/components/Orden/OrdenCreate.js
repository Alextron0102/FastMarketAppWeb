import Loader from '../../shared/Loader'
import Pager from '../../shared/Pager'

export default {
    name: 'OrdenCreate',
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
                estadoPago: null,
                montoPagado: null,
                detalleOrdenes: [],
                //detalleOrden: {idProducto, Cantidad, idDetalleOrden}
                idTasa: null,
            },
            productos: {
                hasItems: false,
                items: [],
                total: 0,
                page: 1,
                pages: 0,
                take: 10
            },
            tasas: [],
            tipoPago:[
                {
                    secret: 'Pagado',
                    value: 'Pagado'
                },
                {
                    secret: 'PorPagar',
                    value: 'Por pagar'
                },
                {
                    secret: 'Pago0',
                    value: 'Exonerado'
                },
                {
                    secret: 'PagoParte',
                    value: 'Pago parte'
                }
            ],
            tipoTasa: {
                1: 'TNA',
                2: 'TEA'
            },
            preciofinal: 0,           
        }
    },
    methods: {
        initialize() {
            this.model.idCliente = this.$route.params.idCliente;
            this.isLoading = true;
            let flagtasas=false;
            let flagproductos=false;
            //Primero tenemos que cargar los productos y las tasas para que el administrador pueda elegir:
            //Cargamos las tasas:
            this.$proxies.tasaProxy.getAllSimple(1,1000).then(x=>{
                this.tasas = x.data.items;
                this.tasas.forEach(element => {
                    element.tipoTasa = this.tipoTasa[element.tipoTasa];
                });
                flagtasas = true;   
                if(flagtasas && flagproductos){
                    this.isLoading = false;
                }        
            }).catch(() => {
                this.$notify({
                    group: "global",
                    type: "is-danger",
                    text: 'Ocurrió un error al momento de solicitar las tasas'
                });
                this.$router.push({name: 'ClienteSeleccion'});
            });
            //Ahora cargamos los productos:
            this.$proxies.productoProxy.getAllUser(1,10).then(x=>{
                this.productos = x.data;
                flagproductos = true;
                if(flagtasas && flagproductos){
                    this.isLoading = false;
                }                               
            }).catch(() => {
                this.$notify({
                    group: "global",
                    type: "is-danger",
                    text: 'Ocurrió un error al momento de solicitar las productos'
                });
                this.$router.push({name: 'ClienteSeleccion'});
            });
        },
        ActualizarPrecioFinal(){
            this.preciofinal =0;
            this.model.detalleOrdenes.forEach(x=>{
                this.preciofinal = this.preciofinal+x.precio;
            });
        },
        EliminarProducto(id){
            let indice = this.model.detalleOrdenes.indexOf(element=> element.idProducto === id);
            this.model.detalleOrdenes.splice(indice,1);
            this.ActualizarPrecioFinal();
        },
        AgregarProducto(id){  
            let indice = this.model.detalleOrdenes.findIndex(element=> element.idProducto === id);
            if(indice === -1){     
                //Significa que no existe                  
                let prod = this.productos.items.find(element=> element.idProducto === id);
                this.model.detalleOrdenes.push({
                        idProducto: prod.idProducto,
                        cantidad: prod.cantidad,
                        imagen: prod.imagen,
                        nombre: prod.nombre,
                        precio: (prod.precio*prod.cantidad),
                        stock: prod.stock
                    });
                this.ActualizarPrecioFinal();
            }
        },
        save() {
            this.model.detalleOrdenes.forEach(x=>{x.cantidad = parseInt(x.cantidad);} );            
            this.isLoading = true;
            this.$proxies.ordenProxy.create(this.model)
                .then(() => {
                    this.$notify({
                        group: "global",
                        type: "is-success",
                        text: 'Orden creado con éxito'
                    });
                    this.$router.push({name: 'Ordenes'});
                })
                .catch(() => {
                    this.isLoading = false;
                    this.$notify({
                        group: "global",
                        type: "is-danger",
                        text: 'Ocurrió un error inesperado'
                    });
                });  
        }
    }
}