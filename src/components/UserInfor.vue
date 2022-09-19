<template>
  <div style="margin-top: 20px;margin-left: 60px">
    <h3 style="font-weight: bolder">基本信息</h3>
    <div style="display: flex">
      <div style="display: flex;flex-direction: column;width: 120px" >
        <div class="info">
          <label class="label-1">{{info1.i}}</label>
        </div>
        <div class="info">
          <label class="label-1">{{info2.i}}</label>
        </div>
        <div class="info">
          <label class="label-1">{{info3.i}}</label>
        </div>
      </div>
      <div style="display: flex;flex-direction: column;width: 120px;margin-top: -5px" >
        <div class="num">
          <p>{{info1.num}}</p>
        </div>
        <div  class="num">
          <p>{{info2.num}}</p>
          <el-icon @click="open2" style="margin-left: 1rem;margin-top: 0.1rem"><edit /></el-icon>
        </div>
        <div  class="num">
          <p>{{info3.num}}</p>
          <el-icon @click="open3" style="margin-left: 1rem;margin-top: 0.1rem"><edit /></el-icon>
        </div>

      </div>
    </div>
    <div class="button">
      <el-button type="primary" round @click="signOut">退出登录</el-button>
    </div>
  </div>
</template>

<script >
import request from "@/axios.js";

export default {
  name: 'UserInfor',
  data(){
    return{
         ruleForm: {
           username: this.$store.state.userinfo.username,
           email: this.$store.state.userinfo.email,
           address: this.$store.state.userinfo.address,
         },
        info1:{i:'账户昵称:',num:this.$store.state.userinfo.username},
        info2:{i:'邮箱:',num:this.$store.state.userinfo.email},
        info3:{i:'地址:',num:this.$store.state.userinfo.address}

    }
  },
  /*created(){
    request.get('/user/userInfor',this.ruleForm.username).then( res=>{
          this.info3.num=res.data.address
          this.info2.num=res.data.email
        }
    )
  },*/
  methods: {
    signOut(){
      this.$confirm('此操作将注销登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sessionStorage.removeItem("userinfo")
        this.$router.push('/Index')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    open2() {
      this.$prompt('请输入您的新邮箱', '修改邮箱', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({value}) => {
        console.log(this.$store.state.userinfo.email)
        this.$store.state.userinfo.email=value
        console.log(this.$store.state.userinfo.email)
        this.info2.num=value
        this.ruleForm.email=value
        request.put("/user/update",this.ruleForm).then(res =>{
          sessionStorage.setItem("userinfo",JSON.stringify(res))
          const userinfo = res.data.data
          this.$store.commit("SET_USERINFO", userinfo)
          console.log(this.$store.state.userinfo.email)
          this.info2.num=this.$store.state.userinfo.email
        })

        /*request.get('/user/userInfor',this.ruleForm.username).then( res=>{
              this.$store.state.userinfo.email=res.data.email
            }
        )*/

        this.$message({
              type: 'success',
              message: '你的新邮箱是: ' + value

            }
        );
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    open3() {
      this.$prompt('请输入您的新地址', '修改地址', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^(?!_)(?!.*?_$)(?!\d)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
        inputErrorMessage: '地址格式不正确'
      }).then(({value}) => {
        this.$store.state.userinfo.address=value
        console.log(this.$store.state.userinfo.address)
        this.info3.num=value
        this.ruleForm.address=value
        request.put("/user/update",this.ruleForm).then(res =>{
          sessionStorage.setItem("userinfo",JSON.stringify(res))
          const userinfo = res.data.data
          this.$store.commit("SET_USERINFO", userinfo)
          console.log(this.$store.state.userinfo.address)
          this.info3.num=this.$store.state.userinfo.address
        })

        /*request.get('/user/userInfor',this.ruleForm.username).then( res=>{
             this.$store.state.userinfo.address=res.data.address
            }
        )*/

        this.$message({
              type: 'success',
              message: '你的新地址是: ' + value
            }
        );
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    }
  }
}
</script>

<style>
   p{
     font-size: 1rem;
     color: rgba(0,0,0,.65);
   }
  .label-1{
    font-size: .85rem;
    width: 100px;
    font-weight: 600;
    text-align: right;
  }
  .info{
    margin-top: 20px;
    margin-bottom: 5px;
    margin-right: 20px;
    width: 100px;
    float: right
  }
   .button{
     margin-top: 2rem;
   }
  .num{
    display: flex;
    margin-top: 25px;
    margin-right: 20px;
    width: 100px;
  }
</style>