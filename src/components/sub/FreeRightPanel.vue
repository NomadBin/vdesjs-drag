<template>
  <div class="rightPanel">
    <el-tabs v-model="activeName">
      <el-tab-pane label="属性" name="prop">
        <div class="rightPanelItems" v-if="flag">
          <el-row>
            <el-col :span="10">x坐标:</el-col>
            <el-col :span="14"
              ><el-input
                v-model="currentData.mStyle.left"
                placeholder=""
              ></el-input
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="10">y坐标:</el-col>
            <el-col :span="14"
              ><el-input
                v-model="currentData.mStyle.top"
                placeholder=""
              ></el-input
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="10">宽度:</el-col>
            <el-col :span="14"
              ><el-input
                v-model="currentData.mStyle.width"
                placeholder=""
              ></el-input
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="10">高度:</el-col>
            <el-col :span="14"
              ><el-input
                v-model="currentData.mStyle.height"
                placeholder=""
              ></el-input
            ></el-col>
          </el-row>

          <div v-for="(item, i) in currentData.propValues" :key="i">
            <div v-if="item.type == 'text'">
              <el-row>
                <el-col :span="10">{{ item.label }}:</el-col>
                <el-col :span="14"
                  ><el-input v-model="item.value" placeholder=""></el-input
                ></el-col>
              </el-row>
            </div>
            <div v-if="item.type == 'num'">
              <el-row>
                <el-col :span="10">{{ item.label }}:</el-col>
                <el-col :span="14"
                  ><el-input-number
                    v-model="item.value"
                    label="描述文字"
                    size="mini"
                  ></el-input-number
                ></el-col>
              </el-row>
            </div>
            <div v-if="item.type == 'select'">
              <el-row>
                <el-col :span="10">{{ item.label }}:</el-col>
                <el-col :span="14">
                  <el-select
                    v-model="item.value.chooseValue"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="it in item.value.data"
                      :key="it.value"
                      :label="it.label"
                      :value="it.value"
                    >
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </div>
            <div v-if="item.type == 'color'">
              <el-row>
                <el-col :span="10">{{ item.label }}:</el-col>
                <el-col :span="14">
                  <el-color-picker v-model="item.value"></el-color-picker>
                </el-col>
              </el-row>
            </div>
            <div v-if="item.type == 'col'">
              <el-row>
                <el-col :span="10">{{ item.label }}:</el-col>
                <el-col :span="14">
                  <div v-for="(c, i) in currentData.cols" :key="i">
                    <el-input-number
                      v-model="c.span"
                      :min="1"
                      :max="24"
                      size="mini"
                    ></el-input-number>
                    <i
                      class="el-icon-remove-outline"
                      @click="deleteThisCol(i)"
                    ></i>
                  </div>
                  <p class="removeCol" @click="addCols">添加列</p>
                </el-col>
              </el-row>
            </div>
            <div v-if="item.type == 'iconList'">
              <el-row>
                <el-col :span="10">{{ item.label }}:</el-col>
                <el-col :span="14">
                  <icon-list :propIndex="i"></icon-list>
                </el-col>
              </el-row>
            </div>
            <div v-if="item.type == 'imageStore'">
              <!-- 图片库 -->
              <el-row>
                <el-col :span="10">{{ item.label }}:</el-col>
                <el-col :span="14">
                  <image-store
                    @complete="completeChoseImageStore($event, i)"
                  ></image-store>
                </el-col>
              </el-row>
            </div>
            <div v-if="item.type == 'numUnit'">
              <!-- 单位选择数 -->
              <el-row>
                <el-col :span="10">{{ item.label }}:</el-col>
                <el-col :span="12">
                  <el-input-number
                    v-model="item.value.num"
                    size="mini"
                  ></el-input-number
                  ><el-select
                    v-model="item.value.unit"
                    placeholder="请选择单位"
                    size="mini"
                  >
                    <el-option value="px"> px </el-option>
                    <el-option value="%"> % </el-option>
                    <el-option value="rem"> rem </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </div>
            <div v-if="item.type == 'switch'">
              <!-- 开关 -->
              <el-row>
                <el-col :span="10">{{ item.label }}:</el-col>
                <el-col :span="12">
                  <el-switch
                    v-model="item.value"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  >
                  </el-switch>
                </el-col>
              </el-row>
            </div>
            <div v-if="item.type == 'table'">
              <el-row>
                <el-col :span="10">{{ item.label }}:</el-col>
                <el-col :span="12">
                  <my-table :propIndex="i"></my-table>
                </el-col>
              </el-row>
            </div>
            <div v-if="item.type == 'distance'">
              <el-row>
                <el-col :span="10">{{ item.label }}:</el-col>
                <el-col :span="12">
                  <distance :propIndex="i"></distance>
                  <!-- <my-table :propIndex="i"></my-table> -->
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="bootomDelete" @click="removeThis">
            <el-button type="danger" round>删除</el-button>
          </div>
        </div>
        <div v-else>
          <p>还没有数据</p>
          <p>拖动左侧组件来生成你的页面吧！</p>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="templatesFlag" label="模板" name="template">
        <ul class="tplList">
          <li v-for="(item, i) in currentData.templates.data" :key="i">
            <div class="box">
              <img :src="item.previewImg" alt="" class="previewImg" />
              <el-button
                v-if="item.key == currentData.templates.chooseKey"
                class="usingRight"
                type="primary"
                round
                >正在使用</el-button
              >
              <div class="mask">
                <el-button @click="useTpl(i)" round>使用</el-button>
              </div>
            </div>
            <div class="name">
              {{ item.name }}
            </div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane class="events" v-if="eventsFlag" label="事件" name="event">
        <p>
          <span>事件列表</span>
          <el-button type="text" @click="eventsDialogVisibile = true"
            >添加</el-button
          >
        </p>
        <div class="list">
          <div class="item" v-for="(item, i) in currentData.events" :key="i">
            <span
              >{{ item.triggerEventValue.label }} --
              {{ item.targetObjValue.label }} --
              {{ item.actionValue.label }}</span
            >
            <el-button @click="deleteEvent(i)" type="text">删除</el-button>
          </div>
        </div>
        <el-dialog
          title="添加事件"
          :visible.sync="eventsDialogVisibile"
          style="margin-left: 30vw"
        >
          <div>
            <div class="el-row">
              <div class="title el-col-4">触发事件</div>
              <div class="value el-col-20">
                <el-select v-model="triggerEventValue">
                  <el-option
                    v-for="(item, i) in triggerEventOptions"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="el-row">
              <div class="title el-col-4">目标对象</div>
              <div class="value el-col-20">
                <el-select v-model="targetObjValue" @change="setActionOptions">
                  <el-option
                    v-for="(item, i) in targetObjOptions"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="el-row">
              <div class="title el-col-4">动作</div>
              <div class="value el-col-20">
                <el-select v-model="actionValue">
                  <el-option
                    v-for="(item, i) in actionOptions"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>

            <el-form label-width="100px">
              <el-form-item
                v-for="(item, i) in actionAndFormData[actionValue]"
                :label="item.label"
                :key="i"
              >
                <el-input
                  v-if="item.type == 'text'"
                  v-model="item.value"
                ></el-input>
                <el-slider
                  v-if="item.type == 'float'"
                  v-model="item.value"
                  :format-tooltip="formatTooltipFloat"
                >
                </el-slider>
              </el-form-item>
              {{ actionAndFormData }}
            </el-form>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="eventsDialogVisibile = false">取 消</el-button>
            <el-button type="primary" @click="addEvent">添 加</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>

    <!-- 实时获取当前是否有数据，来决定右侧面板所显示的页面 -->
    <div>
      {{ currentData }}
    </div>
  </div>
</template>
<script>
import event from "@/common/js/event";
import Distance from "../pcomp/Distance.vue";
import IconList from "../pcomp/IconList.vue";
import ImageStore from "../pcomp/ImageStore.vue";
import MyTable from "../pcomp/MyTable.vue";
export default {
  components: {
    IconList,
    ImageStore,
    MyTable,
    Distance,
  },
  data() {
    return {
      num: 3,
      flag: false,
      activeName: "prop",
      eventsDialogVisibile: false,
      triggerEventValue: "click",
      triggerEventOptions: [
        {
          value: "click",
          label: "单击",
        },
        {
          value: "dbclick",
          label: "双击",
        },
        {
          value: "mouseover",
          label: "鼠标移入",
        },
        {
          value: "mouseout",
          label: "鼠标移出",
        },
        {
          value: "load",
          label: "完成加载",
        },
      ],
      targetObjValue: "",
      targetObjOptions: [
        {
          value: "currentObj",
          label: "当前元素",
        },
        {
          value: "document",
          label: "整个文档",
        },
      ],
      actionValue: "",
      actionOptions: [],

      targetObjAndAction: {
        currentObj: [
          {
            value: "setProperty",
            label: "设置属性",
          },
          {
            value: "scale",
            label: "缩放",
          },
          {
            value: "runAnimate",
            label: "执行动画",
          },
        ],
        document: [
          {
            value: "dialogNotice",
            label: "提示框",
          },
        ],
      },
      actionAndFormData: {
        setProperty: [
          {
            label: "宽度",
            key: "width",
            type: "text",
            value: "",
          },
          {
            label: "高度",
            key: "height",
            type: "text",
            value: "",
          },
        ],
        scale: [
          {
            label: "x轴缩放",
            key: "xscale",
            type: "float",
            value: 10,
          },
          {
            label: "y轴缩放",
            key: "yscale",
            type: "float",
            value: 10,
          },
        ],
      },
      setPropertyDataFormData: {
        width: "100",
        height: "100",
      },
    };
  },
  computed: {
    currentData() {
      let data = this.$store.state.myItem;
      console.log(data);
      if (typeof data.id == "undefined") {
        this.flag = false;
        return { propValues: [] };
      } else {
        this.flag = true;
      }

      return data;
    },
    domList() {
      return this.$store.state.domList;
    },
    eventsFlag() {
      if (typeof this.currentData.events == "undefined") {
        return false;
      }
      return true;
    },
    templatesFlag() {
      if (typeof this.currentData.templates == "undefined") {
        return false;
      }
      return true;
    },
  },
  methods: {
    formatTooltipFloat: function (val) {
      return val / 10;
    },
    deleteEvent: function (i) {
      console.log("delete");
      // this.currentData.events.splice(i, 1)
      this.$store.commit("removeEvent", i);
    },
    addEvent: function () {
      let that = this;
      var data = this.deepClone(this.actionAndFormData[this.actionValue]);
      let obj = {
        triggerEventValue: this.getTriggerEventValueObj(this.triggerEventValue),
        targetObjValue: this.getTargetObjValueObj(this.targetObjValue),
        actionValue: this.getActionValueObj(this.actionValue),
        targentObjId: this.currentData.componentName + this.currentData.id,
        data: data,
      };
      obj = event.initMyFunction(obj);
      console.log(JSON.stringify(obj));
      this.$store.commit("addEvent", obj);
      event.domToAddEventListner(obj);
      // this.domToAddEventListner(obj);

      this.triggerEventValue = "";
      this.targetObjValue = "";
      this.actionValue = "";
      this.eventsDialogVisibile = false;
    },
    deepClone(obj) {
      var _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
      return objClone;
    },
    getTriggerEventValueObj: function (val) {
      for (let i = 0; i < this.triggerEventOptions.length; i++) {
        const item = this.triggerEventOptions[i];
        if (item.value == val) {
          return item;
        }
      }
      return {};
    },
    getTargetObjValueObj: function (val) {
      for (let i = 0; i < this.targetObjOptions.length; i++) {
        const item = this.targetObjOptions[i];
        if (item.value == val) {
          return item;
        }
      }
      return {};
    },
    getActionValueObj: function (val) {
      for (let i = 0; i < this.actionOptions.length; i++) {
        const item = this.actionOptions[i];
        if (item.value == val) {
          return item;
        }
      }
      return {};
    },

    setActionOptions: function (val) {
      console.log(this.targetObjAndAction[val]);
      this.actionOptions = this.targetObjAndAction[val];
      this.actionValue = "";
    },
    useTpl: function (i) {
      this.currentData.templates.chooseKey = this.currentData.templates.data[
        i
      ].key;
    },
    addCols: function () {
      this.$store.commit("layoutAddCols");
    },
    deleteThisCol: function (i) {
      this.currentData.cols.splice(i, 1);
    },
    removeThis: function () {
      this.$store.commit("deleteMyItem");
    },
    completeChoseImageStore: function (obj, i) {
      console.log(JSON.stringify(obj));
      this.currentData.propValues[i].value = obj[0].url;
    },
  },
  created: function () {
    console.log(this.currentData);
  },
};
</script>
<style scoped>
.events > .list {
  background-color: #f8f8f8;
}
.events > .list > .item {
  padding: 2px 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.events > .list > .item > span {
  cursor: pointer;
  font-size: 14px;
}
.events > .list > .item > .el-button {
  font-size: 14px;
}
.tplList > li {
  margin-bottom: 20px;
}
.tplList > li > .box {
  position: relative;
  overflow: hidden;
  width: 230px;
  height: 70px;
}
.tplList > li > .name {
  width: 230px;
}
.usingRight {
  position: absolute;
  top: 10px;
  padding: 9px 25px;
  right: -25px;
  font-size: 12px;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  opacity: 0;
}
.mask:hover {
  opacity: 1;
}
.previewImg {
  width: 230px;
  height: 70px;
}
.rightPanel {
  background-color: white;
  width: 300px;
  height: calc(100vh - 60px);
  box-shadow: -2px 0px 4px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.rightPanelItems {
  padding: 10px;
  padding-left: 5px;
  font-size: 13px;
}
.el-row {
  margin-bottom: 15px;
  line-height: 40px;
}
.el-icon-remove-outline {
  color: rgb(199, 23, 23);
}
.el-icon-remove-outline:hover {
  color: red;
}
.removeCol {
  color: blue;
  font-size: 13px;
  cursor: pointer;
}
.bootomDelete {
  position: relative;
  bottom: 0px;
  width: 300px;
  text-align: center;
}
</style>
