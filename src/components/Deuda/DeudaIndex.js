import Loader from '../../shared/Loader'
import Pager from '../../shared/Pager'

export default {
    name: 'DeudaIndex',
    components: {
        Loader,
        Pager
    },
    mounted() {
        this.getAll(1);
    },
    data() {
        return {
            user: this.$store.state.user,
            isLoading: false,
            collection: {
                hasItems: false,
                items: [],
                total: 0,
                page: 1,
                pages: 0,
                take: 10
            },
        }
    },
    methods: {
        getAll(page) {
            this.isLoading = true;
            this.$proxies.deudaProxy.getAll(page, this.collection.take)
                .then(x => {
                    this.collection = x.data;
                    this.isLoading = false;
                }).catch(() => {
                    this.isLoading = false;
                });
        }
    }
}