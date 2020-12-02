<template>
  <div class="ImageStore">
    <span class="blueFont" @click="dialogVisible = true">图片库</span>
    <el-dialog title="选择图片" :visible.sync="dialogVisible"  append-to-body="true">
      <el-checkbox-group v-model="checkImgs" :max="1">
        <el-tabs tab-position="left">
          <el-tab-pane
            v-for="(imgs, groupIndex) in imgList"
            :key="groupIndex"
            :label="imgs.name"
          >
            <div
              class="imageItem"
              v-for="(img, imgIndex) in imgs.imgs"
              :key="imgIndex"
            >
              <el-checkbox
                style="align-self: flex-start"
                @change="check($event, groupIndex + ',' + imgIndex)"
                :label="groupIndex + ',' + imgIndex"
              >
                <br
              /></el-checkbox>
              <el-image
                style="width: 100px; height: 100px"
                :src="img.url"
                fit="contain"
              >
              </el-image>
              <span>{{ img.name }}</span>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-checkbox-group>
      {{ checkImgs }}

      <span slot="footer" class="dialog-footer">
        <span class="newGroup">新建分组</span>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="chooseImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      imgList: [
        {
          name: "未分组",
          imgs: [
            {
              name: "test.png",
              url:
                "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            },
            {
              name: "test.png",
              url:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            },
            {
              name: "test.png",
              url:
                "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
            },
          ],
        },
        {
          name: "美食",
          imgs: [
            {
              name: "aaa.png",
              url:
                "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
            },
          ],
        },
        {
          name: "logo",
          imgs: [
            {
              name: "aaa.png",
              url:
                "https://gitee.com/static/images/logo-black.svg?t=158106664",
            },
          ],
        },
      ],
      checkImgs: [],
    };
  },
  methods: {
    check: function (event, value) {
      console.log(event + value);
    },
    chooseImage: function () {
      this.dialogVisible = false;
      var imgs = [];
      for (var i = 0; i < this.checkImgs.length; i++) {
        var zb = this.checkImgs[i];
        console.log(zb);
        zb = zb.split(",");
        console.log(zb[0]);
        var img = this.imgList[zb[0]].imgs[zb[1]];
        imgs.push(img);
        console.log(JSON.stringify(imgs));
      }
      this.$emit("complete", imgs);
      this.checkImgs = [];
    },
    cancel: function() {
      this.dialogVisible = false;
      this.checkImgs = [];
    }
  },
};
</script>
<style scoped>
.blueFont {
  color: blue;
  text-decoration: underline;
}
.el-dialog {
  /* width: 800px; */
}
.newGroup {
  float: left;
  color: blue;
}
.el-image {
  border: 1px solid transparent;
}
.el-image:hover {
  border: 1px solid blue;
}
.el-tab-pane {
  height: 500px;
  overflow-y: scroll;
}
.imageItem {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 120px;
  padding: 10px;
  float: left;
}
</style>