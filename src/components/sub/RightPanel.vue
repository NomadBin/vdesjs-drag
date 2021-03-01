<template>
  <div class="rightPanel">
    <!-- 位置：<el-input-number  size="mini" v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number> -->
    <div class="rightPanelItems" v-if="flag">
      <el-row
        ><span
          class="rightPanel-rightPanelIitems__span"
          v-if="currentData.description"
          >{{ currentData.description }}</span
        ></el-row
      >
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
              <el-select v-model="item.value.chooseValue" placeholder="请选择">
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
                <i class="el-icon-remove-outline" @click="deleteThisCol(i)"></i>
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
      </div>
      <div class="bootomDelete" @click="removeThis">
        <el-button type="danger" round>删除</el-button>
      </div>
    </div>
    <div v-else>
      <p>还没有数据</p>
      <p>拖动左侧组件来生成你的页面吧！</p>
    </div>

    <!-- 实时获取当前是否有数据，来决定右侧面板所显示的页面 -->
    <div style="display: none">
      {{ currentData }}
    </div>
  </div>
</template>
<script>
import IconList from "../pcomp/IconList.vue";
import ImageStore from "../pcomp/ImageStore.vue";
import MyTable from "../pcomp/MyTable.vue";
export default {
  components: {
    IconList,
    ImageStore,
    MyTable,
  },
  data() {
    return {
      num: 3,
      flag: false,
    };
  },
  computed: {
    currentData() {
      let data = this.$store.getters.currentData;
      if (typeof data == "undefined") {
        this.flag = false;
        return { propValues: [] };
      } else {
        this.flag = true;
      }
      return data;
    },
  },
  methods: {
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
<style>
.rightPanel {
  background-color: white;
  width: 300px;
  height: calc(100vh - 85px);
  box-shadow: -2px 0px 4px 0px rgba(0, 0, 0, 0.1);
  overflow-x: hidden;
  overflow-y: scroll;
}
.rightPanelItems {
  padding: 20px;
  padding-left: 10px;
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
.rightPanel-rightPanelIitems__span {
  margin: 0 20px 0 20px;
}
</style>
