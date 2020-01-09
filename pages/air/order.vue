<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
                <OrderForm :data="infoData"/>       

            <!-- 侧边栏 -->
            <OrderAside :data="infoData"/>
        </el-row>
    </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue";
import OrderAside from "@/components/air/OrderAside.vue";
export default {
    data () {
        return {
            infoData:{
                insurances: [], // 初始化保险数据
                seat_infos: {}
            }      
        }
    },
     components: {
        OrderForm,
        OrderAside
    },
    mounted(){
        const {id,seat_xid} = this.$route.query;
        this.$axios({
            url:'/airs/'+id,
            params:{
                seat_xid
            }
        }).then(res =>{
            this.infoData = res.data;
            // console.log(res)
        })
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>