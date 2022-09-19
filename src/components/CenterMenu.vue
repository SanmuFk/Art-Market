<template>
  <div class="Menu">
    <ul class="Menuul">
      <li v-for="(item,index) in nav" :key="item.id"  :class="{ active: index == current }" @click="go(index);pushShow(item)">
        <el-image class="image" :src="item.url" fit="full"></el-image>
        <span >{{item.information}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CenterMenu",
  data() {
    return {
      current: 0,//切换标识
      nav: [
        //左边导航栏数据
        {id: '01', information: '个人信息', url: require('@/assets/Admin/icon_user.png'),path:"/User/Person",name: 'home',},
        {id: '03', information: '我的邀请', url: require('@/assets/Admin/icon_invite.png'),path:"/User/Invitation",name: 'home',},
        {id: '04', information: '我的钱包', url: require('@/assets/Admin/wallet.png'),path:"/User/Wallet",name: 'home',}
      ]
    }

  },
  methods: {
    // 导航栏切换
    go(index) {
      this.current = index//激活样式
    } ,
    pushShow(item){
      this.$router.push(item.path)
    }
  }
}
</script>

<style scoped>
  .Menu{
    background-color: white;
    width: 240px;
    height: 270px;
    display: flex;
    flex-direction: column;
  }
  ul li{
    height: 20%;
    width: 100%;
    margin-top: 12px;
    margin-left: 30px;
    float: left;
    display: flex;
    align-items: center;
    cursor:pointer;
  }
  .active{
    color: rgb(72,230,136);
    width: 180px;
    height: 35px;
    background: rgb(225,251,232);
    border-radius: 20px;    /*目标元素四角都为4px的圆角*/

  }
  .image{
    margin-left: 30px;
    margin-right: 15px;;
    width: 20px;
    height: 20px;
  }
  span{
    color: rgba(0,0,0,.65);
    font-size: 0.9rem;
  }
</style>