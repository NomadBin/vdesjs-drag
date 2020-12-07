<template>
  <div>
    <el-tabs tab-position="left">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-grid"></i></span>
        <h5>基础组件</h5>
        <draggable
          class="Compoent"
          :list="basicCompoents"
          :clone="cloneCompoents"
          :options="{
            sort: false,
          }"
          :group="{ name: 'components', pull: 'clone', put: false }"
        >
          <component-container
            v-for="(item, i) in basicCompoents"
            :key="i"
            :componentName="item.componentName"
            :name="item.name"
          >
          </component-container>
        </draggable>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-grid"></i></span>
        <h5>表单组件</h5>
        <draggable
          class="Compoent"
          :list="formCompoents"
          :clone="cloneCompoents"
          :options="{
            sort: false,
          }"
          :group="{ name: 'components', pull: 'clone', put: false }"
        >
          <component-container
            v-for="(item, i) in formCompoents"
            :key="i"
            :componentName="item.componentName"
            :name="item.name"
          >
          </component-container>
        </draggable>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-grid"></i></span>
        <h5>反馈组件</h5>
        <draggable
          class="Compoent"
          :list="feebackCompoents"
          :clone="cloneCompoents"
          :options="{
            sort: false,
          }"
          :group="{ name: 'components', pull: 'clone', put: false }"
        >
          <component-container
            v-for="(item, i) in feebackCompoents"
            :key="i"
            :componentName="item.componentName"
            :name="item.name"
          >
          </component-container>
        </draggable>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-grid"></i></span>
        <h5>展示组件</h5>
        <draggable
          class="Compoent"
          :list="showCompoents"
          :clone="cloneCompoents"
          :options="{
            sort: false,
          }"
          :group="{ name: 'components', pull: 'clone', put: false }"
        >
          <component-container
            v-for="(item, i) in showCompoents"
            :key="i"
            :componentName="item.componentName"
            :name="item.name"
          >
          </component-container>
        </draggable>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-grid"></i></span>
        <h5>导航组件</h5>
        <draggable
          class="Compoent"
          :list="navCompoents"
          :clone="cloneCompoents"
          :options="{
            sort: false,
          }"
          :group="{ name: 'components', pull: 'clone', put: false }"
        >
          <component-container
            v-for="(item, i) in navCompoents"
            :key="i"
            :componentName="item.componentName"
            :name="item.name"
          >
          </component-container>
        </draggable>
      </el-tab-pane>
      <!-- <el-tab-pane>
        <span slot="label"><i class="el-icon-s-grid"></i></span>
        <h5>业务组件</h5>
        <draggable
          class="Compoent"
          :list="businessCompoents"
          :clone="cloneCompoents"
          :options="{
            sort: false,
          }"
          :group="{ name: 'components', pull: 'clone', put: false }"
        >
          <component-container
            v-for="(item, i) in businessCompoents"
            :key="i"
            :componentName="item.componentName"
            :name="item.name"
          >
          </component-container>
        </draggable>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import ComponentContainer from "@/components/h5/ComponentContainer.vue";

import curList from "@/mixins/curList";
import fixFirefoxBug from "@/mixins/fixFirefoxBug";

import {
  basicCompoents,
  formCompoents,
  feebackCompoents,
  showCompoents,
  navCompoents,
  businessCompoents,
} from "../componentLib/h5";

export default {
  mixins: [curList, fixFirefoxBug],
  components: {
    draggable,
    ComponentContainer,
  },
  data() {
    return {
      basicCompoents,
      formCompoents,
      feebackCompoents,
      showCompoents,
      navCompoents,
      businessCompoents,
    };
  },

  computed: {
    globalId() {
      return this.$store.state.globalId;
    },
  },

  methods: {
    cloneCompoents: function (cloneObj) {
      let newObj = JSON.parse(JSON.stringify(cloneObj));
      this.$store.commit("globalIdInc");
      newObj.id = this.globalId;
      console.log(JSON.stringify(cloneObj));
      newObj.mode = this.cMode;
      console.log(this.$store.state.list);
      return newObj;
    },
  },
  created() {
    console.log(this.navCompoents);
  },
};
</script>
<style>
.Compoent {
  display: flex;
  flex-wrap: wrap;
}
</style>
