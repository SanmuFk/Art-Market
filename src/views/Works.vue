<template>
  <Header />
  <div class="works">
   <section class="section2">
    <div class="" style="margin-top: 2.3rem;width: 100%" >
      <img style="width: 100%" src="https://artbingo.oss-cn-hongkong.aliyuncs.com/file/image/activity-banner-Pento-web-EN.png">
    </div>

    <div style="align-items: center;display: flex;justify-content: center;width: 100%;margin-bottom: 2rem">
      <el-table size="large" :data="filterTableData" :default-sort="{ prop: 'time', order: 'descending' }" stripe style="width: 87%" height="295">
        <el-table-column prop="workName" label="作品名称" width="250" />
        <el-table-column prop="time" label="成交时间" width="250" sortable/>
        <el-table-column prop="notesOwner" label="拥有者" width="250"/>
        <el-table-column prop="notesPrice" label="价格"  width="150"/>
        <el-table-column align="right">
          <template #header>
            <el-input v-model="search" size="small" placeholder="Search by name" />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="main">
      <div class="main_div1">
        <section class="main_div1_section1">
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="所有作品" name="first">

            </el-tab-pane>
            <el-tab-pane label="绘画" name="second">

            </el-tab-pane>
            <el-tab-pane label="古玩" name="third">

            </el-tab-pane>
            <el-tab-pane label="音乐·视频" name="fourth">

            </el-tab-pane>
          </el-tabs>
        </section>

        <section class="main_div1_section2">
          <div class="search" style="margin-right: 2rem">
            <el-row :gutter="20">
              <el-input v-model="input" class="w-50 m-2" placeholder="搜索" style="margin-top:0.5rem ">
                <template #prefix>
                  <el-icon class="el-input__icon" ><search /></el-icon>
                </template>
              </el-input>
            </el-row>
          </div>
          <div class="div_nav" style="margin-top: 0.3rem">
            <nav>
              <div class="el-menu-item" href="#" ><el-dropdown>
                    <span class="el-dropdown-link" >
                      所有样式
                      <el-icon class="icon--bottom" :size="17" ><caret-bottom /></el-icon>
                    </span>
              </el-dropdown>
              </div>
              <div class="el-menu-item" href="#">
                <el-dropdown>
                    <span class="el-dropdown-link" >
                      默认排序
                      <el-icon class="icon--bottom" :size="17" ><caret-bottom /></el-icon>
                    </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>默认排序</el-dropdown-item>
                      <el-dropdown-item>价格ASC</el-dropdown-item>
                      <el-dropdown-item>价格统计</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
              <div class="el-menu-item" href="#">
                <el-dropdown>
                    <span class="el-dropdown-link" >
                      全部
                      <el-icon class="icon--bottom" :size="17" ><caret-bottom /></el-icon>
                    </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>全部</el-dropdown-item>
                      <el-dropdown-item>贩卖</el-dropdown-item>
                      <el-dropdown-item>出售</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </nav>
          </div>
        </section>
      </div>

      <div class="main_div2">
        <article class="article1" style="width: 33.3%;">
          <div class="_div">
            <div class="article1_div_div1"></div>
            <div class="_div_div2">
              <article style="width: 60%">
                <p class="p1" style="">
                  <font style="vertical-align: inherit;">Pento00085</font>
                </p>
                <p class="p2">
                  <font style="vertical-align: inherit;">PentoDAO</font>
                </p>
              </article>
              <div style="display: flex;flex-direction: column;align-items: flex-end;">
                <p style="color: rgba(0,0,0,.65);font-size: 0.7rem;
                 word-break: break-all;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" class="">
                  <font style="vertical-align: inherit;">230 美元</font>
                </p>
                <div style="width: 1.4rem;height:1.5rem;position: relative;"  >
                  <a class="_div_div2_a" :style="{ backgroundImage: `url(${backgroundImage})` }" @click="changeImage"></a>
                </div>
              </div>
            </div>
            <div class="_div_div3">
              <img src="../assets/MarketImages/10002.png" style="width: 3rem;height:2rem;"/>
              <span class="_div_div3_span" >
               <font style="vertical-align: inherit;">销售</font>
               </span>
            </div>
          </div>
        </article >

        <article class="article2" style="width: 33.3%;">
          <div class="_div">
            <div class="article2_div_div1" @click="to_Work"></div>
            <div class="_div_div2">
              <article style="width: 60%" @click="to_Work">
                <p class="p1" style="">
                  <font style="vertical-align: inherit;">Pento00097</font>
                </p>
                <p class="p2">
                  <font style="vertical-align: inherit;">PentoDAO</font>
                </p>
              </article>
              <div style="display: flex;flex-direction: column;align-items: flex-end;">
                <p style="color: rgba(0,0,0,.65);font-size: 0.7rem;
                 word-break: break-all;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" class="" @click="to_Work">
                  <font style="vertical-align: inherit;">250 美元</font>
                </p>
                <div style="width: 1.4rem;height:1.5rem;position: relative;"  >
                  <a class="_div_div2_a" :style="{ backgroundImage: `url(${backgroundImage})` }" @click="changeImage"></a>
                </div>
              </div>
            </div>
            <div class="_div_div3" @click="to_Work">
              <img src="../assets/MarketImages/10002.png" style="width: 3rem;height:2rem"/>
              <span class="_div_div3_span" >
               <font style="vertical-align: inherit;">销售</font>
               </span>
            </div>
          </div>
        </article>

        <article class="article3" style="width: 33.3%;">
          <div class="_div">
            <div class="article3_div_div1" @click="to_Work"></div>
            <div class="_div_div2">
              <article style="width: 60%" @click="to_Work">
                <p class="p1" style="">
                  <font style="vertical-align: inherit;">Pento00107</font>
                </p>
                <p class="p2">
                  <font style="vertical-align: inherit;">PentoDAO</font>
                </p>
              </article>
              <div style="display: flex;flex-direction: column;align-items: flex-end;">
                <p style="color: rgba(0,0,0,.65);font-size: 0.7rem;
                 word-break: break-all;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" class="" @click="to_Work">
                  <font style="vertical-align: inherit;">188 美元</font>
                </p>
                <div style="width: 1.4rem;height:1.5rem;position: relative;"  >
                  <a class="article3_div_div2_a" :style="{ backgroundImage: `url(${backgroundImage})` }" @click="changeImage"></a>
                </div>
              </div>
            </div>
            <div class="_div_div3" @click="to_Work">
              <img src="../assets/MarketImages/10002.png" style="width: 3rem;height:2rem"/>
              <span class="_div_div3_span" >
               <font style="vertical-align: inherit;">销售</font>
               </span>
            </div>
          </div>
        </article>

        <article class="article4" style="width: 33.3%;">
          <div class="_div">
            <div class="article4_div_div1" @click="to_Work"></div>
            <div class="_div_div2">
              <article style="width: 60%" @click="to_Work">
                <p class="p1" style="">
                  <font style="vertical-align: inherit;">《丰塞卡·嘉志远》合集</font>
                </p>
                <p class="p2">
                  <font style="vertical-align: inherit;">迷野</font>
                </p>
              </article>
              <div style="display: flex;flex-direction: column;align-items: flex-end;">
                <p style="color: rgba(0,0,0,.65);font-size: 0.7rem;
                 word-break: break-all;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" class="" @click="to_Work">
                  <font style="vertical-align: inherit;">50 美元</font>
                </p>
                <div style="width: 1.4rem;height:1.5rem;position: relative;"  >
                  <a class="_div_div2_a" :style="{ backgroundImage: `url(${backgroundImage})` }" @click="changeImage"></a>
                </div>
              </div>
            </div>
            <div class="_div_div3" @click="to_Work">
              <img src="../assets/MarketImages/10002.png" style="width: 3rem;height:2rem"/>
              <span class="_div_div3_span" >
               <font style="vertical-align: inherit;">销售</font>
               </span>
            </div>
          </div>
        </article>

        <article class="article5" style="width: 33.3%;">
          <div class="_div">
            <div class="article5_div_div1" @click="to_Work"></div>
            <div class="_div_div2">
              <article style="width: 60%" @click="to_Work">
                <p class="p1" style="">
                  <font style="vertical-align: inherit;">《等待乐高》合集</font>
                </p>
                <p class="p2">
                  <font style="vertical-align: inherit;">迷野</font>
                </p>
              </article>
              <div style="display: flex;flex-direction: column;align-items: flex-end;">
                <p style="color: rgba(0,0,0,.65);font-size: 0.7rem;
                 word-break: break-all;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" class="" @click="to_Work">
                  <font style="vertical-align: inherit;">50 美元</font>
                </p>
                <div style="width: 1.4rem;height:1.5rem;position: relative;"  >
                  <a class="_div_div2_a" :style="{ backgroundImage: `url(${backgroundImage})` }" @click="changeImage"></a>
                </div>
              </div>
            </div>
            <div class="_div_div3" @click="to_Work">
              <img src="../assets/MarketImages/10002.png" style="width: 3rem;height:2rem"/>
              <span class="_div_div3_span" >
               <font style="vertical-align: inherit;">销售</font>
               </span>
            </div>
          </div>
        </article>

        <article class="article6" style="width: 33.3%;">
          <div class="_div">
            <div class="article6_div_div1" @click="to_Work"></div>
            <div class="_div_div2">
              <article style="width: 60%" @click="to_Work">
                <p class="p1" style="">
                  <font style="vertical-align: inherit;">《MY WITCH》合集</font>
                </p>
                <p class="p2">
                  <font style="vertical-align: inherit;">迷野</font>
                </p>
              </article>
              <div style="display: flex;flex-direction: column;align-items: flex-end;">
                <p style="color: rgba(0,0,0,.65);font-size: 0.7rem;
                 word-break: break-all;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" class="" @click="to_Work">
                  <font style="vertical-align: inherit;">50 美元</font>
                </p>
                <div style="width: 1.4rem;height:1.5rem;position: relative;"  >
                  <a class="_div_div2_a" :style="{ backgroundImage: `url(${backgroundImage})` }" @click="changeImage"></a>
                </div>
              </div>
            </div>
            <div class="_div_div3" @click="to_Work">
              <img src="../assets/MarketImages/10002.png" style="width: 3rem;height:2rem"/>
              <span class="_div_div3_span" >
               <font style="vertical-align: inherit;">销售</font>
               </span>
            </div>
          </div>
        </article>

        <article class="article7" style="width: 33.3%;">
          <div class="_div">
            <div class="article7_div_div1" @click="to_Work"></div>
            <div class="_div_div2">
              <article style="width: 60%" @click="to_Work">
                <p class="p1" style="">
                  <font style="vertical-align: inherit;">《有为的青春》合集</font>
                </p>
                <p class="p2">
                  <font style="vertical-align: inherit;">迷野</font>
                </p>
              </article>
              <div style="display: flex;flex-direction: column;align-items: flex-end;">
                <p style="color: rgba(0,0,0,.65);font-size: 0.7rem;
                 word-break: break-all;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" class="" @click="to_Work">
                  <font style="vertical-align: inherit;">50 美元</font>
                </p>
                <div style="width: 1.4rem;height:1.5rem;position: relative;"  >
                  <a class="_div_div2_a" :style="{ backgroundImage: `url(${backgroundImage})` }" @click="changeImage"></a>
                </div>
              </div>
            </div>
            <div class="_div_div3" @click="to_Work">
              <img src="../assets/MarketImages/10002.png" style="width: 3rem;height:2rem"/>
              <span class="_div_div3_span" >
               <font style="vertical-align: inherit;">销售</font>
               </span>
            </div>
          </div>
        </article>

        <article class="article8" style="width: 33.3%;">
          <div class="_div">
            <div class="article8_div_div1" @click="to_Work"></div>
            <div class="_div_div2">
              <article style="width: 60%" @click="to_Work">
                <p class="p1" style="">
                  <font style="vertical-align: inherit;">鸾凤</font>
                </p>
                <p class="p2">
                  <font style="vertical-align: inherit;">迷野</font>
                </p>
              </article>
              <div style="display: flex;flex-direction: column;align-items: flex-end;">
                <p style="color: rgba(0,0,0,.65);font-size: 0.7rem;
                 word-break: break-all;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" class="" @click="to_Work">
                  <font style="vertical-align: inherit;">50 美元</font>
                </p>
                <div style="width: 1.4rem;height:1.5rem;position: relative;"  >
                  <a class="_div_div2_a" :style="{ backgroundImage: `url(${backgroundImage})` }" @click="changeImage"></a>
                </div>
              </div>
            </div>
            <div class="_div_div3" @click="to_Work">
              <img src="../assets/MarketImages/10002.png" style="width: 3rem;height:2rem"/>
              <span class="_div_div3_span" >
               <font style="vertical-align: inherit;">销售</font>
               </span>
            </div>
          </div>
        </article>

        <article class="article9" style="width: 33.3%;">
          <div class="_div">
            <div class="article9_div_div1" @click="to_Work"></div>
            <div class="_div_div2">
              <article style="width: 60%" @click="to_Work">
                <p class="p1" style="">
                  <font style="vertical-align: inherit;">尊龙</font>
                </p>
                <p class="p2">
                  <font style="vertical-align: inherit;">迷野</font>
                </p>
              </article>
              <div style="display: flex;flex-direction: column;align-items: flex-end;">
                <p style="color: rgba(0,0,0,.65);font-size: 0.7rem;
                 word-break: break-all;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" class="" @click="to_Work">
                  <font style="vertical-align: inherit;">60 美元</font>
                </p>
                <div style="width: 1.4rem;height:1.5rem;position: relative;"  >
                  <a class="_div_div2_a" :style="{ backgroundImage: `url(${backgroundImage})` }" @click="changeImage"></a>
                </div>
              </div>
            </div>
            <div class="_div_div3" @click="to_Work">
              <img src="../assets/MarketImages/10001.png" style="width: 3rem;height:2rem"/>
              <span class="_div_div3_span" >
               <font style="vertical-align: inherit;">已卖</font>
               </span>
            </div>
          </div>
        </article>

        <article class="article10" style="width: 33.3%;">
          <div class="_div">
            <div class="article10_div_div1" @click="to_Work"></div>
            <div class="_div_div2">
              <article style="width: 60%" @click="to_Work">
                <p class="p1" style="">
                  <font style="vertical-align: inherit;">开普狮纪念币</font>
                </p>
                <p class="p2">
                  <font style="vertical-align: inherit;">陈先生</font>
                </p>
              </article>
              <div style="display: flex;flex-direction: column;align-items: flex-end;">
                <p style="color: rgba(0,0,0,.65);font-size: 0.7rem;
                 word-break: break-all;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" class="" @click="to_Work">
                  <font style="vertical-align: inherit;">888 美元</font>
                </p>
                <div style="width: 1.4rem;height:1.5rem;position: relative;"  >
                  <a class="_div_div2_a" :style="{ backgroundImage: `url(${backgroundImage})` }" @click="changeImage"></a>
                </div>
              </div>
            </div>
            <div class="_div_div3" @click="to_Work">
              <img src="../assets/MarketImages/10002.png" style="width: 3rem;height:2rem"/>
              <span class="_div_div3_span" >
               <font style="vertical-align: inherit;">销售</font>
               </span>
            </div>
          </div>
        </article>

        <article class="article11" style="width: 33.3%;">
          <div class="_div">
            <div class="article11_div_div1" @click="to_Work"></div>
            <div class="_div_div2">
              <article style="width: 60%" @click="to_Work">
                <p class="p1" style="">
                  <font style="vertical-align: inherit;">闹腾彭与莉莉安-靓女莉莉安</font>
                </p>
                <p class="p2">
                  <font style="vertical-align: inherit;">易礼然</font>
                </p>
              </article>
              <div style="display: flex;flex-direction: column;align-items: flex-end;">
                <p style="color: rgba(0,0,0,.65);font-size: 0.7rem;
                 word-break: break-all;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" class="" @click="to_Work">
                  <font style="vertical-align: inherit;">58 美元</font>
                </p>
                <div style="width: 1.4rem;height:1.5rem;position: relative;"  >
                  <a class="_div_div2_a" :style="{ backgroundImage: `url(${backgroundImage})` }" @click="changeImage"></a>
                </div>
              </div>
            </div>
            <div class="_div_div3" @click="to_Work">
              <img src="../assets/MarketImages/10002.png" style="width: 3rem;height:2rem"/>
              <span class="_div_div3_span" >
               <font style="vertical-align: inherit;">销售</font>
               </span>
            </div>
          </div>
        </article>

        <article class="article12" style="width: 33.3%;">
          <div class="_div">
            <div class="article12_div_div1" @click="to_Work"></div>
            <div class="_div_div2">
              <article style="width: 60%" @click="to_Work">
                <p class="p1" style="">
                  <font style="vertical-align: inherit;">星晴&amp;敦煌之十六</font>
                </p>
                <p class="p2">
                  <font style="vertical-align: inherit;">星晴</font>
                </p>
              </article>
              <div style="display: flex;flex-direction: column;align-items: flex-end;">
                <p style="color: rgba(0,0,0,.65);font-size: 0.7rem;
                 word-break: break-all;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" class="" @click="to_Work">
                  <font style="vertical-align: inherit;">1888 美元</font>
                </p>
                <div style="width: 1.4rem;height:1.5rem;position: relative;"  >
                  <a class="_div_div2_a" :style="{ backgroundImage: `url(${backgroundImage2})` }" @click="changeImage2"></a>
                </div>
              </div>
            </div>
            <div class="_div_div3" @click="to_Work">
              <img src="../assets/MarketImages/10002.png" style="width: 3rem;height:2rem"/>
              <span class="_div_div3_span" >
               <font style="vertical-align: inherit;">销售</font>
               </span>
            </div>
          </div>
        </article>

        <div style="align-items: center;display: flex;justify-content: center;width: 100%;margin-bottom: 2rem">
          <el-pagination small background layout="prev, pager, next" :total="500" />
        </div>


      </div>
    </div>
<!--     <button @click="show">你好</button>-->
   </section>

  </div>
  <Footer/>
</template>

<script>
import Header from "@/components/Header";
import {reactive,ref,computed} from  "vue"
import Footer from "@/components/Footer";
import {useRoute, useRouter} from "vue-router";
import bg1 from "../assets/MarketImages/10007.png";
import bg2 from "../assets/MarketImages/10007_2.png";
import request from "@/utils/request";

export default {
  name: "Works",
  components:{Footer, Header},
  setup(){
    let images=reactive([
      {title:"",path:require('../assets/MarketImages/10003.png'),key:1},
      {title:"",path:require('../assets/MarketImages/10004.png'),key:1},
      {title:"",path:require('../assets/MarketImages/10005.jpg'),key:1},
      {title:"",path:require('../assets/MarketImages/10006.jpg'),key:1},
    ])
    const activeName = ref('first')
    const handleClick = (tab, event) => {
      console.log(tab, event)}
    const input = ref('')

    const filterTableData = computed(() =>
        tableData.filter(
            (data) =>
                !search.value ||
                data.name.toLowerCase().includes(search.value.toLowerCase())
        )
    )
    const tableData = reactive([

    ])
    const search = ref('')

    const route=useRoute()
    const router=useRouter()
    let to_Work=function (){
      router.push({
        path:'/Works/:workId/Work'
      })
    }

    let backgroundImage=ref(bg1)
    let backgroundImage2=ref(bg1)
    const changeImage = () => {
      if(backgroundImage.value === bg1){
        backgroundImage.value = bg2;
      }else{
        backgroundImage.value = bg1;
      }
    }

    const changeImage2 = () => {
      if(backgroundImage2.value === bg1){
        backgroundImage2.value = bg2;
      }else{
        backgroundImage2.value = bg1;
      }
    }

   function show(){
     request.get("/notes").then(res=>{
       console.log("nnn")
     })
   }

    return{
      images,
      activeName,
      handleClick,
      input,
      tableData,
      search,
      filterTableData,
      to_Work,
      backgroundImage,
      changeImage,
      backgroundImage2,
      changeImage2,
      show
    }
  }
}
</script>

<style scoped>
.section2{
  width: 100%;
  justify-content: center;
  align-items: center;

  background-color:  white;
}

.main{
  background-color: white;

  padding: 0 6.5rem;
}
.main_div1{
  justify-content: space-between;

  flex-wrap: wrap;

  display: flex;
  height: 60px;
  /* margin-bottom: 1rem;*/
  margin-top: 0.5rem;


}
.main_div1_section1{
  width: auto;

  align-items: center;

  display: flex;
}
/*.demo-tabs{
  stretch:true;
}*/
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.main_div1_section2{
  display: flex;
  margin-top: 0.05rem;

  width: auto;
}
nav {
  display: flex;
  align-items: center;
  justify-content: center;
}
nav .el-menu-item {
  padding: 10px;
  /*position: relative;*/
  text-align: center;
  border-bottom: transparent;
  display: flex;
  transition: 0.4s;

  color: rgba(0,0,0,.65);
  /*font-weight: 700;*/

  align-items: center;
}
nav .el-menu-item:hover {
  color:deepskyblue;
  /*  border-bottom: solid 6px;*/
  /*border-bottom-color: rgba(255,255,255,0);
  height: 80px;*/
}

/*.icon--bottom{
  size:1rem;
}*/
.el-dropdown-link {
  cursor: pointer;
  /*color: var(--el-color-primary);*/
  display: flex;
  align-items: center;

  font-size:1em;
  /*font-weight: 700;*/
}
.el-dropdown-link:hover{
  color:deepskyblue;
  /* transform: rotate(180deg);*/
}

.main_div2{
  margin-left: -0.15rem;
  margin-right: -0.15rem;

  /*padding-right: 2rem;*/
  justify-content: space-between;

  flex-wrap: wrap;

  display: flex;

}

article img{
  /*!/设置缩放比例*/
  transform:scaleX(1.7);
}
.article1,.article2,.article3,.article4,.article5,.article6,.article7,.article8,.article9,.article10,.article11,.article12{
  padding: 0.15rem;
  margin-bottom: 1.6rem;
}
._div{
  cursor: pointer;
  position: relative;
}
.article1_div_div1{
  background-image: url("http://artbingo.oss-cn-hongkong.aliyuncs.com/file/image/Pento00111.png?x-oss-process=image/resize,l_1024,m_mfit");

  /*margin-bottom: 0.8rem;*/
  border-radius: 0.8rem;
  width: 95%;
  padding-bottom: 60%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: translate3d(0,0,0);

  overflow: hidden;

  position: relative;
}
._div_div2{
  justify-content: space-between;
  margin-top: 0.5rem;
  align-items: center;
  width: 95%;
  display: flex;
}
.p1{
  font-weight: 600;
  font-size: 0.8rem;
  line-height: 1.2rem;
  color: rgba(0,0,0,.85);

  word-break: break-all;

  white-space: nowrap;

  text-overflow: ellipsis;

  overflow: hidden;

}
.p2{
  font-size: 0.7rem;
  line-height: 1.2rem;
  color: rgba(0,0,0,.45);

  word-break: break-all;

  white-space: nowrap;

  text-overflow: ellipsis;

  overflow: hidden;
}
._div_div2_a {
  width: 100%;
  height: 100%;
  display: inline-block;

  background-repeat: no-repeat;

  background-position: center;

  background-size: contain;
}
._div_div2_a:hover{
  text-decoration: none;
  outline: 0;

  color: #27f289;

}
._div_div3{
  top: 0.7rem;
  left:0.6rem;
  transform: scale(1);

  transform-origin: left top;

  z-index: 10;

  position: absolute;
}
._div_div3_span{
  position: absolute;
  left: 10px;
  top: 0;
  font-size: 14px;
  height: 25px;
  width: 3rem;
  line-height: 25px;
  font-weight: 600;
  color: #fff;
}

.article2_div_div1{
  background-image: url("http://artbingo.oss-cn-hongkong.aliyuncs.com/file/image/Pento06075.png?x-oss-process=image/resize,l_1024,m_mfit");

  /*margin-bottom: 0.8rem;*/
  border-radius: 0.8rem;
  width: 95%;
  padding-bottom: 60%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: translate3d(0,0,0);

  overflow: hidden;

  position: relative;
}

.article3_div_div1{
  background-image: url("http://artbingo.oss-cn-hongkong.aliyuncs.com/file/image/Pento06030.png?x-oss-process=image/resize,l_1024,m_mfit");

  /*margin-bottom: 0.8rem;*/
  border-radius: 0.8rem;
  width: 95%;
  padding-bottom: 60%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: translate3d(0,0,0);

  overflow: hidden;

  position: relative;
}

.article4_div_div1{
  background-image: url("http://artbingo.oss-cn-hongkong.aliyuncs.com/file/image/Pento00017.png?x-oss-process=image/resize,l_1024,m_mfit");

  /*margin-bottom: 0.8rem;*/
  border-radius: 0.8rem;
  width: 95%;
  padding-bottom: 60%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: translate3d(0,0,0);

  overflow: hidden;

  position: relative;
}

.article5_div_div1{
  background-image: url("http://artbingo.oss-cn-hongkong.aliyuncs.com/file/image/Pento00048.png?x-oss-process=image/resize,l_1024,m_mfit");

  /*margin-bottom: 0.8rem;*/
  border-radius: 0.8rem;
  width: 95%;
  padding-bottom: 60%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: translate3d(0,0,0);

  overflow: hidden;

  position: relative;
}

.article6_div_div1{
  background-image: url("http://artbingo.oss-cn-hongkong.aliyuncs.com/file/image/Pento00072.png?x-oss-process=image/resize,l_1024,m_mfit");

  /*margin-bottom: 0.8rem;*/
  border-radius: 0.8rem;
  width: 95%;
  padding-bottom: 60%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: translate3d(0,0,0);

  overflow: hidden;

  position: relative;
}

.article7_div_div1{
  background-image: url("http://artbingo.oss-cn-hongkong.aliyuncs.com/file/image/Pento00075.png?x-oss-process=image/resize,l_1024,m_mfit");

  /*margin-bottom: 0.8rem;*/
  border-radius: 0.8rem;
  width: 95%;
  padding-bottom: 60%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: translate3d(0,0,0);

  overflow: hidden;

  position: relative;
}

.article8_div_div1{
  background-image: url("http://artbingo.oss-cn-hongkong.aliyuncs.com/file/image/Pento00135.png?x-oss-process=image/resize,l_1024,m_mfit");

  /*margin-bottom: 0.8rem;*/
  border-radius: 0.8rem;
  width: 95%;
  padding-bottom: 60%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: translate3d(0,0,0);

  overflow: hidden;

  position: relative;
}

.article9_div_div1{
  background-image: url("http://artbingo.oss-cn-hongkong.aliyuncs.com/file/image/Pento06011.png?x-oss-process=image/resize,l_1024,m_mfit");

  /*margin-bottom: 0.8rem;*/
  border-radius: 0.8rem;
  width: 95%;
  padding-bottom: 60%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: translate3d(0,0,0);

  overflow: hidden;

  position: relative;
}

.article10_div_div1{
  background-image: url("http://artbingo.oss-cn-hongkong.aliyuncs.com/file/image/Pento06014.png?x-oss-process=image/resize,l_1024,m_mfit");

  /*margin-bottom: 0.8rem;*/
  border-radius: 0.8rem;
  width: 95%;
  padding-bottom: 60%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: translate3d(0,0,0);

  overflow: hidden;

  position: relative;
}

.article11_div_div1{
  background-image: url("http://artbingo.oss-cn-hongkong.aliyuncs.com/file/image/Pento06017.png?x-oss-process=image/resize,l_1024,m_mfit");

  /*margin-bottom: 0.8rem;*/
  border-radius: 0.8rem;
  width: 95%;
  padding-bottom: 60%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: translate3d(0,0,0);

  overflow: hidden;

  position: relative;
}

.article12_div_div1{
  background-image: url("http://artbingo.oss-cn-hongkong.aliyuncs.com/file/image/Pento06020.png?x-oss-process=image/resize,l_1024,m_mfit");

  /*margin-bottom: 0.8rem;*/
  border-radius: 0.8rem;
  width: 95%;
  padding-bottom: 60%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: translate3d(0,0,0);

  overflow: hidden;

  position: relative;
}

</style>