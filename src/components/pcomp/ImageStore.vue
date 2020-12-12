<template>
  <div class="ImageStore">
    <span class="blueFont" @click="dialogVisible = true">图片库</span>
    <el-dialog
      title="选择图片"
      :visible.sync="dialogVisible"
      :append-to-body="true"
    >
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
        <span class="newGroup" @click="addGroup">新建分组</span>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="chooseImage">确 定</el-button>
      </span>

      <el-dialog
        title="新建分组"
        :visible.sync="addGroupStatus"
        :append-to-body="true"
      >
        <el-form
          ref="addGroupForm"
          :model="addGroupForm"
          label-width="80px"
          :rules="rule"
        >
          <el-form-item label="分组名称" prop="name">
            <el-input
              v-model="addGroupForm.name"
              placeholder="请输入分组名称"
              prop
            ></el-input>
          </el-form-item>
          <el-button @click="addImg" class="addImgButton">添加图片</el-button>
          <el-form-item label="图片链接">
            <el-card v-for="(v, i) in imgNum" :key="i">
              <div slot="header" class="clearfix addGroup_button">
                <el-button size="mini" @click="deleteImg(i)">删除</el-button>
              </div>
              <div class="addGroupCard">
                <el-form-item label="图片名称">
                  <el-input v-model="imgNum[i].name" placeholder="图片名字" />
                </el-form-item>
                <el-form-item label="图片地址">
                  <el-input
                    v-model="imgNum[i].url"
                    placeholder="图片链接"
                    prop="url"
                  />
                </el-form-item>
              </div>
            </el-card>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addGroupCancel">取 消</el-button>
          <el-button type="primary" @click="addGroupConfirm">确 定</el-button>
        </span>
      </el-dialog>
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
              url: "https://gitee.com/static/images/logo-black.svg?t=158106664",
            },
          ],
        },
        {
          name: "高清素材",
          imgs: [
            {
              name: "aaa.png",
              url: "https://images.pexels.com/photos/2039613/pexels-photo-2039613.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            },
            {
              name: "aaa.png",
              url: "https://images.pexels.com/photos/4650241/pexels-photo-4650241.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            },
            {
              name: "aaa.png",
              url: "https://images.pexels.com/photos/1030859/pexels-photo-1030859.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            },
            {
              name: "aaa.png",
              url: "https://images.pexels.com/photos/2524121/pexels-photo-2524121.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            },
            {
              name: "aaa.png",
              url: "https://images.pexels.com/photos/3786092/pexels-photo-3786092.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            },
          ],
        },
      ],
      checkImgs: [],
      //Add Group Dialog Status
      addGroupStatus: false,
      //Add Group Form
      addGroupForm: {},
      imgNum: [],
      rule: {
        name: [{ required: true, message: "请输入分组名称", trigger: "blur" }],
      },
    };
  },
  props: {
    // dialogVisible: {
    //   type: Boolean,
    //   default: false
    // }
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
    cancel: function () {
      this.dialogVisible = false;
      this.checkImgs = [];
    },
    /**
     * @description: Add Group Button(span)
     */
    addGroup() {
      this.addGroupStatus = true;
      this.addGroupForm = {
        name: undefined,
        imgs: [],
      };
    },
    /**
     * @description: Add Group Imgs
     */
    addImg() {
      const obj = {
        name: undefined,
        url: undefined,
      };
      this.imgNum.push(obj);
    },
    /**
     * @description: Delete Current Item
     * @param {*} index
     */
    deleteImg(index) {
      // this.addGroupForm.imgs = this.addGroupForm.imgs.splice(index, 1);
      console.log(this.imgNum.splice(index, 1));
    },
    /**
     * @description: Add Group Cancel
     */
    addGroupCancel() {
      this.addGroupStatus = false;
      this.resetAddGroupForm();
    },
    /**
     * @description: Confirm Add Group Info
     */
    addGroupConfirm() {
      console.log(this.imgNum);
      this.addGroupForm.imgs = this.imgNum;
      this.imgList.push(this.addGroupForm);
      this.resetAddGroupForm();
      this.addGroupStatus = false;
    },
    /**
     * @description: Add Group Form Reset
     */
    resetAddGroupForm() {
      this.addGroupForm = {};
      this.imgNum = [];
    },
  },
};
</script>
<style scoped>
.blueFont {
  color: blue;
  text-decoration: underline;
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
.addGroup_button {
  display: flex;
  flex-direction: row-reverse;
}
.addGroupCard {
  height: 100px;
  display: flex;
  align-content: space-around;
  flex-wrap: wrap;
}
.addImgButton {
  margin-bottom: 15px;
}
</style>
