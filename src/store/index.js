import Vue from 'vue'
import Vuex from 'vuex'
import { $ } from '@/utils/utils'
import decomposeComponent from '@/utils/decomposeComponent'
import eventBus from '@/utils/eventBus'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state: {
        //拖动到界面的组件数据
        list: [],

        // 当前选择的对象（利用了浅拷贝原理）
        myItem: {

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
        // 当前模式 h5、pc、free
        mode: "h5",
        freeFrame: null,
        canvasStyleData: { // 页面全局数据
            width: 1200,
            height: 740,
            scale: 100,
        },

        areaData: { // 选中区域包含的组件以及区域位移信息
            style: {
                top: 0,
                left: 0,
                width: 0,
                height: 0,
            },
            components: [],
        },
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
        currentList: (state, getters) => {
            return state.list.filter(v => v.mode === getters.currentMode)
            // return state.list;
        },
    },
    mutations: {
        compose({ list, areaData, freeFrame, globalId }) {

            const components = []
            areaData.components.forEach(component => {
                if (component.componentName != 'Group') {
                    components.push(component)
                } else {
                    // 如果要组合的组件中，已经存在组合数据， 则需要提前拆分
                    const parentStyle = { ...component.mStyle }
                    const subComponents = component.propValues
                    const editorRect = freeFrame.getBoundingClientRect()

                    subComponents.forEach(component => {
                        decomposeComponent(component, editorRect, parentStyle)
                        components.push(component)
                    })
                }

            })
            console.log("组合组件")
            this.commit('batchDeleteComponent', areaData.components)
            this.commit('listPusn', {
                id: ++globalId,
                componentName: 'Group',
                mode: 'free',
                mStyle: {
                    ...areaData.style,
                    "opacity": 1, 
                    "rotate": 0,
                },
                propValues: components
            })

            eventBus.$emit('hideArea')

            this.commit('setCurComponent', {
                component: list[list.length - 1],
                index: list.length - 1
            })
            areaData.components = []

            console.log('画布数据长度：' + list.length)
        },
        setCurComponent(state, { component, index }) {
            state.myItem = component
            state.currentSelectListIndex = index

        },
        batchDeleteComponent({ list }, deleteData) {
            deleteData.forEach(component => {
                for (let i = 0, len = list.length; i < len; i++) {
                    console.log(i)
                    if (component.id == list[i].id) {
                        list.splice(i, 1)
                        break
                    }
                }
            })
        },
        // 获取自由画布
        getFreeFrame(state) {
            console.log('getFreeFrame')
            state.freeFrame = $("#freeFrame")
        },
        // 初始化组件数据
        initList(state, payload) {
            state.list = payload
        },
        listPusn(state, payload) {
            state.list.push(payload)
        },

        removeEvent(state, payload) {
            state.domList[state.myItem.events[payload].targentObjId].removeEventListener(state.myItem.events[payload].triggerEventValue.value, state.myItem.events[payload].myFunction)

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
        updatemyItemStyle({ myItem }, { left, top, width, height, rotate }) {
            if (left) myItem.mStyle.left = left
            if (top) myItem.mStyle.top = top
            if (width) myItem.mStyle.width = width
            if (height) myItem.mStyle.height = height
            if (rotate) myItem.mStyle.rotate = rotate

        },
        updateMyItemSingleStyle({ myItem }, { key, value }) {
            myItem.mStyle[key] = value
        },
        deleteMyItem(state) {
            // for(let key in state.myItem) {
            //     delete state.myItem[key]
            // }
            function deleteItem(list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].id == state.myItem.id) {
                        list.splice(i, 1)
                        state.myItem = {};
                        break;
                    }
                    if (list[i].componentName == "PcLayout") {
                        for (var j = 0; j < list[i].cols.length; j++) {
                            deleteItem(list[i].cols[j].list)
                        }
                    }
                    if (list[i].componentName == "Plate") {
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
            state.myItem = {};
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
        },
        // 设置选中区域的组件数据
        setAreaData(state, data) {
            state.areaData = data
        },
    }
})

export default store
