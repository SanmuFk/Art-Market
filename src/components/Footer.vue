<template>
  <footer class="footer">
    <div class="footer_cont">
      <div class="footer_cont_div">
        <div class="footer_cont_div1">
          <div class="footer_cont_div1div">
            <img src="../assets/WorkImages/img1.jpg" class="footer_cont_div1div_img"/>
          </div>
          <a class="footer_cont_div1_a" href="#" target="_blank">
            <img src="../assets/footer/10009.png" alt="contact" class="footer_cont_div1_a_img" >
            VanGoghArt QR code
          </a>
        </div>
        <div class="footer_cont_div2"></div>
        <div class="footer_cont_div3">
          <a class="a1" href="#">
            <img src="../assets/footer/10010.png" alt="contact" class="footer_cont_div3a_img1"/>
            anna@vangoghart.com
          </a>
          <a class="a2" href="#">
            <img src="../assets/footer/10011.png" alt="contact" class="footer_cont_div3a_img2"/>
            VanGoghArt_Official
          </a>
          <a class="a3" href="#">
            <img src="../assets/footer/10012.png" alt="contact" class="footer_cont_div3a_img3"/>
            @VanGoghArt_Anna
          </a>
          <a class="a4" href="#" target="_blank">
            <img src="../assets/footer/10013.png" alt="contact" class="footer_cont_div3a_img4"/>
            VanGoghArt
          </a>
        </div>
        <div class="footer_cont_div4"></div>
        <a class="footer_cont_div_a" href="#" @click="to_Index">
          <img src="../assets/HeaderImages/header6.png" alt="logo" class="logo"/>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import {useRoute, useRouter} from "vue-router";

export default {
  name: "Footer",
  setup(){
    const route=useRoute()
    const router=useRouter()
    let to_Index=function (){
      router.push({
        path:'/Index'
      })
    }
    return{
      to_Index
    }
  }
}
</script>

<style scoped>
.footer{
  height: 12rem;
  background: #fff;
  padding: 0 6rem;
  color: rgba(0,0,0,.85);
  font-size: 14px;
  flex: 0 0 auto;
}
.footer_cont{
  width: 98%;
  height: 100%;
  border-top: 1px solid rgba(0,0,0,.1);
  justify-content: space-between;
  align-items: center;
  display: flex;
}
.footer_cont_div{
  width: 100%;
  font-size: 0.7rem;
  justify-content: space-between;
  align-items: center;
  display: flex;
}

.footer_cont_div1{
  align-items: center;
  display: flex;
}
.footer_cont_div1div{
  width: 4.7rem;
  margin-right: 0.8rem;
}
.footer_cont_div1div_img{
  width: 100%;
}
.footer_cont_div1_a{
  touch-action: manipulation;
  color: inherit;
  text-decoration: inherit;
}
.footer_cont_div1_a:hover{
  color:deepskyblue;
}
.footer_cont_div1_a_img{
  display: inline-block;
  width: 1.2rem;
  margin-right: 0.3rem;
}

.footer_cont_div2{
  height: 1.4rem;
  background: rgba(0,0,0,.1);
  width: 0.07rem;
}

.footer_cont_div3{
  justify-content: space-between;
  flex-wrap: wrap;
  display: flex;
}
.footer_cont_div3 a{
  margin-right: 0.5rem;
  color: inherit;
  text-decoration: inherit;
}
.footer_cont_div3 a:hover{
  color:deepskyblue;
}
.footer_cont_div3a_img1,.footer_cont_div3a_img2,.footer_cont_div3a_img3,.footer_cont_div3a_img4{
  display: inline-block;
  width: 1.2rem;
  margin-right: 0.3rem;
}

.footer_cont_div4{
  height: 1.4rem;
  background: rgba(0,0,0,.1);
  width: 0.06rem;
  margin: 0.01rem;
}
.footer_cont_div_a{
  width: 9rem;
  color: inherit;
  text-decoration: inherit;
  touch-action: manipulation
}
.logo{
  width: 100%;
}
</style>