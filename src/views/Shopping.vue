<template>
  <Header />
  <div class="shopping">
    <div class="shopping-banner">
      <div class="shopping-banner-main">
        <div class="logo">
          <img src="../assets/Create/logo.568a1ae6.png" alt>
        </div>
        <div class="content">
          <span class="font">我的艺术品</span>
          <span>展示您的爱好物品和私人的艺术品</span>
        </div>
      </div>
    </div>
    <div class="shopping-main">
      <div class="shopping-main-li" >
        <div  v-for="(menu,index) in menus">
          <div class="li-item"   @click="clickMenu(index);pushShow(menu)" :class="{change:choose === index}">
            <div class="li-item-img">
              <img :src="require(`../assets/Menu/${menu.id}.png`)" alt="">
            </div>
            <span>{{ menu.name }}</span>
          </div>
        </div>
      </div>
      <div class="shopping-main-content" v-if="choose ===0">
        <h3 class="content-title">我的喜欢</h3>
        <div class="container">
          <article class="container-item" v-for="(item,index) in loveProduct" @click="goToWork(item)">
            <div class="cursor-pointer">
              <div class="item-show" :style="{'backgroundImage':'url('+ item.exhibition+')'}"></div>
              <div class="item-center">
                <article style="width: 60%;">
                  <p class="item-name">{{ item.artwork_name }}</p>
                  <p class="item-authorName">{{ item.author }}</p>
                </article>
              </div>
              <div class="item-tag">
                <img src="../assets/Product/selling.png" alt="">
                <span class="sale-text">{{ item.artwork_state }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div class="shopping-main-content" v-if="choose ===1">
        <h3 class="content-title">私人博物馆</h3>
        <div class="menu-item">
          <div class="item-title" v-for="(sale,index) in sales" @click="clickSale(index)">
            <div :class="{'title-selected':isClick===index,'title-all':isClick!==index}">
              {{sale.name}}
            </div>
          </div>
        </div>
        <div class="container" v-if="isClick===0">
          <article class="container-item" v-for="(item,index) in product" @click="goToWork(item)">
            <div class="cursor-pointer">
              <div class="item-show" :style="{'backgroundImage':'url('+ item.exhibition+')'}"></div>
              <div class="item-center">
                <article style="width: 60%;">
                  <p class="item-name">{{ item.artwork_name }}</p>
                  <p class="item-authorName">{{ item.author }}</p>
                </article>
              </div>
              <div class="item-tag">
                <img src="../assets/Product/selling.png" alt="">
                <span class="sale-text">{{ item.artwork_state }}</span>
              </div>
            </div>
          </article>
        </div>
        <div class="container" v-if="isClick===1">
          <article class="container-item" v-for="(item,index) in saleProduct" @click="goToWork(item)">
            <div class="cursor-pointer">
              <div class="item-show" :style="{'backgroundImage':'url('+ item.exhibition+')'}"></div>
              <div class="item-center">
                <article style="width: 60%;">
                  <p class="item-name">{{ item.artwork_name}}</p>
                  <p class="item-authorName">{{ item.author }}</p>
                </article>
              </div>
              <div class="item-tag">
                <img src="../assets/Product/selling.png" alt="">
                <span class="sale-text">{{ item.artwork_state }}</span>
              </div>
            </div>
          </article>
        </div>
        <div class="container" v-if="isClick===2">
          <article class="container-item" v-for="(item,index) in unsaleProduct" @click="goToWork(item)">
            <div class="cursor-pointer">
              <div class="item-show" :style="{'backgroundImage':'url('+ item.exhibition+')'}"></div>
              <div class="item-center">
                <article style="width: 60%;">
                  <p class="item-name">{{ item.artwork_name }}</p>
                  <p class="item-authorName">{{ item.author }}</p>
                </article>
              </div>
              <div class="item-tag">
                <img src="../assets/Product/selling.png" alt="">
                <span class="sale-text">{{ item.artwork_state }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import axios from "axios";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default {
  name: "Shopping",
  components:{Footer, Header},
  data(){
    return{
      menus:[
        {
          id:1,
          name:'我的喜欢',
          value:'我的喜欢',
          path:"/Shopping"
        },
        {
          id:2,
          name:'私人博物馆',
          value:'私人博物馆',
          path:"/PrivateMuseum"
        }
      ],
      sales:[
        {
          name:'全部',
          value:'全部'
        },
        {
          name:'出售中',
          value:'出售中'
        },
        {
          name:'已售罄',
          value:'已售罄'
        }
      ],
      loveProduct:[],
      product:[],
      test:'',
      saleProduct:[],
      unsaleProduct:[],
      color:'#e1fbe8',
      choose:0,
      isClick: 0
    }
  },
  mounted() {
    let that = this;
    let id=0;
    if(this.$store.state.userinfo===null){
      id=0;
    }else{
      id=this.$store.state.userinfo.id;
    }
    axios.get("http://localhost:8081/getGoods?id="+id).then(function (resp){
      that.product = resp.data;
      for(let i=0;i<that.product.length;i++){
        if(that.product[i].artwork_state === "出售中"){
          that.saleProduct.push(that.product[i])
        } else if(that.product[i].artwork_state ==="已售罄"){
          that.unsaleProduct.push(that.product[i])
        }
      }
    }).catch(function (error){
      console.log(error)
    })
    axios.get("http://localhost:8081/getLove?id="+id).then(function (resp){
      that.loveProduct = resp.data;
      for(let i=0;i<that.loveProduct.length;i++){
        if(that.loveProduct[i].work_id === null){
          that.loveProduct[i].work_id =0;
        }
      }
    })
  },
  methods:{
    clickMenu:function (index){
      this.choose = index;
    },
    clickSale:function (index){
      this.isClick = index;
    },
    goToWork(work) {
      console.log(work)
      if(work.work_id ===0){
        this.$router.push({
          name:"Artworks",
          params:{
            artworkId:work.artwork_id
          }
        });
      }else{
        this.$router.push({
          name:"Work",
          params:{
            workId:work.work_id
          }
        });
      }
    },
    pushShow(menu){
      this.$router.push(menu.path)
    }
  },
}
</script>

<style scoped>
.header >>> .headerRight .right #myLike{
  color:deepskyblue;
}

template{
  font-size: 100px;
}
.shopping{
  font-family: inherit;
  line-height: inherit;
  margin-top: 2rem;
}
.shopping .shopping-banner{
  background: #e0fbff;
  width: 100%;
  padding: 70px 50px 50px 0;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.shopping .shopping-banner .shopping-banner-main{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.shopping .shopping-banner .shopping-banner-main .logo{
  display: flex;
  margin-right: 20px;
  width:64px;
}
.shopping-banner-main .logo img{
  width: 64px;
  height: 64px;
}
.shopping-banner-main span{
  text-align: center;
  font-size: 14px;
}
.shopping-banner-main .content{
  flex-direction: column;
  display: flex;
}
.shopping-banner-main .content .font{
  font-size: 24px;
  font-weight: 600;
}
.shopping-main{
  width: 100%;
  padding: 3% 9%;
  display: flex;

}
.shopping-main .shopping-main-li{
  font-size: 14px;
  width: 14%;
  justify-content: flex-start;
  flex-direction: column;
  margin-right: 5%;
  display: flex;
}
.shopping-main-li .li-item{
  cursor: pointer;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 8px;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
  height: 40px;
  align-items: center;
  display: flex;
}
.change{
  background-color:#e1fbe8 ;
}
.li-item:focus{
  background: #e1fbe8;
}
.li-item .li-item-img{
  max-width: 22px;
  width: 20%;
}
.li-item-img img{
  max-width: 100%;
  height: auto;
  display: block;
  vertical-align: middle;
}
.li-item span{
  margin-left: 10px;
  font-size: 10px;
}
.shopping-main-content{
  min-height: 200px;
  width: 80%;
}
.shopping-main-content .content-title{
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;

}
.shopping-main-content .container{
  margin-left: -15px;
  margin-right: -15px;
  flex-wrap: wrap;
  display: flex;
}
.container-item{
  width: 33.333333%;
  padding: 15px;
}
.cursor-pointer{
  cursor: pointer;
  position: relative;
}
.item-show{
  margin-bottom: 8px;
  border-radius: 8px;
  width: 100%;
  overflow: hidden;
  position: relative;
  padding-bottom: 63.1%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: translate3d(0,0,0);
  background-image: url("../assets/Product/01.jpg");
}
.item-center{
  justify-content: space-between;
  align-items: center;
  display: flex;
}
.item-name{
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: rgba(0,0,0,.85);
  word-break: break-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.item-authorName{
  font-size: 12px;
  line-height: 22px;
  color: rgba(0,0,0,.45);
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
}
.item-tag{
  top: 12px;
  left: -7px;
  transform: scale(1);
  z-index: 10;
  position: absolute;
}
.item-tag img{
  width: 87px;
}
.sale-text{
  position: absolute;
  left: 30px;
  top: 0;
  font-size: 14px;
  height: 28px;
  line-height: 28px;
  font-weight: 600;
  color: #fff;
}
.menu-item{
  width: 328px;
  font-size: 16px;
  justify-content: space-between;
  align-items: center;
  display: flex;
}
.item-title{
  font-weight: 600;
  width: 100%;
  display: flex;
}
.title-all{
  cursor: pointer;
  position: relative;
}
.title-selected{
  position: relative;
}
.title-selected::after{
  position: absolute;
  content: '';
  width: 100%;
  bottom: -10px;
  left: 0;
  height: 4px;
  background: rgba(0,0,0,.8);
  border-radius: 2px;
}
</style>