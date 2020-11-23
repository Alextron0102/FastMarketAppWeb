import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
Vue.use(VueRouter)
const routes = [
    {
        path: '*',
        name: 'Error404',
        component: () => import("../shared/404Error.vue")
    },
    {
        path: '/',
        name: 'Default',
        component: ()=>import("../components/Default.vue")
    },
    {
        path: '/productos/admin',
        name: 'ProductosAdmin',
        beforeEnter: Adminauthorization,
        component: () => import("../components/Producto/ProductoIndex.vue"),
    },
    {
        path: '/productos',
        name: 'Productos',
        component: () => import("../components/Producto/ProductoIndex.vue")
    },
    {
        path: '/productos/create',
        name: 'ProductoRegistro',
        beforeEnter: Adminauthorization,
        component: () => import("../components/Producto/ProductoCreateOrUpdate.vue")
    },
    {
        path: '/productos/update/:id',
        name: 'ProductoModificar',
        beforeEnter: Adminauthorization,
        component: () => import("../components/Producto/ProductoCreateOrUpdate.vue")
    },
    {
        path: '/ordenes',
        name: 'Ordenes',
        component: () => import("../components/Orden/OrdenIndex.vue")
    },
    {
        path: '/ordenes/selectcliente',
        name: 'ClienteSeleccion',
        component: () => import("../components/Orden/ClienteSelect.vue")
    },
    {
        path: '/ordenes/:idCliente/create',
        name: 'OrdenRegistro',
        component: () => import("../components/Orden/OrdenCreate.vue")
    },
    {
        path: '/cliente',
        name: 'Clientes',
        component: () => import("../components/Cliente/ClienteIndex.vue")
    },
    {
        path: '/cliente/create',
        name: 'ClienteRegistro',
        component: () => import("../components/Cliente/ClienteCreateOrUpdate.vue")
    },
    {
        path: '/cliente/update/:id',
        name: 'ClienteModificar',
        component: () => import("../components/Cliente/ClienteCreateOrUpdate.vue")
    },
    {
        path: '/tasas',
        name: 'Tasas',
        component: () => import("../components/Tasa/TasaIndex.vue")
    },
    {
        path: '/tasa/create',
        name: 'TasaRegistro',
        component: () => import("../components/Tasa/TasaCreateOrUpdate.vue")
    },
    {
        path: '/tasa/update/:id',
        name: 'TasaModificar',
        component: () => import("../components/Tasa/TasaCreateOrUpdate.vue")
    },
    {
        path: '/deudas',
        name: 'Deudas',
        component: () => import("../components/Deuda/DeudaIndex.vue")
    },
    {
        path: '/deuda/:id',
        name: 'DeudaDetalle',
        component: () => import("../components/Deuda/DeudaView.vue")
    },
    {
        path: '/deuda/:id/pago',
        name: 'DeudaPago',
        component: () => import("../components/Deuda/DeudaPago.vue")
    },
]

function Adminauthorization(to, from, next) {
    let user = store.state.user;
    if (user) {
        if (!user.roles.includes('ADMIN')) {
            return next('/');
        }
    }
    return next();
}
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router