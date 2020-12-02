<template>
<div>
    <van-checkbox v-model="myChecked">复选框</van-checkbox>
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
            "myChecked": false,
        }
    },
    computed: {
        checked() {
            return this.myItem.propValues[this.checkedIndex].value
        }
    },
    watch: {
        checked(val) {
            this.myChecked = val
        }
    }
    
}
</script>