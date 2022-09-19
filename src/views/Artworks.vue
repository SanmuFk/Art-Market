<template>
  <Header />
  <div class="works">
    <section class="section2">

      <div class="" style="margin-top: 2.3rem;width: 100%" >
        <img style="width: 100%" :src="advertisement">
      </div>

      <div style="align-items: center;display: flex;justify-content: center;width: 100%;margin-bottom: 2rem">
        <el-table size="large" :data="filterTableData" :default-sort="{ prop: 'time', order: 'descending' }" stripe style="width: 87%;margin-top: 1.6rem" height="295">
          <el-table-column prop="notesWorkname" label="作品名称" width="250" />
          <el-table-column prop="time" label="成交时间" width="250" sortable/>
          <el-table-column prop="notesOwner" label="拥有者" width="250"/>
          <el-table-column prop="notesPrice" label="价格"  width="150"/>
          <el-table-column align="right">
            <template #header>
              <el-input v-model="search" size="small" placeholder="Search by workName" />
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
              <el-tab-pane label="音乐" name="third">

              </el-tab-pane>
              <el-tab-pane label="视频" name="fourth">

              </el-tab-pane>
            </el-tabs>
          </section>

          <section class="main_div1_section2">
            <div class="search" style="margin-right: 2rem">
              <el-row :gutter="20">
                <el-input v-model="input" class="w-50 m-2" placeholder="搜索" style="margin-top:0.5rem " @input="find">
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
                      {{priceSort}}
                      <el-icon class="icon--bottom" :size="17" ><caret-bottom /></el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item @click="priceDefault">默认排序</el-dropdown-item>
                        <el-dropdown-item @click="priceASC">价格从低到高</el-dropdown-item>
                        <el-dropdown-item @click="priceDESC">价格从高到低</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
                <div class="el-menu-item" href="#">
                  <el-dropdown>
                    <span class="el-dropdown-link" >
                      {{ state }}
                      <el-icon class="icon--bottom" :size="17" ><caret-bottom /></el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item @click="stateAll">全部</el-dropdown-item>
                        <el-dropdown-item @click="onSale">出售中</el-dropdown-item>
                        <el-dropdown-item @click="soldOut">已售罄</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </nav>
            </div>
          </section>
        </div>

        <div class="main_div2">
          <article class="article" style="width: 33.3%;" v-for="work in works">
            <div class="_div">
              <router-link :to="{name:'Work',params:{workId:work.workId}}" class="a">
                <div class="article_div_div1" :style="{backgroundImage:`url(${work.composition})`}"></div>
              </router-link>
              <div class="_div_div2">
                <article style="width: 60%">
                  <router-link :to="{name:'Work',params:{workId:work.workId}}" class="a">
                    <p class="p1" style="">{{work.workName}}</p>
                  </router-link>
                  <router-link :to="{name:'Work',params:{workId:work.workId}}" class="a">
                    <p class="p2">{{work.author}}</p>
                  </router-link>
                </article>
                <div style="display: flex;flex-direction: column;align-items: flex-end;">
                  <router-link :to="{name:'Work',params:{workId:work.workId}}" class="a">
                    <p style="color: rgba(0,0,0,.65);font-size: 0.7rem;vertical-align: inherit;
                   word-break: break-all;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" class="">
                      {{ work.workPrice }} 美元
                    </p>
                  </router-link>
                  <div style="width: 1.4rem;height:1.5rem;position: relative;"  >
                    <a class="_div_div2_a" :style="{ backgroundImage: `url(${work.islike})` }" @click="getLoveGoods(work)"></a>
                  </div>
                </div>
              </div>
              <router-link :to="{name:'Work',params:{workId:work.workId}}" class="a">
                <div class="_div_div3" >
                  <img src="../assets/MarketImages/10002.png" style="width: 3rem;height:2rem"/>
                  <span class="_div_div3_span" >{{ work.workState }}</span>
                </div>
              </router-link>
            </div>
          </article>

          <div style="align-items: center;display: flex;justify-content: center;width: 100%;margin-bottom: 2rem">
            <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" small background
                           layout="prev, pager, next"
                           :total="total"
                           @current-change="handleCurrentChange"
            ></el-pagination>
          </div>

        </div>
      </div>
    </section>
  </div>
  <Footer/>
</template>

<script>
import Header from "@/components/Header";
import {reactive,ref,computed} from  "vue"
import Footer from "@/components/Footer";
import {useRouter} from "vue-router";
import request from "@/utils/request";
import axios from "axios";
import {ElLoading,ElMessage} from "element-plus";

export default {
  name: "Artworks",
  components:{Footer, Header},
  setup(){

    const activeName = ref('first')
    function handleClick(){
      /*if(activeName.value === 'first'){
        request.get("/works").then(res=>{
          works.value=res.data.records
          currentPage.value=res.data.current
          total.value=res.data.total
          pageSize.value=res.data.size
        })
      }else if(activeName.value === 'second'){
        /!*handleCurrentChange = (currentPage) => {
          request.get("/artwork/tabs",{
            params:{
              currentPage:currentPage,
              tab:'绘画'
            }
          }).then(res=>{
            artworks.value=res.data.records
            currentPage.value=res.data.current
            total.value=res.data.total
            pageSize.value=res.data.size
          })
        }*!/
        request.get("/works/tabs",{
          params:{
            tab:'绘画'
          }
        }).then(res=>{
          works.value=res.data.records
          currentPage.value=res.data.current
          total.value=res.data.total
          pageSize.value=res.data.size
        })

      }else if(activeName.value === 'third'){
        request.get("/works/tabs",{
          params:{
            tab:'音乐'
          }
        }).then(res=>{
          works.value=res.data.records
          currentPage.value=res.data.current
          total.value=res.data.total
          pageSize.value=res.data.size
        })
      }else if(activeName.value === 'fourth'){
        request.get("/works/tabs",{
          params:{
            tab:'视频'
          }
        }).then(res=>{
          works.value=res.data.records
          currentPage.value=res.data.current
          total.value=res.data.total
          pageSize.value=res.data.size
        })
      }*/
    }

    //搜索框数据与方法
    const input = ref('')
    function find(){
      request.get("/works",{
        params:{
          search:input.value
        }
      }).then(res=>{
        works.value=res.data.records
        currentPage.value=res.data.current
        total.value=res.data.total
        pageSize.value=res.data.size
      })
    }

    let filterTableData = computed(() =>
        tableData.filter(
            (data) =>
                !search.value ||
                data.notesWorkname.toLowerCase().includes(search.value.toLowerCase())
        )
    )
    let tableData = reactive([])
    const search = ref('')

    const router=useRouter()

    //定义每页的内容(下面是用ref定义，到时候尝试用reactive定义)
    let works=ref({})
    //currentPage表示当前页
    let currentPage = ref(1)
    //页面总数
    let total=ref(0)
    //每页的条数大小
    let pageSize = ref(1200)

    //为什么会跟请求放的位置和artworkId的位置有关
    const artworkId=router.currentRoute.value.params.artworkId
    request.get("/works",{
      params:{
        artworkId:artworkId
      }
    }).then(res=>{
      works.value=res.data.records
      currentPage.value=res.data.current
      total.value=res.data.total
      pageSize.value=res.data.size
    })
    request.get("/notes",{
      params:{
        artworkId:artworkId
      }
    }).then(res=>{
      tableData.push(...res.data)
    })
    let advertisement=ref('')
    request.get("/works/advertisement",{
      params:{
        artworkId:artworkId
      }
    }).then(res=>{
      advertisement.value=res.data.advertisement
    })

    //改变当前页触发
    function handleCurrentChange(currentPage){
      /*currentPage.value=currentPage*/
      request.get("/works?currentPage="+currentPage).then(res=>{
        works.value=res.data.records
        currentPage.value=res.data.current
        total.value=res.data.total
        pageSize.value=res.data.size
      })
    }

    //商品价钱排序
    let priceSort=ref('默认排序')
    function priceDefault(){
      priceSort.value='默认排序'
      request.get("/works",{
        params:{
          artworkId:artworkId
        }
      }).then(res=>{
        works.value=res.data.records
        currentPage.value=res.data.current
        total.value=res.data.total
        pageSize.value=res.data.size
      })
    }
    function priceASC(){
      priceSort.value='价格从低到高'
      request.get("/works/priceASC",{
        params:{
          artworkId:artworkId
        }
      }).then(res=>{
        works.value=res.data.records
        currentPage.value=res.data.current
        total.value=res.data.total
        pageSize.value=res.data.size
      })
    }
    function priceDESC(){
      priceSort.value='价格从高到低'
      request.get("/works/priceDESC",{
        params:{
          artworkId:artworkId
        }
      }).then(res=>{
        works.value=res.data.records
        currentPage.value=res.data.current
        total.value=res.data.total
        pageSize.value=res.data.size
      })
    }

    //商品状况分类数据与功能
    let state=ref('全部')
    //全部
    function stateAll(){
      state.value='全部'
      request.get("/works/state",{
        params:{
          workState:''
        }
      }).then(res=>{
        works.value=res.data.records
        currentPage.value=res.data.current
        total.value=res.data.total
        pageSize.value=res.data.size
      })
    }
    //出售中
    function onSale(){
      state.value='出售中'
      request.get("/works/state",{
        params:{
          workState:'出售中'
        }
      }).then(res=>{
        works.value=res.data.records
        currentPage.value=res.data.current
        total.value=res.data.total
        pageSize.value=res.data.size
      })
    }
    //已售罄
    function soldOut(){
      state.value='已售罄'
      request.get("/works/state",{
        params:{
          workState:'已售罄'
        }
      }).then(res=>{
        works.value=res.data.records
        currentPage.value=res.data.current
        total.value=res.data.total
        pageSize.value=res.data.size
      })
    }

    return{
      advertisement,
      activeName,
      handleClick,
      input,
      find,
      tableData,
      search,
      filterTableData,
      works,
      currentPage,
      total,
      pageSize,
      handleCurrentChange,
      priceSort,
      priceDefault,
      priceASC,
      priceDESC,
      state,
      stateAll,
      onSale,
      soldOut
    }
  },
  methods:{
    getLoveGoods(work){
      const like="data:image/png;base64,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"
      const notLike="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAArCAYAAAA+EwvfAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANcSURBVHgB1VjbddswDIV0OkA2sDxB3QkiT9BkgtobNBPYniDtBFEnqDNB1AmqDSz/" +
          "+Lf59Y9dXAVyKYqiXlQj33N0ZMEicEFAJAiiK4dX98Jutwt93789n88hPwZyAa98JZ7nJafT6Xk6ncbUAqL3s6L3Rv5KcbH8F98j1ptSFwdggMmt+GdIzQCjGzYYkZ34neidUTPErHdZ5YhnMHDDM7PiQV+pG4wGWW/" +
          "AxJ+o+YQUwGO/TSaTh5LcYOQnNZ+dKiAa89wJ0ftC/9KvKxLR+5oLLg5g5sWIiTxm9QfuCinkbMgXUuILmZ24z4y8TUpgeGcrehNFL+zPRGdINU5cHNjv94+GtEklHWKywJIe+UzdaHJrXit6Q9EbqHI1nTzlxRdtfClcdWA9a/" +
          "lAK8E6v7POxt9XVVoLt9jHg8Fo2pY8wO+vsRJV/S+rVKvFAVECF3pbXi/IOXvIOX74rRma1oXXBlMkhPyaOsKUJXAMEVhowuc+5AGJxFLRuexDXnTGfIs1ceizVx814ZYcABsaZkhSMSIHkBXrAuZ++4HKy2ZCjtC2vGiAWHsOvDRNzwVJENTWR+8Jna9PVw44kKqCw+EwoZFCdmkVacmB4/E4p/" +
          "Gi7IDU3RdU1DWjgM4N3BGBWHsvxKZBIwPOEVSutSLftEGggEINQiOB1EOPmjirjLNVyFC/ZPX7GJxQyvxAlec7feYAooAqURubVYFS978LLOQ3eblT2LR4k8DLoaandVntApYD1pY32/v8obCRyQlKLyVmkk7/LRIW8olaJAJey8GDR6Kt/" +
          "VIpgRfkAGGKxBMNDO6IYLVpPHnGWsjixB2fnQdzArrZ7kITW0+HlcWcOIFvIlXlMDCEE13IA01ai8aeDssi7gwsyQFqyKe2sbXldNWh2lUkpJ2z0MSNyAONzgM1TqyoIzC2ohfViDzQ6vRlSac1p9OGWkDIrzVxK/KZbWoJF064Ip/" +
          "ZpQ7o44RL8plN6oguTrgmn9mjHhAn0NUr1EkmJyrIY6/51JU80KsroaxOhY0GRNXVyUJ+3oc84KQHJP1VpFMpErhbyPduojlrYlU5YYAz8oDTLlwTJyTnnbUvnXbmQIwJPlT9L11qZ+SBQfqgHImFfnYQ8hFdC9DH4TP2jq8/cIgGwl8e35NBCqn6dgAAAABJRU5ErkJggg=="
      let id;
      let gid= work.artworkId;
      if(this.$store.state.userinfo===null){
        id=0;
        ElMessage({
          showClose: true,
          message: '请先登录',
          type: 'error',
        })
      }else{
        id=this.$store.state.userinfo.id;
        if(work.islike===notLike){
          const loading = ElLoading.service({
            lock: false,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
          //更新数据库(将更改后的实体传入后端)
          axios.get("http://localhost:8081/snedLove",{
            params:{
              "id":id,
              "artwork_id":gid,
              "work_id":work.workId,
              "islove":like,
              "iscollection":"null"
            }
          }).then(function (resp){
            if(resp.data == "success"){
              work.islike=like  //该对应的实体的json中的islike属性被更改
              loading.close()
            }else{
              loading.close()
              ElMessage({
                showClose: true,
                message: '添加喜欢失败，请重试',
                type: 'error',
              })
            }
          }).catch(function (resp){
            loading.close()
          })
          //并且更新我的喜欢

        }else{
          const loading = ElLoading.service({
            lock: false,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
          //更新数据库(将更改后的实体传入后端)
          axios.get("http://localhost:8081/cancelLove",{
            params:{
              "id":id,
              "artwork_id":gid,
              "work_id":work.workId,
              "islove":notLike
            }
          }).then(function (resp){
            if(resp.data == "success"){
              work.islike=notLike  //该对应的实体的json中的islike属性被更改
              loading.close()
            }else{
              loading.close()
              ElMessage({
                showClose: true,
                message: '取消喜欢失败，请重试',
                type: 'error',
              })
            }
          }).catch(function (resp){
            loading.close()
          })
          //并且更新我的喜欢

        }
      }

    }
  },
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
  margin-top: 0.5rem;
}
.main_div1_section1{
  width: auto;
  align-items: center;
  display: flex;
}

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
  text-align: center;
  border-bottom: transparent;
  display: flex;
  transition: 0.4s;

  color: rgba(0,0,0,.65);
  align-items: center;
}
nav .el-menu-item:hover {
  color:deepskyblue;
}

/*.icon--bottom{
  size:1rem;
}*/
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size:1em;
}
.el-dropdown-link:hover{
  color:deepskyblue;
}

.main_div2{
  margin-left: -0.15rem;
  margin-right: -0.15rem;
  justify-content: space-between;
  flex-wrap: wrap;
  display: flex;
}

article img{
  /*!/设置缩放比例*/
  transform:scaleX(1.7);
}
.article{
  padding: 0.15rem;
  margin-bottom: 1.6rem;
}
._div{
  cursor: pointer;
  position: relative;
}
.article_div_div1{
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
  vertical-align: inherit;
}
.p2{
  font-size: 0.7rem;
  line-height: 1.2rem;
  color: rgba(0,0,0,.45);
  word-break: break-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: inherit;
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

.a{
  text-decoration: none;
}

</style>