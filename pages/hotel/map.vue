<template>
  <div style="padding:100px">
    <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=55ee7ba22ce81ba55495bfaea11a6c3e&plugin=AMap.Driving,AMap.Transfer,AMap.Walking"
    ></script>
    <!-- 地图的容器 -->
    <el-row>
      <el-col :span="12">
        <div id="container"></div>
      </el-col>
      <el-col :span="6" :offset="1">
        <div>
          <span
            v-for="(item,index) in ['驾车','公交','步行','骑行']"
            :key="index"
            @click="handleChangeTab(index)"
            :class="{active:current === index}"
          >{{item}}</span>
          <el-form>
            <el-form-item>
              <el-input placeholder="起点位置" v-model="start"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="终点位置" v-model="end"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="handleSearch">搜索</el-button>
            </el-form-item>
            <el-form-item v-if="routes[0] && current === 0">
              <div>距离：{{ Number(routes[0].distance / 1000).toFixed(1) }}公里</div>
              <div>时间：{{ routes[0].time }}</div>
              <div>高速费：{{ routes[0].tolls }}元</div>
              <div>高速的距离：{{ Number(routes[0].tolls_distance / 1000).toFixed(1) }}公里</div>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
      start: '',
      end: '',
      driving: '',
      // 公交对象
      transfer: '',
      // 步行对象
      walking: '',
      routes: []
    }
  },
  methods: {
    handleChangeTab(index) {
      this.current = index
    },
    handleSearch() {
      var points = [
        { keyword: this.start, city: '全国' },
        { keyword: this.end, city: '全国' }
      ]
      if (this.current == 0) {
        this.driving.search(points, (status, result) => {
          // 未出错时，result即是对应的路线规划方案
          if (status === 'complete') {
            this.routes = result.routes

            // 得到分钟
            const time = this.routes[0].time / 60
            let hours, min, day
            if (time >= 60) {
              hours = Math.floor(time / 60)
              min = time % 60
              this.routes[0].time = `${hours}小时${Number(min).toFixed(2)}分钟`
            }

            if (hours >= 24) {
              day = Math.floor(hours / 24)
              hours = hours % 24
              this.routes[0].time = `${day}天${hours}小时${Number(min).toFixed(
                2
              )}分钟`
            }

            if (time < 60) {
              this.routes[0].time = `${Number(time).toFixed(2)}分钟`
            }
          }
        })
      }
      if (this.current == 1) {
        this.transfer.search(points, (status, result) => {
          // 未出错时，result即是对应的路线规划方案
          if (status === 'complete') {
            // this.routes = result.routes
              console.log(result)    

    
          }
        })
      }
    }
  },
  mounted() {
    var map = new AMap.Map('container', {
      zoom: 11, //级别
      // center: [113.427818, 23.12933], //中心点坐标
      viewMode: '3D' //使用3D视图
    })

    //驾车
    this.driving = new AMap.Driving({
      map,
      // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
      policy: AMap.DrivingPolicy.LEAST_TIME
    })
    // 公交
    this.transfer = new AMap.Transfer({
      map,
      // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
      policy: AMap.TransferPolicy.LEAST_TIME
    })

    // 步行
    this.walking = new AMap.Walking({
      map
    })
  }
}
</script>

<style scoped lang="less">
#container {
  width: 500px;
  height: 500px;
}
.active {
  color: red;
  text-decoration: underline;
}
</style>