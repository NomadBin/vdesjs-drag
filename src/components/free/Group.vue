<template>
  <div class="group">
    <div>
      <template v-for="(item, i) in propValues" >
        <component
          class="component"
          :is="item.componentName"
          :style="item.groupStyle"
          :myItem="item"
          :id="'component' + item.id"
          :key="i"
        ></component>
      </template>
    </div>
  </div>
</template>

<script>
import basicsMixin from "@/common/js/free/importBasics";
import { getStyle } from "@/utils/style";
export default {
  mixins: [basicsMixin],
  components: {},
  props: {
    propValues: {
      type: Array,
      default: () => [],
    },
    myItem: {
      type: Object,
    },
  },
  created() {
    const parentStyle = this.myItem.mStyle
    console.log("parentStyle:" + JSON.stringify(parentStyle))
    this.propValues.forEach(component => {
        // component.groupStyle 的 top left 是相对于 group 组件的位置
        // 如果已存在 component.groupStyle，说明已经计算过一次了。不需要再次计算
        if (!Object.keys(component.groupStyle).length) {
            const style = { ...component.mStyle }
            component.groupStyle = getStyle(style)
            component.groupStyle.left = this.toPercent((style.left - parentStyle.left) / parentStyle.width)
            component.groupStyle.top = this.toPercent((style.top - parentStyle.top) / parentStyle.height)
            component.groupStyle.width = this.toPercent(style.width / parentStyle.width)
            component.groupStyle.height = this.toPercent(style.height / parentStyle.height)

            console.log("component.groupStyle: " + JSON.stringify(component.groupStyle))
        }
    })
  },
  methods: {
    toPercent(val) {
      return val * 100 + "%";
    },
  },
};
</script>

<style lang="scss" scoped>
.group {
    & > div {
        position: relative;
        width: 100%;
        height: 100%;

        .component {
            position: absolute;
        }
    }
}
</style>