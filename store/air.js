export const state = () =>({
    history:[],
    allPrice:0
});
export const mutations = {
    // 历史记录
    setHistory(state,data){
        state.history.unshift(data)
    },
    // 总价格
    setAllPrice(state,price){
        state.allPrice = price
    }
}