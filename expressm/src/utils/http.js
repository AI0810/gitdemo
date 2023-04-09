//封装get 和post请求

import service from "./service";
export function get(url,params){
    const config={
        method:'get',
        url
    }
    if(params){
        config.params = params
    }
    return service(config)  //返回得是promise实例
}

export function post(url,params){
    const config={
        method:'post',
        url
    }
    if(params){
        config.data = params
    }
    return service(config)
}