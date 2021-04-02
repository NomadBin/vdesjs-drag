<template>
  <div>
    <el-tabs tab-position="left">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-grid"></i></span>
        <h5>基础组件</h5>
          <component-container
            v-for="(item, i) in basicCompoents"
            :key="i"
            :name="item.name"
            :item="item"
          > 
          </component-container>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import ComponentContainer from "@/components/free/ComponentContainer.vue";

import curList from "@/mixins/curList";

import {
  basicCompoents,
} from "../componentLib/free";

export default {
  mixins: [curList],
  components: {
    draggable,
    ComponentContainer
  },
  data() {
    return {
      basicCompoents: basicCompoents,
    };
  },

  computed: {
    globalId() {
      return this.$store.state.globalId;
    },
  },

  methods: {
    
  },
};
</script>
<style>
.Compoent {
  display: flex;
  flex-wrap: wrap;
}
</style>
