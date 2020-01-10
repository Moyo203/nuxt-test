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
        <p class="textContent">
            <a v-html="dataList.content">{{dataList.content}}</a>
        </p>
        <img
          src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
          alt
        />
        <p class="tu">图：塞班岛。 by第5季旅游</p>
        <p>
          一、怎样用6000块玩转塞班？
          大多数出境游客人不做预算或最终花费远远超出预算，对预算的合理分配对控制我们旅行的花费就很重要了，如何只花6000块玩转塞班岛，对预算超支say no？下面从5个方面来为您一一解读：机票+酒店、岛上交通、玩乐项目、吃以及购买纪念品。
          1.怎样订机票+酒店性价比最高？
          机票和酒店的花销往往会占据我们旅行大半的花销，假设机票酒店为塞班行预算的一半，剩下的吃行玩购为预算的另一半，如果能在机票酒店这部分省下钱，也就意味着在塞班岛用来吃行玩购的钱就增加了
        </p>
        <div class="four_icon">
          <div class="ctrl-item">
            <i class="el-icon-edit-outline"></i>
            <p>评论(100)</p>
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
            <p>点赞(100)</p>
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
      dataList:[]
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
  img {
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