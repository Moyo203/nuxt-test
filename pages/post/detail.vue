<template>
  <div class="w">
    <el-row>
      <el-col :span="17" class="left">
        <el-breadcrumb separator="/" class="mianbao">
          <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
          <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
        </el-breadcrumb>

        <h1>{{dataList.title}}</h1>
        <hr color="#dddddd" />
        <p class="gl">攻略：{{dataList.created_at|formatDate}}阅读：{{dataList.watch}}</p>
        <!-- 文章渲染 -->
        <p class="textContent" v-html="dataList.content"></p>
     
        <div class="four_icon">
          <div class="ctrl-item">
            <i class="el-icon-edit-outline"></i>
            <p>评论({{leng}})</p>
          </div>
          <div class="ctrl-item">
            <i class="el-icon-star-off"></i>
            <p>收藏</p>
          </div>
          <div class="ctrl-item">
            <i class="el-icon-share"></i>
            <p>分享</p>
          </div>
          <div class="ctrl-item">
            <i class="el-icon-success"></i>
            <p>点赞({{dataList.like}})</p>
          </div>
        </div>
        <div class="comment">
          <p>评价</p>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
          <div class="upbtn">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-button type="primary" class="btn1">提交</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="7">我是7分</el-col>
    </el-row>
  </div>
</template>

<script>
 import moment from 'moment'
export default {
  data() {
    return {
      textarea: '',
      dataList:[],
      leng:0
    }
  },
  props: {
    // 数据
    data: {
      type: Object,
      // 默认是空数组
      default() {
        return {}
      }
    }
  },
   filters: {
      formatDate: function (value) {
        return moment(value).format('YYYY-MM-DD')
      }
    },
   mounted () {
    const{id} = this.$route.query
    this.$axios({
      url:'/posts/'+id,
      parmas:{
        id
      }
    }).then(res=>{
    this.dataList =res.data
    this.leng = res.data.comments.length
      console.log(this.dataList)
    })
  },

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>

.left {
  .mianbao {
    margin: 20px 0 30px 0;
  }
  hr {
    margin-top: 20px;
  }
  .gl {
    color: #999;
    padding: 20px;
    text-align: right;
  }
  /deep/img {
    max-width: 700px !important;
    margin: 10px 0;
  }
  .tu {
    color: rgb(153, 153, 153);
  }
  .four_icon {
    justify-content: center;
    display: flex;
    padding: 50px 0 30px;
    .ctrl-item {
      margin: 0 20px;
      font-size: 20px;
      text-align: center;
      cursor: pointer;
      i {
        display: block;
        font-size: 28px;
        color: orange;
      }
      p {
        margin-top: 5px;
        font-size: 14px;
        color: #999;
      }
    }
  }
  .textContent {
  font-size: 14px;

  a {
    color: #666;
  }
}
  .comment {
    p {
      font-weight: 400;
      font-size: 18px;
      margin-bottom: 20px;
    }
    .btn1 {
      padding: 7px 15px;
      font-size: 12px;
      border-radius: 3px;
      height: 30px;
      line-height: 1;
    }
    .upbtn {
      justify-content: space-between;
      display: flex;
      margin-top: 10px;
      /deep/.el-upload--picture-card {
        width: 100px;
        height: 100px;
        line-height: 100px;
      }
    }
  }
}
.w {
  width: 1000px;
  margin: 0 auto;
}
</style>