<template>
  <div class="wrap">
    <el-row type="flex" justify="center">
      <el-card class="box-card">
        <div slot="header">
          <h2>邦达物流后台管理系统</h2>
        </div>
        <div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="80px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名:" prop="username">
              <el-input v-model.trim="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input type='password' v-model.trim="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                 <el-button type="primary" class="btn" @click="login" :loading='loading'>登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import {post} from '@/utils/http';
import {setToken} from '@/utils/auth';
import {mapMutations} from "vuex";
export default {
    data(){
        return {
            loading:false,
            ruleForm:{
                username:'',
                password:''
            },
            rules:{
                username:[
                    { required: true, message: '用户名不为空', trigger: 'blur' },
                    { pattern:/^\w{4,8}$/, message: '用户名要求4-8位数字字母组合', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '密码不为空', trigger: 'blur' },
                    { pattern:/^\w{4,8}$/, message: '用户名要求4-8位数字字母组合', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        login(){
            
            this.$refs.ruleForm.validate((valid)=>{
                if(valid){
                    //登录逻辑
                    this.loading = true
                    post('/login',this.ruleForm).then(res=>{
                        this.loading = false
                        setToken(res.token);
                        this.setRole(res.role)
                        console.log('role',this.$store.state.role)
                        sessionStorage.setItem('nickname',res.nickname)
                        this.$router.push('/')
                    }).catch((error)=>{
                        this.loading = false
                        console.log(error)
                    })
                }
            })
        },
        ...mapMutations(['setRole'])
    }
};
</script>

<style lang="less" scoped>
//less 加强版的css  less不是合法的，需要编译成css才能使用
.box-card {
  width: 500px;
  margin-top: 200px;
  h2 {
    text-align: center;
  }
}
.btn{
    width: 100%;
}
.wrap{
    height: 100vh;
    background-image: url('http://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
}
</style>