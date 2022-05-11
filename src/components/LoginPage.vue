<template>
    <div>
        <h1>로그인 페이지입니다</h1>

        <form @submit.prevent="fnLogin">
            <label for="">이메일</label> 
            <input type="text" v-model="sEmail"> <br>
            <label for="">비밀번호</label>
            <input type="password" v-model="sPassword"> <br>
            <input type="submit" value="로그인">
        </form>

    </div>
</template>

<script>
export default {
    data() {
        return {
            sEmail: "",
            sPassword: "",
        }
    },
    methods: {
        fnLogin() {
            this.$store.dispatch('fnLogin', {
                pEmail : this.sEmail,
                pPassword : this.sPassword
            })
        }
    }
}
</script>