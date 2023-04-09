<template>
  <div>
    <bread-crumb :breadList="breadList"></bread-crumb>
    <el-card class="mt">
      <el-row :gutter="24">
        <el-col :span="18">
          <el-row>
            <el-col :span="8">
              <el-input v-model="waybillNo"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="tr">
          <el-button type="primary">查询</el-button>
          <el-button type="primary">重置</el-button>
        </el-col>
      </el-row>
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
        <el-table-column prop="no" label="运单号"></el-table-column>
        <el-table-column prop="date" label="下单时间"  width="100" ></el-table-column>
        <el-table-column  prop="name" label="客户名称"  width="160" ></el-table-column>
        <el-table-column prop="cargo" label="货物名称" width="200"  ></el-table-column>
        <el-table-column prop="count" label="件数"></el-table-column>
        <el-table-column  prop="start" label="起始地" width="200" ></el-table-column>
        <el-table-column  prop="end"  label="目的地"  width="200" ></el-table-column>
        <el-table-column  prop="price"  label="运费"  width="200" ></el-table-column>
        <el-table-column prop="needRecive" label="需要接货"></el-table-column>
        <el-table-column prop="plateNumber" label="车牌号" width="180" ></el-table-column>
        <el-table-column prop="driver" label="司机"></el-table-column>
        <el-table-column prop="tel" label="司机电话" width="180"></el-table-column>
        <el-table-column prop="percent" label="运输进度" width="100">
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.percent"></el-progress>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button size="mini" type="primary">详情</el-button>
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
import { post } from "@/utils/http";
export default {
  created() {
    this.loadData();
  },
  data() {
    return {
      loading: false,
      breadList: this.$route.meta.bread || [],
      show: false,
      tableData: [],
      waybillNo: "",
      pageData: {
        page: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    expand() {
      this.show = !this.show;
    },
    async loadData() {
      this.loading = true;
      const res = await post("/departData", {
        ...this.pageData,
      });
      this.tableData = res.data.list;
      this.loading = false;
    },
    handleCurrentChange(page) {
      this.page = page;
      this.loadData();
    },
    handleSizeChange(size) {
      console.log(size)
      this.pageData.pageSize = size;
      this.loadData();
    },
  },
  components: {
    BreadCrumb,
  },
};
</script>

<style lang="less" scoped>
</style>