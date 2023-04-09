<template>
  <div>
    <el-row :gutter="24" style="margin-bottom: 20px" class="total">
      <el-col :span="6">
        <el-card shadow="always" class="in">
          <div class="fl">
            <p>本月进件</p>
            <p style="font-weight: bold">6588</p>
            <p>
              +20.12%
              <span style="font-size: 12px">与上月同比</span>
            </p>
          </div>
          <i class="el-icon-tickets ico"></i>
          <div class="clear"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="out">
          <div class="fl">
            <p>本月放贷（元）</p>
            <p style="font-weight: bold">121000000</p>
            <p>
              +1.25%
              <span style="font-size: 12px">与上月同比</span>
            </p>
          </div>
          <i class="el-icon-money ico"></i>
          <div class="clear"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="allin">
          <div class="fl">
            <p>累计进件</p>
            <p style="font-weight: bold">128700</p>
            <p>
              +11.48%
              <span style="font-size: 12px">与去年同比</span>
            </p>
          </div>
          <i class="el-icon-date ico"></i>
          <div class="clear"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="allout">
          <div class="fl">
            <p>累计放款</p>
            <p style="font-weight: bold">923380079</p>
            <p>
              -2.06%
              <span style="font-size: 12px">与去年同比</span>
            </p>
          </div>
          <i class="el-icon-coin ico"></i>
          <div style="clear: both"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="18">
        <el-card>
          <div slot="header">进件统计分析</div>
          <div style="height: 240px" ref="analysis">内容</div>
          <!--他这个图表挂载必须要有高-->
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div slot="header">进件统计分析</div>
          <div style="height: 240px" ref="percent">内容</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="mt">
      <el-col :span="12">
        <el-card>
          <div class="block">
            <el-timeline>
              <el-timeline-item timestamp="2018/4/12" placement="top">
                <el-card>
                  <h4>更新 Github 模板</h4>
                  <p>王小虎 提交于 2018/4/12 20:46</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018/4/3" placement="top">
                <el-card>
                  <h4>更新 Github 模板</h4>
                  <p>王小虎 提交于 2018/4/3 20:46</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                  <h4>更新 Github 模板</h4>
                  <p>王小虎 提交于 2018/4/2 20:46</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                  <h4>更新 Github 模板</h4>
                  <p>王小虎 提交于 2018/4/2 20:46</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <el-calendar v-model="date">
          </el-calendar>
        </el-card>
        
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { get } from "@/utils/http";
export default {
  data(){
    return {
      date:new Date()
    }
  },
  mounted() {
    this.drawLine();
    this.drawPie();
  },
  methods: {
    async drawLine() {
      var myChart = echarts.init(this.$refs.analysis);
      const { data } = await get("/line");
      let keys = [],
        values = [];
      for (let key in data) {
        keys.push(key);
        values.push(data[key]);
      }
      const option = {
        tooltip: {
          trigger: "axis",
          formatter: "类目是{b}<br/>数值是{c}",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: keys,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: values,
            type: "line",
            smooth: true,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 1,
                    color: "#4f88ff", // 0% 处的颜色
                  },
                  {
                    offset: 0,
                    color: "white", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    drawPie() {
      var myChart = echarts.init(this.$refs.percent);
      const option = {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["30%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "16",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.ico {
  float: right;
  font-size: 90px;
  color: rgba(255, 255, 255, 0.3);
}
.in {
  background: #4f88ff;
}
.total {
  p {
    line-height: 30px;
    color: #fff;
    font-size: 16px;
  }
}

.allin {
  background-color: #5050ff;
}
.allout {
  background: #f49b3b;
}
.out {
  background: #f26075;
}
.time {
  p {
    color: #666666;
  }
}
</style>