<template>
  <div class="hero-head">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item">
            <router-link :class="{ 'is-active': $route.name === 'Default' }" :to="{name: 'Default'}">
              <img src="../assets/logomini.png" alt="logotransparente" />
            </router-link>
          </a>
          <span class="navbar-burger burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }"
            data-target="navbarMenuHeroC">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroC" class="navbar-menu" :class="{ 'is-active': showNav }">
          <div class="navbar-end" v-if="user">
            <router-link :class="{ 'is-active': $route.name === 'ProductosAdmin' }" v-if="user.roles.includes('ADMIN')"
              class="navbar-item" :to="{name: 'ProductosAdmin'}">
            Productos
            </router-link>
            <router-link :class="{ 'is-active': $route.name === 'Ordenes' }" v-if="user.roles.includes('ADMIN')"
              class="navbar-item" :to="{name: 'Ordenes'}">
            Ordenes
            </router-link>
            <router-link :class="{ 'is-active': $route.name === 'Clientes' }" v-if="user.roles.includes('ADMIN')"
              class="navbar-item" :to="{name: 'Clientes'}">
            Clientes
            </router-link>
            <router-link :class="{ 'is-active': $route.name === 'Tasas' }" v-if="user.roles.includes('ADMIN')"
              class="navbar-item" :to="{name: 'Tasas'}">
            Tasas
            </router-link>
            <span class="navbar-item">
              <a @click="logout" class="button is-danger is-inverted">
                <span class="icon">
                  <i class="fas fa-sign-out-alt"></i>
                </span>
                <span>Desconectarse</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    //Esta funcion es para que la navbar se vea en mobile, sacada de la documentación
    //https://bulma.io/documentation/components/navbar/#navbar-menu
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach((el) => {
        el.addEventListener("click", () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle("is-active");
          $target.classList.toggle("is-active");
        });
      });
    }
  });
  export default {
    name: "Header",
    data() {
      return {
        showNav: false,
        //user: this.$store.state.user,
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