<template>

     <div class="users-main" >

         <div class="LocalBackground-center">
           <div>
             <el-image :src="require('@/assets/Create/logo.568a1ae6.png')" fit="full" style="height: 65px;width: 65px"></el-image>
           </div>
           <br/>
           <div class="center-section-two">
             <span class="personal-center">个人中心</span>
             <span class="font1">
               欢迎您！
               <span style="font-weight: bold">
                 {{name}}
               </span>
               的用户，在这里你将看到不一样的
               <span style="color: #00e676">
                 {{data}}
               </span>

             </span>
           </div>

         </div>

     </div>
</template>

<script>
export default {
  name: "LocalBackground",
  data(){
    return{
      url:'@/assets/Admin/admin.png',
      name:'Van Gogh Art',
      data:'艺术'
    }
  }
}
</script>

<style scoped>
  .users-main{
    width:100%;
    height: 200px;
    margin-top: 75px;
    background: rgb(224,251,255);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .LocalBackground-center{
    width: 60%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .center-section-two{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 45px;
    margin-left: 20px;
  }
  .personal-center{
    font-size: 1.4rem;
    font-weight: 600;
  }
  .font1{
    font-family: "微软雅黑";
    font-size: .85rem;
    margin-top: 15px;
  }
</style>