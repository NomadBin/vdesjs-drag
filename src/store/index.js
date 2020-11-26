import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state: {
        //拖动到界面的组件数据
        list: [],
        //全局id
        globalId: 0,
        currentSelectListIndex: 0,
        currentColIndex: -1,
        currentColDataIndex: -1,
        //控制右侧面板切换的属性
        rightPanelClass: {
            animateClass: "",
            iconClass: "el-icon-arrow-right",
            foldClass: "rightFold"
        }
    },
    getters: {
        // 当前选择的元素
        currentData: state => {
            let data = null;
            if (
                state.currentColIndex != -1 &&
                state.list[state.currentSelectListIndex].cols != null
            ) {
                // 选择的是布局下的元素
                data = state.list[state.currentSelectListIndex].cols[state.currentColIndex]
                    .list[state.currentColDataIndex];
            } else {
                data = state.list[state.currentSelectListIndex];
            }
            return data;
        }
    },
    mutations: {
        //切换当前选择元素下标
        swithIndex(state, payload) {
            state.currentSelectListIndex = payload
            state.currentColIndex = -1
            state.currentColDataIndex = -1
        },
        //切换布局下元素的选择下标
        swithChildIndex(state, payload) {
            state.currentSelectListIndex = payload.listIndex
            state.currentColIndex = payload.colIndex
            state.currentColDataIndex = payload.colDataIndex
        },
        //右侧面板的展开与伸缩
        rightPanelFold(state) {
            if (state.rightPanelClass.animateClass == "" || state.rightPanelClass.animateClass == "myBackInRight") {
                state.rightPanelClass.animateClass = "myBounceOutRight"
                state.rightPanelClass.foldClass = "leftFold"
                state.rightPanelClass.iconClass = "el-icon-arrow-left"
            } else {
                state.rightPanelClass.animateClass = "myBackInRight"
                state.rightPanelClass.foldClass = "rightFold"
                state.rightPanelClass.iconClass = "el-icon-arrow-right"

            }
        },
        layoutAddCols(state) {
            var col = {
                span: 1,
                list: [],
            };
            state.list[state.currentSelectListIndex].cols.push(col)
        },

        //清空数据
        deleteAll(state) {
            state.list = [];
            state.currentSelectListIndex = 0;
            state.currentColIndex = -1;
            state.currentColDataIndex = -1;

        },
        globalIdSet(state, payload) {
            state.globalId = payload

        },
        //globalId自增
        globalIdInc(state) {
            state.globalId = state.globalId + 1
        }
    }
})

export default store