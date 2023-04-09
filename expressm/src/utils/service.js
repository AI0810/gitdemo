import axios from "axios";
import { Message } from 'element-ui';
import { getToken } from "./auth";
const service = axios.create({
    baseURL:'http://localhost:8080',
    timeout:5000
})

//请求拦截器  每一个请求都得带上某个东西  某些配置
service.interceptors.request.use((config) => {
    if(getToken()){
        config.headers.token = getToken()
    }
    return config
},()=>{
    Message({
        type:'error',
        message:'请求错误'
    })
    return Promise.reject(new Error('请求错误'))
})



//响应拦截器

service.interceptors.response.use((res)=>{     //use 两个参数，一个是请求通了自己配置得有问题    一个是根本没通
    // console.log('this',this)  严格模式下，this指向window
    const result = res.data;
    if(result.success){
        return result
    }else{
        Message({
            type:'error',
            message:result.message || '请求错误'
        })
        return Promise.reject(new Error(result.message || '请求错误'))
    }
},()=>{
    Message({
        type:'error',
        message:'请求错误'
    })
    return Promise.reject(new Error('请求错误'))
})



export default service