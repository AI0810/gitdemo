<template>
  <div>
    <bread-crumb :breadList="breadList"></bread-crumb>
    <el-card class="mt">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-input
            placeholder="请输入运单号"
            v-model="params.waybillNo"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入客户名称"
            v-model="params.name"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="6" class="tr">
          <el-button type="primary" @click="loadData">查询</el-button>
          <el-button type="primary">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mt">
      <el-radio-group v-model="params.status" @change="loadData">
        <el-radio-button label="1">全部运单(300)</el-radio-button>
        <el-radio-button label="2">装货中(120)</el-radio-button>
        <el-radio-button label="3">运输中(70)</el-radio-button>
        <el-radio-button label="4">已完成(100)</el-radio-button>
        <el-radio-button label="5">运单异常(10)</el-radio-button>
      </el-radio-group>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column
          prop="no"
          label="运单号"
          fixed="left"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="下单时间"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="客户名称"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="cargo"
          label="货物名称"
          width="200"
        ></el-table-column>
        <el-table-column prop="count" label="件数"></el-table-column>
        <el-table-column
          prop="start"
          label="起始地"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="end"
          label="目的地"
          width="200"
        ></el-table-column>
        <el-table-column prop="price" label="运费"></el-table-column>
        <el-table-column prop="needRecive" label="需要接货"></el-table-column>
        <el-table-column
          prop="plateNumber"
          label="车牌号"
          width="180"
        ></el-table-column>
        <el-table-column prop="driver" label="司机"></el-table-column>
        <el-table-column
          prop="tel"
          label="司机电话"
          width="180"
        ></el-table-column>
        <el-table-column prop="percent" label="运输进度" width="100">
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.percent"></el-progress>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="detail(scope.row.no)"
              >详情</el-button
            >
            <el-button size="mini" type="danger">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageData.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40"
        class="tr"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb";
// import moment from "moment";
import { post } from "@/utils/http";
import {mapState,mapMutations} from 'vuex'
import timeFormat from '@/common/timeformat'
export default {
  created() {
    this.loadData();
  },
  data() {
    return {
      loading: false,
      breadList: this.$route.meta.bread || [],
      tableData: [],
      params: {
        status: 1,
        waybillNo: "",
        name: "",
      },
      date: [], //这个没办法，一个两个日期
      pageData: {
        page: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    ...mapMutations(['changeIsFromDetail']),
    async loadData() {
      this.loading = true;
      // let startDate = this.date[0]
      //   ? moment(this.date[0]).format("YYYY-MM-DD")
      //   : "";
      // let endDate = this.date[0]
      //   ? moment(this.date[1]).format("YYYY-MM-DD")
      //   : "";
      let startDate = this.date[0]
        ? timeFormat(this.date[0])
        : "";
        let endDate = this.date[0]
        ? timeFormat(this.date[1])
        : "";
      const res = await post("/waybillList", {
        ...this.pageData,
        ...this.params,
        startDate,
        endDate,
      });
      this.tableData = res.data.list;
      this.loading = false;
    },
    handleCurrentChange(page) {
      this.page = page;
      this.loadData();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.loadData();
    },
    detail(no) {
      this.$router.push("/waybill/list/detail?no=" + no);
    },
    clearCache() {
      let vnode = this.$vnode;
      let parentVnode = vnode && vnode.parent;
      if (
        parentVnode &&
        parentVnode.componentInstance &&
        parentVnode.componentInstance.cache
      ) {
        var key =
          vnode.key == null
            ? vnode.componentOptions.Ctor.cid +
              (vnode.componentOptions.tag
                ? `::${vnode.componentOptions.tag}`
                : "")
            : vnode.key;
        var cache = parentVnode.componentInstance.cache;
        var keys = parentVnode.componentInstance.keys;
        if (cache[key]) {
          this.$destroy();
          if (keys.length) {
            var index = keys.indexOf(key);
            if (index > -1) {
              keys.splice(index, 1);
            }
          }
          cache[key] = null;
        }
      }
    },
  },
  computed:mapState(['isFromDetail']),
  components: {
    BreadCrumb,
  },
  //   beforeRouteEnter(to,from,next){        //独有的守卫
  //     if(from.path == '/waybill/list/detail'){
  //       to.meta.keepAlive = true
  //     }else{
  //       to.meta.keepAlive=false
  //     }
  //     next()
  //   }
  activated(){
    if(!this.isFromDetail){
      this.loadData()
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/waybill/list/detail") {
      from.meta.keepAlive = true;
    } else {
      // from.meta.keepAlive = false
      //如果去的不是详情页，就要清除缓存
      this.clearCache();
      // this.changeIsFromDetail(false)
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
</style>