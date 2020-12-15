import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state: {
        //拖动到界面的组件数据
        list: [],

        // 当前选择的对象（利用了浅拷贝原理）
        myItem:{
        
        },
        // 存储所有dom
        domList: {

        },

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
        },
        // 当前模式 h5、pc
        mode: "h5"
    },
    getters: {
        // 当前选择的元素
        currentData: state => {
            // let data = null;
            // if (
            //     state.currentColIndex != -1 &&
            //     state.list[state.currentSelectListIndex].cols != null
            // ) {
            //     // 选择的是布局下的元素
            //     data = state.list[state.currentSelectListIndex].cols[state.currentColIndex]
            //         .list[state.currentColDataIndex];
            // } else {
            //     data = state.list[state.currentSelectListIndex];
            // }
            // return data;
            return state.myItem;
        },
        currentMode: state => {
          return state.mode
        },
        currentList: (state,getters) => {
          return state.list.filter(v => v.mode === getters.currentMode)
        // return state.list;
        }
    },
    mutations: {
        // 初始化组件数据
        initList(state, payload) {
            state.list = payload
        },

        removeEvent(state, payload) {
            state.myItem.events.splice(payload, 1);
        },
        addEvent(state, payload) {
            state.myItem.events.push(payload)
        },

        updateDom(state, payload) {
            state.domList[payload.name] = payload.domObj
        },

        updateMyItem(state, payload) {
            state.myItem = payload
        },
        deleteMyItem(state) {
            // for(let key in state.myItem) {
            //     delete state.myItem[key]
            // }
            function deleteItem(list) {
                for(var i=0; i< list.length; i++) {
                    if(list[i].id == state.myItem.id) {
                        list.splice(i, 1)
                        state.myItem = {};
                        break;
                    }
                    if(list[i].componentName == "PcLayout") {
                        for(var j=0; j < list[i].cols.length; j++) {
                            deleteItem(list[i].cols[j].list)
                        }
                    }
                    if(list[i].componentName == "Plate") {
                        deleteItem(list[i].cols[0].list)
                    }
    
                }
            }
            deleteItem(state.list)
           
        },
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
        },
        // 切换设备
        selectDevice(state, payload) {
            state.mode = payload
        }
    }
})

export default store
