import Loader from '../../shared/Loader'
import Pager from '../../shared/Pager'

export default {
    name: 'TasaCreateOrUpdate',
    components: {
        Loader, Pager
    },
    mounted() {
        this.initialize();
    },
    validators: {
        'model.valor'(value) {
            return this.$validator
                .value(value)
                .required();
        },
        'model.tipoTasa'(value) {
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
                tasaId: null,
                valor: null,
                tipoTasa: null,
                descripcion: null,
            },
            tipoTasa: [
                {
                    secret: 'TasaNominalMensual',
                    value: 'Tasa nominal mensual'
                },
                {
                    secret: 'TasaEfectivaMensual',
                    value: 'Tasa efectiva diaria'
                },
            ]
        }
    },
    methods: {
        initialize() {
            let id = this.$route.params.id;
            if (!id) return;
            this.isLoading = true;
            this.$proxies.tasaProxy.getById(id)
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
                    this.$proxies.tasaProxy.update(this.model.productoId, this.model)
                        .then(() => {
                            this.$notify({
                                group: "global",
                                type: "is-success",
                                text: 'Tasa actualizada con éxito'
                            });
                            this.$router.push({name: 'Tasas'});
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
                    this.$proxies.tasaProxy.create(this.model)
                        .then(() => {
                            this.$notify({
                                group: "global",
                                type: "is-success",
                                text: 'Tasa creada con éxito'
                            });
                            this.$router.push({name: 'Tasas'});
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