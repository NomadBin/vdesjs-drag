import Vue from 'vue'
import Vuex from 'vuex'
import { $, deepCopy } from '@/utils/utils'
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
        snapshotData: [], // 编辑器快照数据
        snapshotIndex: -1, // 快照索引
        // 参考线
        referenceLine: {
            col: [],
            row: []
        },
        // 单属性缓存
        singeStyleCahe: {
            left: -1,
            top: -1
        }
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
        // 是否能撤销快照记录
        hasRevocationSnaphot: state => {
            if (state.snapshotIndex <= 0) {
                return false
            }
            return true
        },
        // 是否能恢复快照记录
        hasForwardSnaphot: state => {
            if (state.snapshotIndex == state.snapshotData.length - 1) {
                return false
            }
            return true
        }
    },
    mutations: {
        // 添加参考线
        addReferenceLine(state, { type, position }) {
            state.referenceLine[type].push(position)
        },
        // 移除参考线
        removeReferenceLine(state, { type, index }) {
            state.referenceLine[type].splice(index, 1)

        },
        // 撤销
        revocation(state) {
            if (state.snapshotIndex > 0) {
                state.snapshotIndex--
                console.log(deepCopy(state.snapshotData[state.snapshotIndex]))
                state.list = deepCopy(state.snapshotData[state.snapshotIndex])
                // Vue.set(state, 'list', deepCopy(state.snapshotData[state.snapshotIndex]))
            }
        },
        // 恢复
        forward(state) {
            if (state.snapshotIndex < state.snapshotData.length - 1) {
                state.snapshotIndex++
                state.list = deepCopy(state.snapshotData[state.snapshotIndex])
            }
        },
        // 记录快照
        recordSnapshot(state) {
            state.snapshotData[++state.snapshotIndex] = deepCopy(state.list)
            // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
            if (state.snapshotIndex < state.snapshotData.length - 1) {
                state.snapshotData = state.snapshotData.slice(0, state.snapshotIndex + 1)
            }
        },
        compose(state) {

            const components = []
            state.areaData.components.forEach(component => {
                if (component.componentName != 'Group') {
                    components.push(component)
                } else {
                    // 如果要组合的组件中，已经存在组合数据， 则需要提前拆分
                    const parentStyle = { ...component.mStyle }
                    const subComponents = component.propValues
                    const editorRect = state.freeFrame.getBoundingClientRect()

                    subComponents.forEach(component => {
                        decomposeComponent(component, editorRect, parentStyle)
                        console.log("component:" + JSON.stringify(component))
                        components.push(component)
                    })

                    this.commit('batchDeleteComponent', component.propValues)
                }

            })
            console.log("组合组件")
            this.commit('batchDeleteComponent', state.areaData.components)
            state.globalId = state.globalId + 1
            console.log('globalId' + state.globalId)
            state.list.push({
                id: state.globalId,
                componentName: 'Group',
                mode: 'free',
                mStyle: {
                    ...state.areaData.style,
                    "opacity": 1,
                    "rotate": 0,
                },
                propValues: components,
                groupStyle: {},
            })

            eventBus.$emit('hideArea')

            this.commit('setCurComponent', {
                component: state.list[state.list.length - 1],
                index: state.list.length - 1
            })
            state.areaData.components = []

            console.log('画布数据长度：' + state.list.length)
        },
        decompose(state) {
            const parentStyle = { ...state.myItem.mStyle }
            const compoents = state.myItem.propValues
            const editorRect = state.freeFrame.getBoundingClientRect()
            // this.commit('deleteMyItem')
            for (let i = 0; i < state.list.length; i++) {
                if (state.list[i].id == state.myItem.id) {
                    state.list.splice(i, 1)
                    state.myItem = {};
                    break;
                }
            }
            compoents.forEach(component => {
                decomposeComponent(component, editorRect, parentStyle)
                this.commit('listPusn', component)
            })
        },
        setCurComponent(state, { component, index }) {
            state.myItem = component
            state.currentSelectListIndex = index

        },
        batchDeleteComponent(state, deleteData) {
            deleteData.forEach(component => {
                for (let i = 0, len = state.list.length; i < len; i++) {
                    console.log(i)
                    if (component.id == state.list[i].id) {
                        state.list.splice(i, 1)
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
            console.log('listPushPaayload:' + JSON.stringify(payload))
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
        updatemyItemStyle(state, { left, top, width, height, rotate }) {
            if (left) state.myItem.mStyle.left = left
            if (top) state.myItem.mStyle.top = top
            if (width) state.myItem.mStyle.width = width
            if (height) state.myItem.mStyle.height = height
            if (rotate) state.myItem.mStyle.rotate = rotate



        },
        updateMyItemSingleStyle(state, { key, value }) {
            console.log('updateMyItemSingleStyle:' + key + ":" + value)
            // if (state.singeStyleCahe[key] != value) {
            //     state.myItem.mStyle[key] = value
            //     state.singeStyleCahe[key] = value
            //     setTimeout(() => {
            //         state.singeStyleCahe = {
            //             left: -1,
            //             top: -1
            //         }
            //     }, 1000);
            // }

            state.myItem.mStyle[key] = value

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
            state.referenceLine.row = []
            state.referenceLine.col = []

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
        cleanAreaData(state) {
            state.areaData.components = []
        }
    }
})

export default store
