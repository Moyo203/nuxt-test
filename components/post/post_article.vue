<template>
  <div>
    <div>
      <h4 class="post-title">
        <a href>{{data.title}}</a>
      </h4>
      <p class="post-desc">
        <a v-html="data.content">{{data.content}}</a>
      </p>
      <div class="pic">
        <a href="#" v-for="(item2,index2) in data.images" :key="index2">
          <img :src="item2" />
        </a>
      </div>
      <div class="message">
        <i class="el-icon-location-outline"></i>
        <span>{{data.cityName}}</span>
        by
        <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{data.account.nickname}}
        <i class="el-icon-view"></i>
        {{data.watch}}
        <span class="like">{{data.like || 0}} &nbsp;&nbsp;赞</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    
     
    }
  },
     props: {
        // 数据
        data: {
            type: Object,
            // 默认是空数组
            default(){ return{}}
        }
    },

}
</script>

<style lang="less" scoped>
.pic {
  a {
    img {
      width: 215px;
      height: 150px;
    }
  }
}
.message {
  margin-top: 10px;
  font-size: 12px;
  color: #999;
  position: relative;
  img {
    position: absolute;
    top: -7px;
    left: 69px;
    width: 20px;
    height: 20px;
    border-radius: 100px;
    margin: 5px;
  }
  .like {
    font-size: 15px;
    color: orange;
    margin-left: 400px;
  }
}
.post-title {
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 15px;
  font-weight: 400;
  font-size: 18px;
}
.post-title:hover {
  color: orange;
}
.post-desc {
  margin-bottom: 15px;
  line-height: 1.5;
  font-size: 14px;
  height: 63px;
  overflow: hidden;
  -webkit-line-clamp: 3;
  a {
    color: #666;
  }
}
</style>