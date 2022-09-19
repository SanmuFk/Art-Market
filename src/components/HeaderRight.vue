<template>
  <nav class="right">
    <div class="el-menu-item"  @click="to_Create" id="zpcs">作品上传</div>
    <div class="el-menu-item"  @click="to_PrivateMuseum" id="museum">私人博物馆</div>
    <div class="line"></div>
    <div class="el-menu-item"  @click="to_Shopping" id="myLike" >我的喜欢</div>
    <div v-if="isLogin" class="el-menu-item" @click="goLogin" style="text-overflow: ellipsis;">登录/注册</div>
    <div v-else class="el-menu-item" @click="to_User" style="text-overflow: ellipsis">{{username}}</div>
    <div class="el-menu-item" >
      <div class="contact-btn">
        <div>
            <img src="@/assets/HeaderImages/img.png"  class="mr-5">
            <el-dropdown>
      <span class="el-dropdown-link" >
        联系这些帅哥
      </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <div class="footer_cont_div1div" style="width: 9rem;">
                <img src="../assets/WorkImages/img1.jpg" class="footer_cont_div1div_img" style="width: 100%;"/>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <a class="a1" href="#" style="font-size: 0.7rem">
                <img src="../assets/footer/10010.png" alt="contact" style="display: inline-block;width: 1.2rem;"/>
                687954132@qq.com
              </a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a class="a1" href="#" style="font-size: 0.7rem">
                <img src="../assets/footer/10010.png" alt="contact" style="display: inline-block;width: 1.2rem;"/>
                156789423@qq.com
              </a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a class="a1" href="#" style="font-size: 0.7rem">
                <img src="../assets/footer/10010.png" alt="contact" style="display: inline-block;width: 1.2rem;"/>
                956321857@qq.com
              </a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a class="a1" href="#" style="font-size: 0.7rem">
                <img src="../assets/footer/10010.png" alt="contact" style="display: inline-block;width: 1.2rem;"/>
                178546239@qq.com
              </a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a class="a1" href="#" style="font-size: 0.7rem">
                <img src="../assets/footer/10010.png" alt="contact" style="display: inline-block;width: 1.2rem;"/>
                325179641@qq.com
              </a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
        </div>
      </div>
    </div>
  </nav>

</template>

<script>
/*import {useRouter} from "vue-router";
import {onBeforeMount, onMounted, ref} from "vue";
import {useStore} from "vuex";*/

import {ElMessage} from "element-plus";

export default {
  name: "HeaderRight",
  data(){
    return{
      isLogin:true,
      username:''
    }
  },
  methods:{
    goLogin() {
      this.$router.push('/Login')
    },
    to_Create(){
      this.$router.push('/Create')
    },
    to_Shopping(){
      if(this.$store.state.userinfo===null){
        /*this.$router.push('/Login')*/
        ElMessage.warning("您未登录，请先登录！")
      }else{
        this.$router.push('/Shopping')
      }
    },
    to_PrivateMuseum(){
      if(this.$store.state.userinfo===null){
        ElMessage.warning("您未登录，请先登录！")
      }else{
        this.$router.push('/PrivateMuseum')
      }
    },
    to_User(){
      this.$router.push('/User/Person')
    }
  },
  mounted() {
    this.$store.state.userinfo=JSON.parse(sessionStorage.getItem("userinfo"))
    if (this.$store.state.userinfo!=null) {
      this.isLogin = false
      this.username = this.$store.state.userinfo.username
    } else {
      this.isLogin = true
    }
  },
/*  setup(){
    /!*let isLogin=ref(true)
    let username=ref('')
    function goLogin(){
      router.push({
        path:'/Login'
      })
    }*!/

    const router=useRouter()
    let to_Create=function (){
      router.push({
        path:'/Create'
      })
    }
    let to_Shopping=function (){
      router.push({
        path:'/Shopping'
      })
    }

    /!*const store=useStore()*!/

    /!*onBeforeMount(()=>{
      if (store.state.userinfo.username ) {
        isLogin.value = false
        username.value = store.state.userinfo.username
      } else {
        isLogin.value = true
      }
    })*!/

    return{
      /!*isLogin,
      username,
      goLogin,*!/
      to_Create,
      to_Shopping
    }
  },*/
}
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: center;
}
nav .el-menu-item {
  padding: 10px;
  text-align: center;
  border-bottom: transparent;
  display: flex;
  transition: 0.4s;
  color: rgba(0,0,0,.65);
  align-items: center;
}
nav .el-menu-item:hover {
  color:deepskyblue;
  border-bottom-color: rgba(255,255,255,0);
  height: 80px;
}
.line{
  height: 1.4rem;
  background: rgba(0,0,0,.1);
  width: 0.06rem;
  margin: 0.01rem;
}

.contact-btn{
  padding-left: 0.25rem;
  padding-right: 1.5rem;
  line-height: 1.9rem;
  border-radius: 1.5rem;
  cursor: pointer;
  border: 1px solid #00e676;
}
.contact-btn div {
  padding: 0.1rem;
}
.contact-btn img{
  display: inline-block;
  width: 1rem;
}
.mr-5 {
  margin: 0.4rem;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.1em;
  padding-bottom: 0.35rem;
}
.el-dropdown-link:hover{
  color:deepskyblue;
}

a{
  color: inherit;
  text-decoration: inherit;
}

</style>