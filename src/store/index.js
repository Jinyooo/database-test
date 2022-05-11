import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router';

// initialized firebase 가져오기!!!!
import '@/datasources/firebase'
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  deleteUser
} from "firebase/auth";


const auth = getAuth();

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    oUser : null,
  },
  getters: {
    fnGetUser(state) {
      return state.oUser;
    },
    fnGetAuthStatus(state) {
      return state.oUser != null;
    }
  },
  mutations: {
    fnSetUser(state, payload) {
      state.oUser = payload;
    }
  },
  actions: {
    // 회원가입
    fnSignUp({ commit }, payload) {
      createUserWithEmailAndPassword(auth, payload.pEmail, payload.pPassword)
        .then((userCredential) => {
        // Signed in
        const userEmail = userCredential.user.email;
        commit('fnSetUser', userEmail);
        router.push('/main');
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
    },

    // 로그인
    fnLogin({ commit }, payload) {
      signInWithEmailAndPassword(auth, payload.pEmail, payload.pPassword)
      .then((userCredential) => {
      // Signed in
      commit('fnSetUser', {
        id : userCredential.user.uid,
        name : userCredential.user.displayName,
        email : userCredential.user.email,
        photoURL : userCredential.user.photoURL
      });
      router.push('/main')
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);

      });
    },

    // 구글 로그인
    fnGoogleLogin_Popup({ commit }) {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');

      signInWithPopup(auth, provider)
      .then((userCredential) => {
        commit('fnSetUser', {
          id : userCredential.user.uid,
          name : userCredential.user.displayName,
          email : userCredential.user.email,
          photoURL : userCredential.user.photoURL
        })
        router.push('/main')
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
      
    },

    // 로그아웃
    fnSignout({ commit }) {
      signOut(auth).then(() => {
        commit('fnSetUser', null);
        router.push('/');
      }).catch((error) => {
        console.log(error.message);
      });
    },

    // 회원 탈퇴
    fnDeleteAccount({ commit }) {
      const user = auth.currentUser;
      deleteUser(user).then(() => {
        // User deleted.
        commit('fnSetUser', null);
        router.push('/');
      }).catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
    }
  },
  modules: {
  }
})
