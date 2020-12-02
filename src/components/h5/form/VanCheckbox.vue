<template>
<div>
    <van-checkbox v-model="checked">复选框</van-checkbox>
</div>
    
</template>
<script>
export default {
    props: {
    myItem: {},
  },
    data() {
        return {
            "checkedIndex": 0,
        }
    },
    computed: {
        checked() {
            return this.myItem.propValues[this.checkedIndex].value
        }
    }
    
}
</script>