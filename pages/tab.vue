<template>
  <div>
      <div>
          <span v-for="(item,index) in list" :key="item" @click="hhh(index)" :class="{active:current===index}">{{item}}</span>      
      </div>
      <div >
          <ul v-if="current===0">
              <li v-for="item in datalist1" :key="item">{{item}}</li>            
          </ul>
          <ul v-if="current===1">
              <li v-for="item in datalist2" :key="item">{{item}}</li>            
          </ul>
          <ul v-if="current===2">
              <li v-for="item in datalist3" :key="item">{{item}}</li>            
          </ul>
      </div>
      
  </div>
</template>

<script>
export default {
    data () {
        return {
            list:['头条新闻','体育新闻','娱乐新闻'],
            datalist1:['头条新闻1','头条新闻2','头条新闻3'],    
            datalist2:['体育新闻1','体育新闻2','体育新闻3'],    
            datalist3:['娱乐新闻1','娱乐新闻2','娱乐新闻3'],    
            current:0,       
        }
    },
    methods:{
        hhh(index){
           this.current=index       
        }
    }

}
</script>

<style>
.active{
    color: red
}
</style>
