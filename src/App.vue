<template>
  <section id="app" class="hero is-light is-fullheight">

    <notifications group="global" position="top right" style="top:20px;right:20px;">
      <template slot="body" slot-scope="props">
        <div :class="'notification ' + props.item.type">
          <button type="button" @click="props.close" class="delete"></button>
          <div v-html="props.item.text"></div>
        </div>
      </template>
    </notifications>

   <template> 
     <Header v-if="isLoggedIn" />
      <div class="hero-body">
        <div class="container">
          <router-view v-if="isLoggedIn" />
          <LoginAndRegister v-else />
        </div>
      </div>
    </template>

  </section>
</template>

<script>
import Header from './shared/Header.vue'
import LoginAndRegister from "./shared/LoginAndRegister.vue";
export default {
  name: 'App',
  mounted(){
    this.__isLoggedIn();
  },
  components: {
    Header,
    LoginAndRegister
  },
  data() {
    return {
      isLoggedIn: false
    };
  },
  methods: {     
      __isLoggedIn() {
        if (localStorage.getItem("access_token") != null) {
          //https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
          let token = localStorage.getItem("access_token").split("."),
            user = JSON.parse(
              decodeURIComponent(
                atob(token[1])
                  .split("")
                  .map(function(c) {
                    return (
                      "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                  })
                  .join("")
              )
            );
          user
          this.$user.initialize();
          this.isLoggedIn = true;
        }      
    }
  }
};
</script>