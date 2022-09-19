<template>
  <Header/>
  <div class="work">
    <div class="main" style="width: 100%">
      <div class="main1" style="width: 65%;margin-bottom: 3rem">
        <el-row>
          <el-col :span="22">
            <el-card :body-style="{ padding: '0px' }">
              <el-image
                  class="image"
                  :src="composition"
                  fit="cover"
                  :preview-src-list="composition"
              />
              <div style="padding: 14px">
                <span>价钱</span>
                <div class="bottom">
                  <span style="font-size: 0.8rem;font-weight: 700"><span class="price">{{workPrice}}</span> 美元</span>
                  <div style="padding-left: 22rem">
                    <el-button type="primary" round @click="purchase"><span class="buy">{{ buy }}</span></el-button>
                  </div>
                  <div style="width: 1.6rem;height:1.7rem;"  >
                    <el-button type="text" class="love" :style="{ backgroundImage: `url(${islike})` }" @click="getLoveGoods()"></el-button>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <div class="main2" style="width: 35%;margin-bottom: 3rem;">
        <ul class="main2_ul">
          <li>
            <label >标题</label>
            <p class="p1">{{ workName }}</p>
          </li>
          <li>
            <label>创作者</label>
            <p class="p1">{{ author }}</p>
          </li>
          <li>
            <label>NFT ID</label>
            <p class="p2">{{ ntfId }}</p>
          </li>
          <li>
            <label>作品信息</label>
            <p class="p2">{{information}}</p>
          </li>
          <li>
            <label>作品描述</label>
            <!--           <div class="wrapper">
                         <input id="exp1" class="exp"  type="checkbox">
                         <div class="text">
                           <label class="btn" for="exp1"></label>
                           “Pento”NFT灵感来子动物界的把单子——蜜獾，它的生物属性完美合币圈交易员的人生精神世界，是契合社区完美的艺术代言人。独特的特征，开发识别不同维度的交易特征，具有不同的表情、动作、情绪、属性、服装、道具等属性，即具有差异化的个性化形象，具有高度的特征。 “”NFT持有者Pento，不是获得了该品，同时也是Pento DAO Club国际上最睿智、最有才华、最有钱的人的成员、规划者、建设者、收获者，全球更多肩负着未来更多的交易爱好者进入到丰富有趣的交易世界中的信使。
                         </div>
                       </div>-->
            <p class="p2">{{description}}</p>
          </li>
          <li>
            <label>创作者背景</label>
            <p class="p2">{{authorInfor}}</p>
          </li>
        </ul>
      </div>

      <div class="main3" style="align-items: center;justify-content: center;width: 100%;margin-bottom: 2rem">
        <h3 style="margin-left: 1rem;margin-bottom: 1rem">事件记录</h3>
        <el-table size="large" :data="filterTableData" :default-sort="{ prop: 'datetime', order: 'descending' }" stripe style="width: 100%" height="290">
          <el-table-column prop="event" label="事件" width="250"/>
          <el-table-column prop="recordPrice" label="价钱" width="230" />
          <el-table-column prop="recordsOwner" label="拥有者" width="300"/>
          <el-table-column prop="datetime" label="日期"  width="150" sortable/>
          <el-table-column align="right">
            <template #header>
              <el-input v-model="search" size="small" placeholder="Search by datetime" />
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="mask" v-if="isBuy">
        <div class="mask-content" >
          <div class="content-view">
            <img class="view-img" :src="composition" alt="">
          </div>
          <p class="content-text">{{ workName }}</p>
          <P class="content-price">
            <span class="price-icon">≈</span>
            <span class="price-number">{{workPrice}}</span>
            <span class="price-unit">美元(含运费)</span>
          </P>
          <div class="line"></div>
          <div class="user-content">
            <div class="user-view">
              <div class="user-logo" @click.native="userAgree">
                <img src="../assets/Product/unclick.png" class="check-logo" v-if="isAgree">
                <img src="../assets/Product/click.png" class="check-logo" v-else="isAgree">
              </div>
              <p class="user-agree">已阅读并同意用户<span class="agreement">用户协议</span></p>
            </div>
            <div class="content-bottom">
              <div class="bottom-cancel" @click.native="closeBuy">取消</div>
              <div class="bottom-agree" id="bottom-agree" @click.native="BuyGoods">一键购买</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  <Footer/>
</template>

<script>
import {computed, reactive, ref} from 'vue'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import request from "@/utils/request";
import {useRouter} from "vue-router";
import {ElLoading, ElMessage, ElMessageBox} from "element-plus";
import axios from "axios";
import {useStore} from "vuex";

export default {
  name: "Work",
  components:{Header,Footer},
  data(){
    return{
      img: ''
    }
  },
  setup(){
    const store = useStore()
    let filterTableData = computed(() =>
        tableData.filter(
            (data) =>
                !search.value ||
                data.datetime.toLowerCase().includes(search.value.toLowerCase())
        )
    )
    let tableData = reactive([])
    const search = ref('')

    let composition=ref(['https://artbingo.oss-cn-hongkong.aliyuncs.com/file/image/1500414533565435904.jpg'])
    let workPrice=ref(188)
    let buy=ref('预定')
    let artworkId=ref('')
    let islike=ref('')
    let id=ref("")
    let workName=ref('尊龙')
    let author=ref('迷野')
    let ntfId=ref(4319)
    let information=ref('1200 x 838 px.IMAGE (418142KB)')
    let description=ref('创龙之初')
    let authorInfor=ref('95后画师毕业于广美而后出国深造擅长年轻一代新型潮流国潮风格古风结合，其作品以一种新潮风为主导.其作品深受青年艺术着的喜爱，曾获潮流作画大赛龙组一等奖。')
    const router=useRouter()
    const workId=router.currentRoute.value.params.workId
    request.get('/works/work',{
      params:{
        workId:workId
      }
    }).then(res=>{
      composition.value=[res.data.composition]
      artworkId.value=res.data.artworkId
      islike.value=res.data.islike
      id.value=res.data.id
      workPrice.value=res.data.workPrice
      workName.value=res.data.workName
      author.value=res.data.author
      ntfId.value=res.data.ntfId
      information.value=res.data.information
      description.value=res.data.description
      authorInfor.value=res.data.authorInfor
      if(res.data.workState==='出售中'){
        buy.value='购买'
      }
    })
    request.get("/records",{
      params:{
        workId:workId
      }
    }).then(res=>{
      tableData.push(...res.data)
    })

    //购买框的数据与方法
    let isAgree=ref(true)
    let isBuy=ref(false)
    function userAgree(){
      if(isBuy.value){
        if(isAgree.value){
          isAgree.value = false
          let bottom =document.getElementById('bottom-agree');
          bottom.style.backgroundColor='#00e676';
          bottom.style.color='#fff';
        } else{
          isAgree.value = true
          let bottom =document.getElementById('bottom-agree');
          bottom.style.backgroundColor='rgba(0,0,0,.1)';
          bottom.style.color='#fff';
        }
      }
    }
    function closeBuy(){
      isBuy.value = false
      isAgree.value = true
    }
    function BuyGoods(){
      if( isAgree.value === false){
        axios.get("http://localhost:8081/ali/pay",{
          params:{
            outTradeNo: parseInt(Math.random()*(100000-10000)+10000),
            subject:workName.value,
            totalAmount: workPrice.value,
            body:authorInfor.value,
            id:workId,
            author:author.value,
            name:store.state.userinfo.username
          }
        }).then(function (resp){
          // 添加之前先删除一下，如果单页面，页面不刷新，添加进去的内容会一直保留在页面中，二次调用form表单会出错
          const divForm = document.getElementsByTagName('div')
          if (divForm.length) {
            document.body.removeChild(divForm[0])
          }
          const div = document.createElement('div')
          div.innerHTML = resp.data // data就是接口返回的form 表单字符串
          document.body.appendChild(div)
          document.forms[0].submit()
        }).catch(function (resp){
          console.log(resp)
        })
      }
    }

    const purchase = () => {
      if(store.state.userinfo ===null){
        ElMessage({
          showClose: true,
          message: '请先登录',
          type: 'error',
        })
      }else{
        if(buy.value==='预定'){
          ElMessageBox.alert('该NFT艺术品已售罄，尽情等待下次上线', 'Attention', {
            confirmButtonText: 'OK',
            callback: (action) => {
              ElMessage({
                type: 'info',
                message: `action: ${action}`,
              })
            },
          })
        }else{
          if(id.value===store.state.userinfo.id){
            ElMessage({
              showClose: true,
              message: '您不能购买自己的商品',
              type: 'error',
            })
          }else{
            isBuy.value = true
          }
        }
      }
    }
    const getLoveGoods =() =>{
      const like="data:image/png;base64,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"
      const notLike="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAArCAYAAAA+EwvfAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANcSURBVHgB1VjbddswDIV0OkA2sDxB3QkiT9BkgtobNBPYniDtBFEnqDNB1AmqDSz/" +
          "+Lf59Y9dXAVyKYqiXlQj33N0ZMEicEFAJAiiK4dX98Jutwt93789n88hPwZyAa98JZ7nJafT6Xk6ncbUAqL3s6L3Rv5KcbH8F98j1ptSFwdggMmt+GdIzQCjGzYYkZ34neidUTPErHdZ5YhnMHDDM7PiQV+pG4wGWW/" +
          "AxJ+o+YQUwGO/TSaTh5LcYOQnNZ+dKiAa89wJ0ftC/9KvKxLR+5oLLg5g5sWIiTxm9QfuCinkbMgXUuILmZ24z4y8TUpgeGcrehNFL+zPRGdINU5cHNjv94+GtEklHWKywJIe+UzdaHJrXit6Q9EbqHI1nTzlxRdtfClcdWA9a/" +
          "lAK8E6v7POxt9XVVoLt9jHg8Fo2pY8wO+vsRJV/S+rVKvFAVECF3pbXi/IOXvIOX74rRma1oXXBlMkhPyaOsKUJXAMEVhowuc+5AGJxFLRuexDXnTGfIs1ceizVx814ZYcABsaZkhSMSIHkBXrAuZ++4HKy2ZCjtC2vGiAWHsOvDRNzwVJENTWR+8Jna9PVw44kKqCw+EwoZFCdmkVacmB4/E4p/" +
          "Gi7IDU3RdU1DWjgM4N3BGBWHsvxKZBIwPOEVSutSLftEGggEINQiOB1EOPmjirjLNVyFC/ZPX7GJxQyvxAlec7feYAooAqURubVYFS978LLOQ3eblT2LR4k8DLoaandVntApYD1pY32/v8obCRyQlKLyVmkk7/LRIW8olaJAJey8GDR6Kt/" +
          "VIpgRfkAGGKxBMNDO6IYLVpPHnGWsjixB2fnQdzArrZ7kITW0+HlcWcOIFvIlXlMDCEE13IA01ai8aeDssi7gwsyQFqyKe2sbXldNWh2lUkpJ2z0MSNyAONzgM1TqyoIzC2ohfViDzQ6vRlSac1p9OGWkDIrzVxK/KZbWoJF064Ip/" +
          "ZpQ7o44RL8plN6oguTrgmn9mjHhAn0NUr1EkmJyrIY6/51JU80KsroaxOhY0GRNXVyUJ+3oc84KQHJP1VpFMpErhbyPduojlrYlU5YYAz8oDTLlwTJyTnnbUvnXbmQIwJPlT9L11qZ+SBQfqgHImFfnYQ8hFdC9DH4TP2jq8/cIgGwl8e35NBCqn6dgAAAABJRU5ErkJggg=="
      let id;
      let gid= artworkId.value;
      if(store.state.userinfo===null){
        id=0;
        ElMessage({
          showClose: true,
          message: '您未登录，请先登录！',
          type: 'warning',
        })
      }else{
        id=store.state.userinfo.id;
        if(islike.value===notLike){
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
              "work_id":workId,
              "islove":like
            }
          }).then(function (resp){
            if(resp.data == "success"){
              islike.value=like  //该对应的实体的json中的islike属性被更改
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
              "work_id":workId,
              "islove":notLike
            }
          }).then(function (resp){
            if(resp.data == "success"){
              islike.value=notLike  //该对应的实体的json中的islike属性被更改
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
    return{
      composition,
      workPrice,
      buy,
      purchase,
      getLoveGoods,
      workName,
      workId,
      artworkId,
      islike,
      author,
      ntfId,
      information,
      description,
      authorInfor,
      tableData,
      search,
      filterTableData,
      introduce: '',
      // 是否展示所有文本内容
      showTotal: true,
      // 显示展开还是收起
      exchangeButton: true,
      // 是否显示展开收起按钮
      showExchangeButton: false,
      rem: '',
      isAgree,
      isBuy,
      userAgree,
      closeBuy,
      BuyGoods,
    }
  },
}

</script>

<style scoped>
.main{
  padding-top: 6.8rem;
  padding-left: 4.3rem;
  padding-right: 4.2rem;
  background-color: rgb(255,255,255);
  margin: auto;
  flex-wrap: wrap;
  display: flex;
}

.price{
  font-size: 1.5rem;
  font-weight: 700;
}
.buy{
  font-size: 1.1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  font-weight: 700;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.image {
  width: 100%;
  display: block;
  /*transform: scale(2);*/
}
.love{
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.main2_ul{
}
li{
  margin-bottom: 0.78rem;
  list-style: none ;
}
label{
  display: block;
  margin-bottom: 0.08rem;
  font-size: 0.7rem;
  line-height: 1rem;
  color: rgba(0,0,0,.45);
  vertical-align: inherit;
}
.p1{
  font-size: 0.9rem;
  line-height: 2.4rem;
  word-break: break-all;
  vertical-align: inherit;
}
.p2{
  font-size: 0.8rem;
  line-height: 1.4rem;
  word-break: break-all;
  margin-top: 0.65rem;
  margin-bottom: 1rem;
  vertical-align: inherit;
}

/*.wrapper {
  display: flex;
  margin-top: 0.9rem;
  margin-bottom: 1.1rem;
  width:100%;
  overflow: hidden;
  !*   resize: horizontal; *!

}
.text {
  font-size: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  !* display: flex; *!
  !*   display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical; *!
  position: relative;
  line-height: 1.5;
  max-height: 4.5em;
  transition: .3s max-height;
}
.text::before {
  content: '';
  height: calc(100% - 26px);
  float: right;
}
.text::after {
  content: '';
  width: 999vw;
  height: 999vw;
  position: absolute;

  margin-left: -100px;
}
.btn{
  position: relative;
  float: right;
  clear: both;
  margin-left: 1.2rem;
  font-size: 0.8rem;

  line-height: 2rem;

  color: skyblue;
  cursor: pointer;
  !* margin-top: -30px; *!
}
.btn::after{
  content:'展开'
}
.exp{
  display: none;
}
.exp:checked+.text{
  max-height: none;
}
.exp:checked+.text::after{
  visibility: hidden;
}
.exp:checked+.text .btn::before{
  visibility: hidden;
}
.exp:checked+.text .btn::after{
  content:'收起'
}
.btn::before{
  content: '...';
  position: absolute;
  left: -0.8rem;
  color: #333;
  transform: translateX(-100%)
}*/

.mask{
  z-index: 999;
  background-color: rgba(0,0,0,.4);
  overflow-y: auto;
  justify-content: center;
  align-items: center;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
}
.mask-content{
  position: relative;
  padding: 24px;
  box-sizing: border-box;
  border: 5px solid rgba(0,0,0,.1);
  box-shadow: 0 8px 12px rgba(0 ,0, 0, 0.1);
  background: rgb(255,255,255);
  border-radius: 8px;
  width:368px;
}
.content-view{
  width: 100%;
  max-height: 426px;
}
.view-img{
  width: 100%;
  max-height: 426px;
}
.content-text{
  font-size: 20px;
  text-align: center;
  margin-top: 24px;
}
.content-price{
  font-size: 20px;
  text-align: center;
  padding-bottom: 24px;
  padding-top: 8px;
}
.price-icon{
  font-size: 12px;
}
.price-number{
  font-weight: 600;
}
.price-unit{
  font-size: 12px;
  margin-left: 8px;
}
.line{
  width: 100%;
  height: 1px;
  background-color: rgba(0,0,0,.1);
  transform: scaleY(.5);
}
.user-content{
  font-size: 12px;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
}
.user-view{
  align-items: center;
  display: flex;
  width: 80%;
}
.user-logo{
  padding: 6px;
  cursor: pointer;
}
.check-logo{
  width: 14px;
  height: 14px;
}
.agreement{
  color: #00b8d4;
  cursor: pointer;
}
.content-bottom{
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 24px;
}
.bottom-cancel{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 34px;
  border: 1px solid rgba(0,0,0,.1);
  box-sizing: border-box;
  border-radius: 17px;
  color: rgba(0,0,0,.65);
  width: 133px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 12px;
}
.bottom-agree{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 34px;
  background: rgba(0,0,0,.1);
  box-sizing: border-box;
  border-radius: 17px;
  color: #fff;
  width: 133px;
  cursor: pointer;
}

</style>