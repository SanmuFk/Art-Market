//用来封装axios
import axios from 'axios'
import router from "@/router";
import {ElMessage} from "element-plus";
import store from './store';

const request = axios.create({
    baseURL: 'http://localhost:9091',  // 注意！！ 这里是全局统一加上了 '/api' 前缀，也就是说所有接口都会加上'/api'前缀在，页面里面写接口的时候就不要加 '/api'了，否则会出现2个'/api'，类似 '/api/api/user'这样的报错，切记！！！
    timeout: 3000
})

//配置后置拦截
request.interceptors.response.use(response=>{
        let res = response.data;
        if(res.code === 200){
            return response
        }else if(res.code===403){
            ElMessage.error("用户已存在")
        } else{
            ElMessage.error("密码错了哦")
            //返回一个异常提示就不会继续往下走了 不+的话 res=>的里面 还是会继续走的
            return Promise.reject(response.data.msg)
        }
        // 捕获并处理后台异常信息
    },error=>{
        // 使得异常信息更加友好
        console.log(error)
        if (error.response.data) { //data不为空时
            error.message = error.response.data.msg
            console.log("-------------------------")
            console.log(error.message)
            console.log("-------------------------")
        }
        if(error.response.status === 401){
            store.commit('REMOVE_INFO')//清空token userinfo
            router.push("/Login")  //跳转登录页面
        }
        ElMessage.error(error.message)

        return Promise.reject(error)
    }

)

export default request

