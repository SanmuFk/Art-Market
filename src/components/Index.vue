<template>
  <Header />
  <div class="Index">
  <section class="section2">
    <div>
      <div class="home">
        <div class="first">
          <div class="first_1">
            <div class="first_1_contain">
              <img :src="imgs1.Image" alt="frame" @click="changeImage"/>
              <img :src="imgs2.Image" class="first_1_contain_img2" @click="changeImage"/>
            </div>
          </div>
          <div class="first_2">
            <img src="../assets/first/10004_2.png" class="first_2_img"/>
            <p class="first_2_p">赶紧注册充满色彩的 Van Gogh Art</p>
            <a class="first_2_a" @click="to_ArtsMarket">
              <img src="../assets/first/10005.png" class=""/>
            </a>
          </div>
        </div>

        <div class="second">
          <div class="second_1">
                 <el-carousel :interval="2000" type="card" height="300px" trigger="click">
                   <el-carousel-item v-for="item in images" :key="item">
                     <img :src="item.path" style="height: 100%;width: 100%"/>
                   </el-carousel-item>
                 </el-carousel>
          </div>

          <div class="second_2">
            <img src="../assets/second/img.png" class="second_2_img1" style="width: 23.2rem;"/>
            <h3 class="second_2_h3">What is Van Gogh Art?</h3>
            <p class="second_2_p">Van Gogh Art 使用区块链 NFT 技术使得平台上的数字艺术拥有了所有权，从而具有了收藏价值，吸引和汇聚了全球高质量收藏家，为平台创作者提供了良好的创作环境。平台客户通过平台进行数字艺术创建、销售、购买、收藏等动作。目前 Van Gogh Art 上的每一件数字艺术作品均经过作者亲自确认，保证独一无二。</p>
            <img src="../assets/second/10007.png" class="second_2_img2" style="width: 20.2rem;"/>
            <h3 class="second_2_h3_2">How to create a NFT?</h3>
            <p class="second_2_p_2">Van Gogh Art 要求每位创作者上传的作品均为原创，且上传后不得在其他平台再次销售。</p>
            <a class="second_2_a" @click="to_Create">
              <img src="../assets/second/10008.png" class="second_2_a_img">
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
  <Footer/>
</template>

<script>
import {reactive} from "vue";
import Footer from "@/components/Footer";
import {useRouter} from "vue-router";
import Header from "@/components/Header";
import img1_1 from "../assets/first/10002.png"
import img1_2 from "../assets/first/10002_2.png"
import img1_3 from "../assets/first/10002_3.png"
import img1_4 from "../assets/first/10002_4.png"
import img1_5 from "../assets/first/10002_5.png"

import img2_1 from "../assets/first/10003.png"
import img2_2 from "../assets/first/10003_2.png"
import img2_3 from "../assets/first/10003_3.png"
import img2_4 from "../assets/first/10003_4.png"
import img2_5 from "../assets/first/10003_5.png"
import img2_6 from "../assets/first/10003_6.png"

export default {
  name: "Index",
  components:{Footer,Header},

  setup(){
    //走马灯的图片数组
    let images=reactive([
      {title:"",path:require('../assets/IndexImages/img_1.png'),key:1},
      {title:"",path:require('../assets/IndexImages/img_12.png'),key:2},
      {title:"",path:require('../assets/IndexImages/img_2.png'),key:3},
      {title:"",path:require('../assets/IndexImages/img.png'),key:4},
      {title:"",path:require('../assets/IndexImages/img_4.png'),key:5},
      {title:"",path:require('../assets/IndexImages/img_5.png'),key:6},
      {title:"",path:require('../assets/IndexImages/img_6.png'),key:7},
      {title:"",path:require('../assets/IndexImages/img_8.png'),key:8},
      {title:"",path:require('../assets/IndexImages/img_7.png'),key:9},
      {title:"",path:require('../assets/IndexImages/img_9.png'),key:10},
      {title:"",path:require('../assets/IndexImages/img_10.png'),key:11},
      {title:"",path:require('../assets/IndexImages/img_11.png'),key:12},
    ])

    //相框图片数组
    const imgs1= reactive({
      Image:img1_1,
      // 把所有图片放到数组，用于获取下标来获取图片
      imgs: [img1_1, img1_2,img1_3,img1_4,img1_5],
    });
    //相片图片数组
    const imgs2= reactive({
      Image:img2_1,
      // 把所有图片放到数组，用于获取下标来获取图片
      imgs: [img2_1, img2_2, img2_3, img2_4, img2_5, img2_6],
    });
    // 点击切换图片
    const changeImage = () => {
      // 随机一个整数，Math.random()*4是随机0到4的整数
      let name1 = Math.round(Math.random() * 4);
      // 把随机的图片重新放到Image
      imgs1.Image = imgs1.imgs[name1];

      // 随机一个整数，Math.random()*4是随机0到5的整数
      let name2 = Math.round(Math.random() * 5);
      // 把随机的图片重新放到Image
      imgs2.Image = imgs2.imgs[name2];
    };

    //路由跳转（跳转到作品创作界面）
    const router=useRouter()
    let to_Create=function (){
      router.push({
        path:'/Create'
      })
    }
    let to_ArtsMarket=function (){
      router.push({
        path:'/ArtsMarket'
      })
    }

    return{
      images,
      imgs1,
      imgs2,
      changeImage,
      to_Create,
      to_ArtsMarket
    }
  }
}
</script>

<style scoped>
.section2 {
  min-height: calc(100vh - 0.8rem - 2rem);

  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  flex: auto;
  flex-direction: column;
}

.home {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));

  box-sizing: border-box
}

.first {
  width: 100%;
  height: 95vh;
  display: flex;
  flex-direction: column;
  padding-top: 0.8rem;
}

.first_1 {
  background-position: center;
  background-size: cover;
  background-image: url("../assets/first/10020.jpg");
  background-position-y: bottom;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  height: 65%;
  padding-top: 4rem;
  display: flex;
}

.first_1_contain {
  padding-top: 1.5rem;
  position: relative;
  display: inline-block;
  height:100%;
  max-width: 38%;
}
.first_1_contain_img2{
  top: 1.5rem;
  right: 0;
  bottom:0;
  left: 0;
  position: absolute;
}

.first_2 {
  align-items: center;
  flex-direction: column;
  height: 35%;
  display: flex;
}

.first_2_img {
  width: 33rem;
  margin-bottom: 1.6rem;
}

.first_2_p {
  margin-bottom: 1.6rem;
  font-size: 1.1rem;
  color: rgba(0, 0, 0, 0.65);
  letter-spacing: 0.1rem;
}

.first_2_a {
  height: 1.5rem;
  min-width: 20rem;
  padding: 2rem 0rem;
  cursor:pointer;
  line-height: .64rem;
  border-radius: 3.2rem;
  background-color: #00e676;
  box-shadow: 12px 12px 24px rgba(0 ,230 ,118,0.2), -12px 12px 24px rgba(132,255 ,255,0.2);
  justify-content: center;
  align-items: center;
  display: flex;
}

.first_2_a img {
  width: auto;
  height: 1.6rem;
}

.second{
  padding-left: 0.24rem;
  padding-right: 0.24rem;
  margin: auto;
  max-width: 72%;
}

.second_1{
  padding-top: 5rem;
  padding-bottom: 5rem;
  width: 100%;

  position: relative;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}

.second_2{
  background-image: url("../assets/second/10021.jpg");
  background-position: center;
  background-size:contain;
  background-repeat: no-repeat;
  /*  //为什么这个两个影响了div的大小*/
  /*padding-bottom: 0.3rem;
  padding-top: 0.3rem;*/
  width: 100%;
  height: 100%;

  align-items: center;

  flex-direction: column;

  display: flex;
}
.second_2_img1{
  margin-bottom: 1.8rem;
}
.second_2_h3{
  font-size: 1.4rem;
  color: rgba(0,0,0,.85);
  font-weight:bold;
  margin-bottom: 2rem;
}
.second_2_p{
  line-height: 1.3rem;
  font-size: 1rem;
  color: rgba(0,0,0,.65);
  padding-left: 0;
  padding-right: 0;
  margin-bottom: 7rem;
}
.second_2_img2{
  margin-bottom: 1.2rem;
}
.second_2_h3_2{
  font-size: 1.6rem;
  color: rgba(0,0,0,.85);
  font-weight: 600;
  margin-bottom: 2rem;
}
.second_2_p_2{
  line-height: 1.3rem;
  font-size: 1rem;
  color: rgba(0,0,0,.65);
  padding-left: 0;
  padding-right: 0;
  margin-bottom: 2rem;
}
.second_2_a{
  min-width: 19rem;
  height: 3rem;
  line-height: .64rem;
  border-radius: 3.2rem;
  background-color: #00e676;
  box-shadow: 12px 12px 24px rgba(0,230, 118,0.2), -12px 12px 24px rgba(132 ,255 ,255,0.2);
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 3.5rem;
  padding: 1.7rem 0rem;
}
.second_2_a_img{
  width: auto;
  height: 1.6rem;
}

</style>