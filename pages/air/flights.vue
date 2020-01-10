<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList"/>
                
                <!-- 航班头部布局 -->
                <FlightsListHead/>
                
                
                <!-- 航班信息 -->
                <FlightsItem v-for="(item,index) in flightList" :key="index" :data='item'/>
           
           
                  <!-- 分页组件 -->
                <!-- size-change: 切换条数时候触发事件
                current-change: 切换你页数时候触发的事件
                current-page: 当然显示的页面
                total: 总条数 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
            </div>

            <!-- 侧边栏 -->
            <FlightsAside/>
        </el-row>
    </section>
</template>

<script>


import FlightsListHead from '@/components/air/flightsListHead.vue'
import FlightsItem from '@/components/air/flightsItem.vue'
import FlightsFilters from "@/components/air/flightsFilters.vue"
import FlightsAside from '@/components/air/flightsAside.vue'
export default {
    data(){
        return {
            flightsData:{
                info:{},
                options:{},
                flights:[]
            },
             // 缓存的变量，当该变量一旦被赋值之后不会被修改
            cacheFlightsData: {
                info: {},
                options: {},
                flights:[]
            },

             
              // 当前的页面
            pageIndex: 1,
            // 当然的条数
            pageSize: 5,
            // 总条数
            total: 0,
        }
    },
    components:{
        FlightsListHead,
        FlightsItem,
        FlightsFilters,
        FlightsAside
    },
    computed:{
        flightList(){
            if(!this.flightsData.flights) return [];
            return this.flightsData.flights.slice(
                (this.pageIndex - 1) * this.pageSize,this.pageIndex * this.pageSize
                );
        }
    },
    watch:{
        $route(){
            this.$axios({
            url: "/airs",
            params: this.$route.query
        }).then(res => {
            // 赋值给总数据，但是该变量中的flights在过滤时候会被修改
            console.log(res)
           this.flightsData = res.data
           this.cacheFlightsData = {...res.data}
            this.total = this.flightsData.total;
        
            this.pageIndex = 1
         
        })
        }
    },
    mounted(){
        // 请求机票的列表，（请求尽量放到父组件中，好处方便管理数据，和组件之间的数据共享）
        this.$axios({
            url: "/airs",
            params: this.$route.query
        }).then(res => {
            // 赋值给总数据，但是该变量中的flights在过滤时候会被修改
            // console.log(res)
           this.flightsData = res.data
           this.cacheFlightsData = {...res.data}
            this.total = this.flightsData.total;
            console.log(this.flightsData)
            // 切割第一页
        //    this.flightList = this.flightsData.flights.slice(0,5)
         
        })
    },
    methods:{
        // 切换分页条数时候触发
        handleSizeChange(value){
            this.pageSize = value;
            // this.flightList = this.flightsData.flights.slice(
            //     (this.pageIndex - 1) * this.pageSize,this.pageIndex * this.pageSize
            //     )
        },
        // 切换页数时候触发的事件
        handleCurrentChange(value){
            this.pageIndex = value;
            // this.flightList = this.flightsData.flights.slice(
            //     (this.pageIndex - 1) * this.pageSize,this.pageIndex * this.pageSize
            //     )
        },
        //  传递过滤
        setDataList(arr){
            this.flightsData.flights = arr;
            this.total = arr.length
        }
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>