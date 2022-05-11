<template>
  <div class="start">
    <h1>시작 페이지</h1>
    <a @click="fnGoogleLogin"> 구글 로그인</a> <br> <br>
    <a @click="$router.push('/login')">이메일 로그인</a>
  </div>
</template>

<script>
export default {
  methods: {
    fnGoogleLogin() {
      this.$store.dispatch('fnGoogleLogin_Popup');
    }
  }
}
</script>
