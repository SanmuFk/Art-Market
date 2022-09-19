<template>
  <div class="header">
    <div class="headerLeft">
      <div style="width: 28%;height: 55%;margin-top: 1.3rem" @click="to_Index">
        <a class="logo_a" >
          <img src="@/assets/HeaderImages/header6.png" class="logo">
        </a>
      </div>
     <HeaderLeft/>
    </div>

    <div class="headerRight">
      <HeaderRight/>
    </div>

  </div>
</template>

<script>
import HeaderLeft from "@/components/HeaderLeft";
import HeaderRight from "@/components/HeaderRight";
import {useRouter} from "vue-router";

export default {
  name: "Header",
  components:{HeaderLeft,HeaderRight},
  setup(){
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath)
    }

    const router=useRouter()
    let to_Index=function (){
      router.push({
        path:'/Index'
      })
    }

    return{
      handleSelect,
      to_Index
    }
  }
}
</script>

<style scoped>
.header{
  height:75px;
  width:100%;
  line-height: 50px;
  justify-content:center;
  align-items:center;
  background-color: rgb(255,255,255);
  display: flex;
  /*  为什么设置z-index: 19; Header头标才能完全在顶部*/
  position: fixed;
  top:0;
  z-index: 99;
  padding: 0 0.24rem;
}
.headerLeft{
  width: 41%;
  height:100%;
  margin-right: 1rem;
  display: flex;
}
.headerRight{
  width: 42%;
  height:100%;
  display: flex;
  padding-left:3.8rem;
}
.logo_a{
  margin-right: 20rem;
  /*这个样式是给该class对应的聚焦添加手型*/
  cursor: pointer;
}
.logo{
  width: 100%;
  height: 100%;
  object-fit: contain;
}

</style>