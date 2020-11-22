<template>
    <div>
        <div class="imgSize3">
            <img src="../assets/logo.jpeg" />
        </div>
        <br />
        <div>
            <h1 class="title">Fast Market</h1>
            <h2 class="subtitle">Aplicación web para el manejo de datos</h2>
            <p>
                Bienvenido
                <b>{{ user.lastName }}, {{ user.name }}.</b>
                <br />
                <b>Rol: {{ user.roles }}</b>
            </p>
        </div>
        <span class="navbar-item">
            <a @click="logout" class="button is-danger is-inverted">
                <span class="icon">
                    <i class="fas fa-sign-out-alt"></i>
                </span>
                <span>Desconectarse</span>
            </a>
        </span>
    </div>
</template>

<script>
    export default {
        name: "Default",
        data() {
            return {
                user: this.$store.state.user,
            };
        },
        methods: {
            logout() {
                this.$proxies.identityProxy
                    .logout()
                    .then(() => {
                        localStorage.removeItem("access_token");
                        this.$parent.isLoggedIn = false;
                    })
                    .catch(() => {
                        this.$notify({
                            group: "global",
                            type: "is-danger",
                            text: "Ocurrió un error inesperado",
                        });
                    });
            },
        },
    };
</script>