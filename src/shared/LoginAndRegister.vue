<template>
  <div class="columns is-centered">
    <div class="column is-6">
      
      <div class="has-text-centered">        
        <div class="imgSize2">
          <img src="../assets/logo.jpeg" />
        </div>
        <hr />
      </div>

      <div class="box">
        <div class="tabs is-boxed">
          <ul>
            <li :class="{'is-active': tab === 'login'}">
              <a @click="tab = 'login'">Login</a>
            </li>
            <li :class="{'is-active': tab === 'registerAdmin'}">
              <a @click="tab = 'registerAdmin'">Registro Administrador</a>
            </li>
          </ul>
        </div>

        <form @submit.prevent="authenticate" v-if="tab === 'login'">
          <div class="field">
            <input
              :disabled="login.loading"
              v-model="login.email"
              required
              class="input"
              type="email"
              placeholder="Ingrese su e-mail"
            />
          </div>
          <div class="field">
            <input
              :disabled="login.loading"
              v-model="login.password"
              required
              class="input"
              type="password"
              placeholder="Ingrese su password"
            />
          </div>
          <div class="field">
            <button :disabled="login.loading" type="submit" class="button is-info">Ingresar</button>
          </div>
        </form>

        <form @submit.prevent="addNewAdmin" v-if="tab === 'registerAdmin'">
          <div class="field">
            <input
              :disabled="register.loading"
              v-model="register.email"
              required
              autocomplete="false"
              class="input"
              type="email"
              placeholder="Ingrese su e-mail"
            />
          </div>
          <div class="field">
            <input
              :disabled="register.loading"
              v-model="register.nombres"
              required
              autocomplete="false"
              class="input"
              type="text"
              placeholder="Su nombre"
            />
          </div>
          <div class="field">
            <input
              :disabled="register.loading"
              v-model="register.apellidos"
              required
              autocomplete="false"
              class="input"
              type="text"
              placeholder="Su apellido"
            />
          </div>
          <div class="field">
            <input
              :disabled="register.loading"
              v-model="register.password"
              required
              autocomplete="false"
              class="input"
              type="password"
              placeholder="Ingrese su password"
            />
          </div>
          <div class="field">
            <button :disabled="register.loading" type="submit" class="button is-info">Registrarse</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoginAndRegister",
  data() {
    return {
      tab: "login",
      login: {
        email: null,
        password: null,
        loading: false
      },
      register: {
        email: null,
        password: null,
        nombres: null,
        apellidos: null,
        loading: false
      }
    };
  },
  methods: {
    authenticate() {
      this.login.loading = true;
      this.$proxies.identityProxy
        .login(this.login)
        .then(x => {
          let token = x.data.split(".");
          let user = atob(token[1]);
          user;

          this.login.loading = false;
          this.$parent.isLoggedIn = true;

          this.$notify({
            group: "global",
            type: "is-success",
            text: "Su acceso ha sido validado correctamente."
          });
          localStorage.setItem("access_token", x.data);
          this.$user.initialize();
        })
        .catch(x => {
          if (x.response.status === 400) {
            this.$notify({
              group: "global",
              type: "is-warning",
              text: x.response.data
            });
          }
          this.login.loading = false;
        });
    },
    addNewUser() {
      this.register.loading = true;
      this.$proxies.identityProxy
        .register(this.register)
        .then(() => {
          this.register.email = null;
          this.register.password = null;
          this.register.nombres = null;
          this.register.apellidos = null;
          this.$notify({
            group: "global",
            type: "is-success",
            text: "Su cuenta ha sido creada con éxito"
          });
          this.register.loading = false;
        })
        .catch(x => {
          if (x.response.status === 400) {
            this.$notify({
              group: "global",
              type: "is-warning",
              text: x.response.data
            });
          }
          this.register.loading = false;
        });
    },
    addNewAdmin() {
      this.register.loading = true;
      this.$proxies.identityProxy
        .registerAdmin(this.register)
        .then(() => {
          this.register.email = null;
          this.register.password = null;
          this.register.nombres = null;
          this.register.apellidos = null;
          this.$notify({
            group: "global",
            type: "is-success",
            text: "Su cuenta ha sido creada con éxito"
          });
          this.register.loading = false;
        })
        .catch(x => {
          if (x.response.status === 400) {
            this.$notify({
              group: "global",
              type: "is-warning",
              text: x.response.data
            });
          }
          this.register.loading = false;
        });
    }
  }
};
</script>
<style>
.imgSize2 {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 45%;
}
.imgSize3 {
    width: 20%;
}
</style>