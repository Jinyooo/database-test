<template>
  <div id="app">
    <nav v-if="!fnGetAuthStatus">
      <router-link to="/">Home</router-link> |
      <router-link to="/signup">회원가입</router-link>
    </nav>
    <nav v-else>
      <router-link to="/main">Home</router-link> |
      <a @click="fnSignout" href="#">로그아웃</a> | 
      <a @click="fnDeleteAccount" href="#">회원 탈퇴</a>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    fnGetAuthStatus() {
      return this.$store.getters.fnGetAuthStatus
    }
  },
  methods: {
    fnSignout() {
      this.$store.dispatch('fnSignout');
    },
    fnDeleteAccount() {
      this.$store.dispatch('fnDeleteAccount');
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
