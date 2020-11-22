import Loader from '../../shared/Loader'
import Pager from '../../shared/Pager'

export default {
    name: 'ProductoCreateOrUpdate',
    components: {
        Loader, Pager
    },
    mounted() {
        this.initialize();
    },
    validators: {
        'model.stock'(value) {
            return this.$validator
                .value(value)
                .required();
        },
        'model.nombre'(value) {
            return this.$validator
                .value(value)
                .required();
        },
        'model.precio'(value) {
            return this.$validator
                .value(value)
                .required();
        }        
    },
    data() {
        return {
            user: this.$store.state.user,
            isLoading: false,
            model: {
                productoId: null,
                stock: null,
                nombre: null,
                precio: null,
                imagen: null,
            },
        }
    },
    methods: {
        initialize() {
            let id = this.$route.params.id;
            if (!id) return;
            this.isLoading = true;
            this.$proxies.productoProxy.getById(id)
                .then(x => {
                    this.model = x.data;
                    this.isLoading = false;
                })
                .catch(() => {
                    this.isLoading = false;
                    this.$notify({
                        group: "global",
                        type: "is-danger",
                        text: 'Ocurrió un error inesperado'
                    });
                })
        },
        save() {
            this.$validate().then(success => {
                if (!success) return;
                this.isLoading = true;
                if (this.model.productoId) {
                    this.$proxies.productoProxy.update(this.model.productoId, this.model)
                        .then(() => {
                            this.$notify({
                                group: "global",
                                type: "is-success",
                                text: 'Producto actualizado con éxito'
                            });
                            this.$router.push({name: 'Productos'});
                        })
                        .catch(() => {
                            this.isLoading = false;
                            this.$notify({
                                group: "global",
                                type: "is-danger",
                                text: 'Ocurrió un error inesperado'
                            });
                        });
                } else {
                    this.$proxies.productoProxy.create(this.model)
                        .then(() => {
                            this.$notify({
                                group: "global",
                                type: "is-success",
                                text: 'Producto creado con éxito'
                            });
                            this.$router.push({name: 'Productos'});
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
            })
        }
    }
}