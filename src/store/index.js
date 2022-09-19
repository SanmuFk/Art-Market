import { createApp } from 'vue'
import Vuex from 'vuex'
import App from "@/App";
import createPersistedState from "vuex-persistedstate";

const app = createApp(App);
app.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userinfo: {}
  },
  getters: {
    getUser:state => {
      return state.userinfo
    }
  },
  mutations: {
    SET_TOKEN:(state,token)=>{
      state.token=token
      localStorage.setItem("token",token)
    },
    SET_USERINFO:(state,userinfo)=>{
      state.userinfo=userinfo
      sessionStorage.setItem("userinfo",JSON.stringify(userinfo))
    },
    REMOVE_INFO:(state)=>{
      state.token=''
      state.userinfo={}
      localStorage.setItem("token",'')
      sessionStorage.setItem("userinfo",JSON.stringify(''))

    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })]
})
