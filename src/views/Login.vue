<template>
  <div class="main">
    <el-container class="container switch" >
      <el-main>
        <!--注册-->
        <div class="demo-ruleForm sign-up">
          <el-form :model="ruleForm2" :rules="rules" ref="ruleFormRef2"  class="form">
            <h2 class="form-title">Sign Up</h2>
            <el-form-item  prop="username">
              <el-input type="text" placeholder="User" v-model="ruleForm2.username" class="input"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" placeholder="Password" v-model="ruleForm2.password" class="input"></el-input>
            </el-form-item>
            <el-form-item  prop="checkPass">
            <el-input
                v-model="ruleForm2.checkPass"
                type="password"
                placeholder="Confirm"
                autocomplete="off"
                class="input"
            />
          </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="register" class="submit">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
<!--        登录-->
        <div class="demo-ruleForm sign-in">
          <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef1"  class="form">
            <h2 class="form-title">Sign In</h2>
            <el-form-item  prop="username">
              <el-input type="text" placeholder="User" v-model="ruleForm.username" class="input"></el-input>
            </el-form-item>
            <el-form-item  prop="password">
              <el-input type="password" placeholder="Password" v-model="ruleForm.password" class="input"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"  class="submit">登录</el-button>
            </el-form-item>
          </el-form>
        </div>

        <!-- 覆盖层 -->
        <div class="container-overlay">
          <div class="overlay">
            <div class="overlay-slide overlay-left">
              <button class="submit" id="goSignIn" @click="clear1">sign up</button>
            </div>
            <div class="overlay-slide overlay-right">
              <button class="submit" id="goSignUp" @click="clear2">sign in</button>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
const {ElMessage} = require("element-plus");
import request from "@/axios.js";

export default {
  name: "Login",
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再输一次密码'))
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入的密码不匹配"))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      ruleForm2:{
        username: '',
        password: '',
        checkPass: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
        ],
        password: [
          { validator: validatePass,required: true, trigger: 'blur' }
        ],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      }
    };
  },
  methods: {
    clear1(){
      // 获取被切换的样式类
      const container = document.querySelector('.container');
      container.classList.remove('switch');
      this.$refs['ruleFormRef2'].clearValidate();//消除校验,这里的setTimeOut不能去掉,去掉之后会不生效
      this.ruleForm2.username='';
      this.ruleForm2.password='';
      this.ruleForm2.checkPass='';
    },
    clear2(){
      const container = document.querySelector('.container');
      container.classList.add('switch');
      this.$refs['ruleFormRef1'].clearValidate();
      this.ruleForm2.username='';
      this.ruleForm2.password='';
    },
    register(){
      if(this.ruleForm2.username.length<=2){
        ElMessage.error("用户名长度必须大于3")
      }else {
        request.post("/user/save", this.ruleForm2).then(res => {
          ElMessage.success("账号注册成功")
        })
      }
    },
    submitForm () {
      this.$refs['ruleFormRef1'].validate((valid) => {
        if (valid) {
          const _this=this
          request.post('/login',this.ruleForm).then(res =>{
            console.log(res.headers)
            const jwt= res.headers['authorization']
            const userinfo=res.data.data
            _this.$store.commit("SET_TOKEN",jwt)
            _this.$store.commit("SET_USERINFO",userinfo)
            _this.$router.push("/User/Person")
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'margin:0;')
  },

}
</script>

<style scoped>
/* 清除所有元素内外边距 转换为c3盒子模型 */
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 清除input、button默认边框以及点击高亮 */
input, button{
  outline: none;
  border: none;
}

/* 页面整体样式 */
.main{
  margin: 0 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url("../assets/Admin/green.jpg") no-repeat fixed center;
  background-size: cover;
}
.container{
  flex: 0.5;
  position: relative;
  width: 50vw;
  height: 70vh;
  background-color: rgb(255,255,255);
  box-shadow: 0 1rem 1.5rem rgba(0,0,0,.3),
  0 .5rem .5rem rgba(0,0,0,.2);
  border-radius: 1rem;
  overflow: hidden;
}
/deep/.el-form-item__error{
  margin-left: 10%;
  margin-top: -5%;
}
/deep/.el-input--small .el-input__inner{
  height: 34px;
}
/deep/.el-form-item__content .el-input{
  el-input-border-color: rgb(255,255,255),
}

.demo-ruleForm {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all .5s ease-in-out;
}
.sign-in{
  left: 0;
  width: 50%;
  z-index: 1;
  opacity: 0;
}
.sign-up{
  left: 0;
  width: 50%;
  z-index: 2;
  opacity: 1;
}

/* 默认显示signup注册页，通过操作switch类名 显示登录页 */
.container.switch .sign-in{
  transform: translateX(100%);
  z-index: 5;
  opacity: 1;
}
.container.switch .sign-up{
  transform: translateX(100%);
  opacity: 0;
}
.container-overlay{
  position: absolute;
  left: 50%;
  top: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transform: translateX(0);
  transition: transform .5s ease-in-out;
  z-index: 999;
}
/* 设置显示背景图 */
.overlay{
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: url("../assets/Admin/green.jpg") no-repeat fixed center;
  background-size: cover;
  transition: transform .5s ease-in-out;
  /* 完工！ */
}
/* 默认左边显示 通过操作switch类名显示登录页 */
.container.switch .container-overlay{
  transform: translateX(-100%);
}
.container.switch .overlay{
  transform: translateX(50%);
}
/* 设置切换按钮页样式 */
.overlay-slide{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
  transition: transform .5s ease-in-out;
}
.overlay-left{
  transform: translateX(-20%);
}
.overlay-right{
  transform: translateX(0);
  right:0;
}
.container.switch .overlay-left{
  transform: translateX(0);
}
.container.switch .overlay-right{
  transform: translateX(20%);
}
/* 设置表单内元素样式 */
.form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
}
.form-title{
  height: 100px;
  font-weight: 300;
  margin-bottom: 1rem;

}
/* 设置input标签样式 */
.input{
  width: 100%;
  padding: 0.5rem;
}
/* 设置按钮样式 */
.submit{
  padding: 1rem 3rem;
  background-image: -webkit-linear-gradient(40deg,#0367a6 0%,#008997 70%);
  border-radius: 1rem;
  color: #fff;
  cursor: pointer;
  text-transform: uppercase;
  transition: transform .1s ease-in-out;
}
/* 只设置表单按钮的外边距 */
.form>.submit{
  margin-top: 1.5rem;
}
/* 设置按钮按下样式 */
.submit:active{
  transform: scale(0.95);
}
</style>
