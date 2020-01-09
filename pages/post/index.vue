<template>
  <div class="w">
    <div class="left">
      <div @mouseleave="xxx()">
        <ul class="leftList">
          <li v-for="(item,index) in titleList" :key="index" @mouseover="hhh(index)">
            {{item.type}}
            <i class="el-icon-arrow-right"></i>
          </li>
        </ul>

        <ul
          v-for="(item,index) in titleList"
          :key="index"
          class="title"
          v-show="currentTab === index"
        >
          <li v-for="(item2,index2) in item.children" :key="index2">
            <nuxt-link :to="`/post?city=${item2.city}`">
              <span>{{index2+1}}{{item2.city}}</span>
              {{item2.desc}}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <span>推荐城市</span>
      <hr color="#dddddd" />
      <img src="https://f11.baidu.com/it/u=2465775762,1509670197&fm=72" alt />
    </div>

    <div class="right">
      <div class="search">
        <input type="text" placeholder="输入想去的地方  例如广州" :value="cityname"  id="incity"/>
        <i class="el-icon-search" @click="citySearch"></i>
      </div>
      <div class="search-recommend">
        推荐 :
        <nuxt-link :to="`/post?city=广州`">广州</nuxt-link>
        <nuxt-link :to="`/post?city=上海`">上海</nuxt-link>
        <nuxt-link :to="`/post?city=北京`">北京</nuxt-link>
     
      </div>
      <h4>推荐攻略</h4>
      <el-button class="btn1" type="primary" icon="el-icon-edit">写游记</el-button>
      <hr />
      <PostArticle />
    </div>
  </div>
</template>

<script>
import PostArticle from '@/components/post/post_article'
export default {
  data() {
    return {
      currentTab: 999,
      titleList: [],
      cityname:'',
    }
  },
  components: {
    PostArticle
  },
  mounted() {
    this.$axios({
      url: '/posts/cities'
    }).then(res => {
      const { data } = res.data
      this.titleList = data
      console.log(res)
    })
  },
  watch: {
    $route() {
      const { city } = this.$route.query
      this.cityname = city
    }
  },
  methods: {
    hhh(index) {
      this.currentTab = index
    },
    xxx() {
      this.currentTab = 111
    },
    citySearch(){
      var cname = document.querySelector("#incity").value
      this.cityname= cname
      this.$router.push({
        path:'/post',
        query:{
          city:this.cityname
        }
      })
    //  console.log(this.cityname)
    }
  }
}
</script>

<style lang="less" scoped>
.left {
  width: 300px;
  height: 500px;
  float: left;
  position: relative;
  .leftList {
    margin-top: 20px;
    width: 260px;
    margin-bottom: 20px;
    background-color: #fff;
    li {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      border-left: 1px solid #ddd;
      padding: 0 20px;
      font-size: 14px;
      i {
        margin-left: 140px;
      }
    }

    li:nth-child(1) {
      border-top: 1px solid #ddd;
    }
    li:hover {
      border-right: none;
    }
  }
  hr {
    margin-top: 15px;
    width: 260px;
  }
  img {
    width: 260px;
    display: block;
    margin-top: 10px;
  }
  .title {
    padding: 15px;
    border: 1px solid #ddd;
    width: 350px;
    height: 160px;
    font-size: 16px;
    color: #ccc;
    position: absolute;
    top: 20px;
    left: 259px;
    float: left;
    background-color: #fff;
    z-index: -1;
    li {
      margin-bottom: 14px;
      span {
        color: orange;
        margin-right: 10px;
      }
    }
  }
}
.right {
  width: 700px;
  margin-top: 20px;
  float: left;
  position: relative;
  z-index: -2;
  .search {
    width: 100%;
    box-sizing: border-box;
    height: 40px;
    line-height: 35px;
    border: 3px solid orange;
    input {
      width: 92%;
      line-height: 35px;
      outline: none;
      border: none;
      background: none;
      text-indent: 2em;
    }
    i {
      height: 35px;
      line-height: 29px;
      font-size: 23px;
      color: orange;
      font-weight: 700;
      margin-right: 10px;
    }
  }
  .search-recommend {
    padding: 10px 0;
    font-size: 12px;
    color: #666;
    a {
      margin-right: 5px;
    }
  }
  h4 {
    font-weight: 400;
    font-size: 18px;
    color: orange;
    width: 72px;
    line-height: 50px;
    border-bottom: 3px solid orange;
  }
  .btn1 {
    position: absolute;
    right: 6px;
    top: 80px;
  }
}
.w {
  width: 1000px;
  margin: 0 auto;
}
</style>