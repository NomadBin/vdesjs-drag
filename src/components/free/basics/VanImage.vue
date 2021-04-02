<template>
<van-image :width="width" :height="height" :src="myItem.propValues[imageIndex].value" />
    
</template>
<script>
export default {
     props: {
    myItem: {},
  },

  data() {
    return {
      imageIndex: 0,
      widthIndex: 1,
      heightIndex: 2,
    };
  },
  computed: {
    width: function() {
      return this.myItem.propValues[this.widthIndex].value.num + this.myItem.propValues[this.widthIndex].value.unit
    },
    height: function() {
      return this.myItem.propValues[this.heightIndex].value.num + this.myItem.propValues[this.heightIndex].value.unit

    }
  }
}
</script>
<style>

</style>