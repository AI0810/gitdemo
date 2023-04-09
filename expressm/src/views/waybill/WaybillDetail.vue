<template>
  <div>
    <bread-crumb :breadList="breadList"></bread-crumb>
    <el-card class="mt">
      <el-row>
        <el-col :span="12" class="info">
          <span>运单编号:YGC20170110000001</span>
          <span>创建时间:2022-08-24</span>
          <span>审核员:张三丰</span>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-button type="primary" @click="back" style="text-align: right"
            >返回</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mt">
      <el-steps :active="2" align-center>
        <el-step title="未发货"> </el-step>
        <el-step title="运输中"> </el-step>
        <el-step title="已收货"> </el-step>
        <el-step title="已完成"> </el-step>
      </el-steps>
    </el-card>
    <el-card class="card">
      <h1>基础信息</h1>
      <el-row class="product-detail">
        <el-col :span="6">
          <p>客户名称:诺米科技有限公司</p>
          <p>货物名称:口罩</p>
          <p>数量:8(吨)</p>
        </el-col>
        <el-col :span="6">
          <p>是否是易燃易爆物品:不是</p>
          <p>结算方式:现付</p>
          <p>运费:12000元</p>
        </el-col>
        <el-col :span="6">
          <p>发货单据:暂未上传</p>
          <p>接货单据:暂未上传</p>
          <p>所属业务元:苏澄海</p>
        </el-col>
        <el-col :span="6">
          <p>客户下单时间:2000-08-20</p>
          <p>是否需要接货:不需要</p>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <h1>运输信息</h1>
      <el-row class="product-detail">
        <el-col :span="6">
          <p>车牌号:京A12345</p>
          <p>司机姓名:王五</p>
        </el-col>
        <el-col :span="6">
          <p>手机电话:1101001001001</p>
          <p>司机地址:紫禁城88号</p>
        </el-col>
        <el-col :span="6">
          <p>司机身份证:229399320200203030</p>
          <p>所属公司:天下第一物流公司</p>
        </el-col>
        <el-col :span="6">
          <p>预计运输时间:8天</p>
          <p>违约金:5000</p>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <h1>经办人员信息</h1>
      <el-row class="product-detail">
        <el-col :span="6">
          <p>业务员:张三</p>
        </el-col>
        <el-col :span="6">
          <p>审核员:李四</p>
        </el-col>
        <el-col :span="6">
          <p>制单员:张三</p>
        </el-col>
        <el-col :span="6">
          <p>备注:无备注</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb";
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      breadList: this.$route.meta.bread || [],
    };
  },
  methods: {
    back() {
      this.$router.push("/waybill/list");
    },
    ...mapMutations(['changeIsFromDetail'])
  },
  components: {
    BreadCrumb,
  },
  beforeRouteLeave(to, from, next) {
    if(to.path=="/waybill/list"){
      this.changeIsFromDetail(true)
    }else{
      this.changeIsFromDetail(false)
    }
    next();
  },
};
</script>

<style lang="less" scoped>
.info {
  span {
    line-height: 40px;
    text-align: left;
    margin: 0 8px;
  }
}
.product-detail {
  p {
    text-align: left;
    line-height: 40px;
  }
}
h1 {
  text-align: left;
  margin: 20px 0;
}
.card {
  margin-top: 20px;
}
</style>