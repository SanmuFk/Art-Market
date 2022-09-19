<template>
  <Header />
  <div class="upload">
    <div class="upload-banner">
      <div class="upload-banner-main">
        <div class="logo">
          <img src="@/assets/Create/logo.568a1ae6.png" alt>
        </div>
        <div class="content">
          <span class="font">作品上传</span>
          <span>您需要编辑物品信息并进行上传</span>
        </div>
      </div>
    </div>
    <div class="upload-main">
      <div class="upload-main-div">
        <form class="upload-form">
          <div class="form-item">
            <div class="form-item-title">
              <label class title="作品名称">作品名称</label>
            </div>
            <div class="form-item-control">
              <div class="form-item-control-input">
                <div class="form-item-control-input-content">
                  <input maxlength="30" placeholder="请输入作品名称" type="text" class="form-input" v-model="goods.name">
                </div>
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-title">
              <label class title="作品类别">作品类别</label>
            </div>
            <div class="form-item-control">
              <div class="form-item-control-input">
                <div class="form-item-control-input-content">
                  <el-select v-model="goods.type" clearable placeholder="请选择类型">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                  </el-select>
                </div>
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-title">
              <label class title="作者">作者</label>
            </div>
            <div class="form-item-control">
              <div class="form-item-control-input">
                <div class="form-item-control-input-content">
                  <input maxlength="30" placeholder="请输入作者名称" type="text" class="form-input" v-model="goods.author">
                </div>
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-title">
              <label class title="作品简介">作品描述</label>
            </div>
            <div class="form-item-control" style="max-width: 50%;">
              <div class="form-item-control-input">
                <div class="form-item-control-input-content">
                  <el-input
                      v-model="goods.content"
                      :autosize="{ minRows: 5, maxRows: 6 }"
                      type="textarea"
                      placeholder="请输入作品简介"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-title">
              <label class title="作品展示">作品展示</label>
            </div>
            <div class="form-item-control">
              <div class="form-item-control-input">
                <el-upload
                    action=""
                    list-type="picture-card"
                    :limit="4"
                    :auto-upload=false
                    :on-remove="handleRemove"
                    :on-change="handleEditChange"
                    :class="{hide:hideUploadEdit}">
                  <el-icon><Plus /></el-icon>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="goods.img" alt="">
                </el-dialog>
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-title">
              <label class title="作品认证">作品认证信息</label>
            </div>
            <div class="form-item-control">
              <div class="form-item-control-input">
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :auto-upload=false
                    :on-change="fileChange"
                    :on-remove="fileRemove"
                    multiple
                    :limit="3"
                >
                  <el-button type="primary">上传认证文件</el-button>
                  <template #tip>
                    <div class="el-upload__tip">
                      请上传作品认证文件以便于作品审核(可以不上传)
                    </div>
                  </template>
                </el-upload>
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-title">
              <label class title="作品信息">作品信息</label>
            </div>
            <div class="form-item-control">
              <div class="form-item-control-input">
                <div class="form-item-control-input-content">
                  <input maxlength="100" placeholder="请输入作品信息" type="text" class="form-input" v-model="goods.information">
                  <div class="el-upload__tip" style="margin: 10px 0 0 10px">
                    图片尺寸、大小等信息 如: 3150 x 3150 px.IMAGE (2549049KB)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-title">
              <label class title="预售价格">预售价格</label>
            </div>
            <div class="form-item-control">
              <div class="form-item-control-input">
                <div class="form-item-control-input-content">
                  <input maxlength="30" placeholder="请输入预售价格" type="text" class="form-input" v-model="goods.salePrice">
                  <div class="el-upload__tip" style="margin: 10px 0 0 10px">
                    默认单位为人民币
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-title">
              <label class title="联系方式">联系方式</label>
            </div>
            <div class="form-item-control">
              <div class="form-item-control-input">
                <div class="form-item-control-input-content">
                  <input maxlength="30" placeholder="请输入联系方式" type="text" class="form-input" v-model="goods.contact">
                  <div class="el-upload__tip" style="margin: 10px 0 0 10px">
                    手机 / 邮箱 等其他方式均可
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-title">
              <label class title="作者描述">创作者描述</label>
            </div>
            <div class="form-item-control" style="max-width: 50%;">
              <div class="form-item-control-input">
                <div class="form-item-control-input-content">
                  <el-input
                      v-model="goods.author_infor"
                      :autosize="{ minRows: 5, maxRows: 6 }"
                      type="textarea"
                      placeholder="请输入您对于作品的补充描述"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-control-button">
              <div class="button-view">
                <el-button type="primary" @click="formSubmit">
                  提交<el-icon class="el-icon--right"><Upload /></el-icon>
                </el-button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import axios from "axios";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {ElLoading, ElMessage} from "element-plus";
import {ElMessageBox } from 'element-plus'

export default {
  name: "Create",
  components:{Footer, Header},
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      hideUploadEdit: false,
      textarea:'',
      value:'',
      goods:{
        name:'',
        type:'',
        author:'',
        content:'',
        img:[],
        file:[],
        information:'',
        salePrice:'',
        contact:'',
        author_infor:'',
        id:''
      },
      options:[
        {
          value:'手工品',
          label:'手工品'
        },
        {
          value:'绘画',
          label: '绘画'
        },
        {
          value:'音乐',
          label: '音乐'
        },
        {
          value:'视频',
          label:'视频'
        }
      ]
    }
  },
  methods: {
    handleRemove(file) {
      let vm =this;
      this.getBase64(file.raw).then(res => {
        const params = res
        for(let i=0;i<this.goods.img.length;i++){
          if(this.goods.img[i] ===params){
            this.goods.img.splice(i,1)
          }
        }
        console.log(this.goods.img);
        vm.hideUploadEdit = this.goods.img.length >=4;
      })

    },
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    },
    handleEditChange(file){
      this.dialogImageUrl = file.url;
      this.getBase64(file.raw).then(res => {
        const params = res
        this.goods.img.push(params);
        console.log(params);
      })
      this.dialogVisible = true;
      let vm =this;
      vm.hideUploadEdit =this.goods.img.length >=4;
    },
    fileRemove(file,fileList){
      this.getBase64(file.raw).then(res => {
        const params = res
        for(let i=0;i<this.goods.file.length;i++){
          if(this.goods.file[i] ===params){
            this.goods.file.splice(i,1)
          }
        }
        console.log(this.goods.file);
      })

    },
    fileChange(file){
      this.getBase64(file.raw).then(res => {
        const params = res
        this.goods.file.push(params);
        console.log(params);
      })
      console.log(this.goods.file);
    },
    formSubmit(){
      let flag = true;
      let that = this;
      if(this.$store.state.userinfo == null){
        ElMessage({
          showClose: true,
          message: '请先登录',
          type: 'error',
        })
      }else{
        if(this.goods.name ==='' ||this.goods.author ===''  ||this.goods.type ===''  ||this.goods.content ===''
            ||this.goods.contact ===''  ||this.goods.salePrice ===''|| this.goods.img.length ===0 || this.goods.information ===''|| this.goods.author_infor ==='' ){
          flag = false;
        }
        if(flag){
          ElMessageBox.confirm(
              '您确定要上传作品吗？',
              'Title',
              {
                lockScroll:false,
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'info',
              }
          ).then(()=>{
            const loading = ElLoading.service({
              lock:  false,
              text: 'Loading',
              background: 'rgba(0, 0, 0, 0.7)',
            })
            this.goods.id= this.$store.state.userinfo.id;
            console.log(this.goods)
            axios({
              method: 'post',
              url:'http://localhost:8081/Goods',
              data:this.goods
            }).then(function (resp){
              console.log(resp.data);
              if(resp.data ==="success"){
                loading.close()
                ElMessage({
                  type: 'success',
                  message: '作品上传成功',
                })
              }else{
                loading.close()
                ElMessage({
                  type: 'error',
                  message: '作品上传失败，请重试',
                })
              }
            }).catch(function (resp){
              loading.close()
              console.log(resp)
            })
          }).catch(() => {
            loading.close()
            ElMessage({
              type: 'info',
              message: '您已取消上传',
            })
          })

        }else{
          ElMessage({
            showClose: true,
            message: '请完善相关信息',
            type: 'error',
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.header >>> .headerRight .right #zpcs{
  color:deepskyblue;
}

template{
  font-size: 100px;
}
.upload{
  margin-top: 2rem;
}
.upload .upload-banner{
  background: #e0fbff;
  width: 100%;
  padding: 70px 50px 50px 0;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upload .upload-banner .upload-banner-main{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.upload .upload-banner .upload-banner-main .logo{
  display: flex;
  margin-right: 20px;
  width:64px;
}
.upload-banner-main .logo img{
  width: 64px;
  height: 64px;
}
.upload .upload-banner .upload-banner-main span{
  text-align: center;
  font-size: 14px;
}
.upload .upload-banner .upload-banner-main .content{
  flex-direction: column;
  display: flex;
}
.upload .upload-banner .upload-banner-main .content .font{
  font-size: 24px;
  font-weight: 600;
}
.upload-main {
  width: 100%;
  background: #fff;
  justify-content: center;
  align-items: center;
  display: flex;
}
.upload-main .upload-main-div{
  background: #fff;
  padding: 70px 0;
  width: 50%;

}
.upload-main .upload-main-div .upload-form{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0,0,0,.85);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
}
.upload-main .upload-main-div .upload-form .form-item{
  row-gap: 0px;
  display: flex;
  flex-flow: row wrap;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0,0,0,.85);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
  margin-bottom: 24px;
  vertical-align: top;
}
.upload-main .upload-main-div .upload-form .form-item .form-item-title{
  flex-grow: 0!important;
  flex: 0 0 25%;
  display: block;
  max-width: 25%;
  min-height: 1px;
  overflow: hidden;
  white-space: nowrap;
  text-align: right;
  vertical-align: middle;
}
.form-item-title>label{
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 35px;
  color: rgba(0,0,0,.85);
  font-size: 14px;
}
.form-item-title>label::after{
  content: ':';
  position: relative;
  margin: 0 8px 0 2px;
}
.upload-main .upload-main-div .upload-form .form-item .form-item-control{
  flex: 1 1 0!important;
  display: block;
  max-width: 40%;
  position: relative;
  min-height: 1px;
  flex-direction: column;
}
.form-item-control .form-item-control-input{
  position: relative;
  display: flex;
  align-items: center;
  min-height: 32px;
}
.form-item-control-input >>> .el-upload--picture-card{
  background-color: #fff;
}
.form-item-control-input .form-item-control-input-content{
  flex: auto;
  max-width: 100%;
  height: auto;

}
.form-item-control-input-content .form-input{
  border-radius: 10px;
  padding: 8px 11px;
  text-overflow: ellipsis;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  display: inline-block;
  width: 100%;
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  transition: all .3s;
}
.form-input:focus{
  outline:none;
  border: 1px solid #409eff;
}
.form-input:hover{
  outline:none;
  border: 1px solid #409eff;
}
.hide .el-upload--picture-card {
  display: none;
}
.form-item-control-button{
  flex: 1 1 0!important;
  margin-left: 25%;
  display: block;
  max-width: 50%;
  position: relative;
  min-height: 1px;
  flex-direction: column;
}
.form-item-control-button .button-view{
  position: relative;
  display: flex;
  align-items: center;
  min-height: 32px;
}
.button-view >>> .el-button{
  width: 160px;
  height: 40px;
}
</style>