import Loader from '../../shared/Loader'
import Pager from '../../shared/Pager'

export default {
    name: 'ClienteCreateOrUpdate',
    components: {
        Loader,
        Pager
    },
    mounted() {
        this.initialize();
    },
    validators: {
        'model.direccion'(value) {
            return this.$validator
                .value(value)
                .required();
        },
        'model.telefono'(value) {
            return this.$validator
                .value(value)
                .required();
        },
        'model.dni'(value) {
            return this.$validator
                .value(value)
                .required();
        },        
        'model.nombres'(value) {
            return this.$validator
                .value(value)
                .required();
        },
        'model.apellidos'(value) {
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
                idCliente: null,
                nombres: null,
                apellidos: null,
                direccion: null,
                telefono: null,
                dni: null,
                lineaCredito: null,
                lineaConsumida: null,
            },
        }
    },
    methods: {
        initialize() {
            let id = this.$route.params.id;
            if (!id) return;
            this.isLoading = true;
            this.$proxies.clienteProxy.getById(id)
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
                if (this.model.idCliente) {
                    this.$proxies.clienteProxy.update(this.model.idCliente, this.model)
                        .then(() => {
                            this.$notify({
                                group: "global",
                                type: "is-success",
                                text: 'Cliente actualizado con éxito'
                            });
                            this.$router.push({name: 'Clientes'});
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
                    this.$proxies.clienteProxy.create(this.model)
                        .then(() => {
                            this.$notify({
                                group: "global",
                                type: "is-success",
                                text: 'Cliente creado con éxito'
                            });
                            this.$router.push({name: 'Clientes'});
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