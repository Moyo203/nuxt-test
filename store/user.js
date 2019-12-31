// 用户管理
export const state = () => ({
    // 采用接口返回的数据结构
    userInfo: {
        token: "",
        user: {},
    },
}) 

export const mutations = {
    setUserInfo(state,data){
        state.userInfo=data
    }
};

export const actions = {
    login(store,data){
        // console.log(store)
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        }).then(res => {
            // console.log(res.data);
            this.$router.back()
            store.commit("setUserInfo",res.data)
            return true
        })   
    },
    // 发送验证码
    sendCaptcha(store,data){
        return this.$axios({
            url:'/captchas',
            method:'POST',
            data:{
                tel:data
            }
        })
    },
    // 注册
    register(store,data){
        return  this.$axios({
            url: `/accounts/register`,
            method: 'POST',
            data
          }).then(res => {
            // console.log(res.data)
            // this.$message.success('注册成功')
            this.$router.back()
            store.commit("setUserInfo",res.data)
            return true
          })
    }
};