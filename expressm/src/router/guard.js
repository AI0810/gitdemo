import router from './index';
import asyncRoutes from './asyncRouterMap'
import {getToken} from '@/utils/auth'
import store from "@/store"
router.beforeEach(async (to,from,next)=>{
    const hasToken = getToken()    
    if(hasToken){   
        await  store.dispatch('getRole')
        if(to.path == '/login'){  
            next('/')
        }else{   
            if(to.name == null){               
                //筛选出角色对应所拥有的路由表
               let f =  asyncRoutes.filter(item => item.meta.auth.includes(store.state.role))
            for(let i=0;i<f.length;i++){
                router.addRoute(f[i])
            } //路由添加也是异步的 非常有可能先跳，后添加的        防止
            console.log('guard',{...to})           //next里面接受一个对象当参数
                next({...to,replace:true})        //会执行无数次，死循环    replace:true  没法返回了，路由跳转  直接生成新的路由             //这个有点不大懂？
            }else{
                next()
            }
            //因为跳转有可能发生在路由添加成功之前，所以要反复执行
            //参数to找不到对应路由的话，就会再重复执行，直到找到，会执行else
            // next({...to,replace:true})
            
        }
    }else{
        if(to.path=='/login'){
            next()
        }else{
            next('/login')
        }
    }
})