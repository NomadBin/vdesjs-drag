<template>
  <div>
    <div class="card">
      <div
        class="item"
        v-for="(item, i) in tableDatas"
        :key="i"
        @mouseenter="itemMouseEnter(i)"
        @mouseleave="itemMouseLeave(i)"
      >
        <div>{{ item[tableStructs[0].key] }}</div>
        <div class="bar" :ref="`bar${i}`">
          <i class="icon el-icon-edit" @click="editItem(i)"></i>
          <i class="icon el-icon-delete" @click="deleteItem(i)"></i>
        </div>
      </div>
      <div class="bootom">
        <el-button size="mini" @click="addItem">添加</el-button>
      </div>
    </div>

    <el-dialog title="编辑数据" :visible.sync="dialogVisible">
      <div class="content">
        <div v-for="(item, i) in tableStructs" :key="i">
          <el-row v-if="item.type == 'text'">
            <el-col class="Mylabel" :span="6">
              <div>{{ item.label }}:</div>
            </el-col>
            <el-col class="control" :span="14">
              <el-input
                v-model="tableDatas[currentSelectIndex][item.key]"
                placeholder="请输入内容"
              ></el-input>
            </el-col>
          </el-row>

          <el-row v-if="item.type == 'imageStore'">
            <el-col class="Mylabel" :span="6">
              <div>{{ item.label }}:</div>
            </el-col>
            <el-col :span="7">
              <el-image
                style="width: 100px; height: 100px"
                :src="tableDatas[currentSelectIndex][item.key]"
                fit="fill"
              ></el-image>
            </el-col>
            <el-col class="control" :span="7">
              <image-store
                @complete="completeChoseImageStore($event, i, item.key)"
              ></image-store>
            </el-col>
          </el-row>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ImageStore from "./ImageStore.vue";
export default {
  components: { ImageStore },
  computed: {
    currentData() {
      return this.$store.getters.currentData;
    },
    tableDatas() {
      return this.currentData.propValues[this.propIndex].value.data;
    },
    tableStructs() {
      return this.currentData.propValues[this.propIndex].value.struct;
    },
  },
  props: {
    propIndex: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      dialogVisible: false,
      // 当前选择编辑那一列
      currentSelectIndex: 0,
      imageStoreDialogVisible: false,
    };
  },
  methods: {
    itemMouseEnter(i) {
      // this.$refs['bar' + i].style.display = "block";
      this.$refs[`bar${i}`][0].style.display = "block";
    },
    itemMouseLeave(i) {
      this.$refs[`bar${i}`][0].style.display = "none";
    },
    editItem(i) {
      this.dialogVisible = true;
      this.currentSelectIndex = i;
    },
    deleteItem(i) {
      this.tableDatas.splice(i, 1);
    },
    completeChoseImageStore: function (obj, i, key) {
      console.log(JSON.stringify(obj));
      this.tableDatas[this.currentSelectIndex][key] = obj[0].url;
    },
    addItem() {
      var obj = {};
      for (var i = 0; i < this.tableStructs.length; i++) {
        var struct = this.tableStructs[i];
        if (i == 0) {
          //赋值默认名称
          obj[struct.key] = "默认名称";
        } else {
          obj[struct.key] = "";
        }
      }
      console.log(JSON.stringify(obj));
      this.tableDatas.push(obj);
    },
  },
};
</script>
<style scoped>
.card {
  width: 100%;
  border: 1px solid #f0f0f0;
}
.item {
  width: 100%;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}
.bar {
  display: none;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  box-shadow: -20px 0 10px 10px #fff;
  padding-right: 6px;
}
.icon {
  cursor: pointer;
  margin-right: 3px;
}
.content {
  padding: 10px;
}
.Mylabel {
  text-align: right;
  padding-right: 20px;
}
.bootom {
  text-align: center;
}
</style>
