<template>
  <div class="item">
    <div class="module">
        <img :src="Logos[componentName]" class="box" />
        <p style="font-size: 14px">{{name}}</p>
    </div>
  </div>
</template>
<script>
import basicsMixin from "@/common/js/h5/importBasics";
import layoutMixin from "@/common/js/h5/importLayout";
import formMixin from "@/common/js/h5/importForm";
import feebackMixin from "@/common/js/h5/importFeeback";
import showMixin from "@/common/js/h5/importShow";
import navMixin from "@/common/js/h5/importNav";
import businessMixin from "@/common/js/h5/importBusiness";
export default {
  mixins: [basicsMixin, layoutMixin, formMixin, feebackMixin, showMixin, navMixin, businessMixin],
  created: function () {
    console.log(JSON.stringify(this.name));
  },
  data() {
    return {};
  },
  props: {
    componentName: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "basics",
    },
  },
};
</script>
<style scoped>
.box {
  height: 30px;
  background-color: lightgray;
}
.item {
  width: 50%;
}
.module {
  border: 1px solid transparent;
  transition: border 0.3s;
}
.module:hover {
  border: 1px solid blue;
}
</style>