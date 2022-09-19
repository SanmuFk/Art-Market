<template>
  <nav class="left">
    <div class="el-menu-item" id="mk" style="padding-left: 2rem" @click="to_ArtsMarket">交易市场</div>
    <div class="el-menu-item" >
     <el-dropdown>
      <span class="el-dropdown-link" >
        奖励中心
        <el-icon class="icon--bottom" :size="17" ><caret-bottom /></el-icon>
      </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>敬请期待</el-dropdown-item>
            <el-dropdown-item>敬请期待</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

  </nav>
</template>

<script>
import { useRouter} from "vue-router";

export default {
  name: "HeaderLeft",
  setup(){
    const router=useRouter()
    let to_ArtsMarket=function (){
      router.push({
        path:'/ArtsMarket'
      })
    }

    return{
      to_ArtsMarket
    }
  }
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
  font-weight: 700;
  align-items: center;
}
nav .el-menu-item:hover {
  color:deepskyblue;
  border-bottom-color: rgba(255,255,255,0);
  height: 80px;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;

  font-size: 1.17em;
}
.el-dropdown-link:hover{
  color:deepskyblue;
}

</style>