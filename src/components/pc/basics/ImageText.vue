<template>
  <div>
    <ul class="container-fluid imageText">
      <li class="col-xs-12 sm_item">
        <div>
          <div class="img">
            <div class="img-wrapper">
              <img
                src="http://p.cdn-static.cn/30303_15928097292549.png?imageView2/2/w/576/q/75"
                alt=""
              />
            </div>
          </div>
          <div class="text">
            <div class="title">
              <h4>这是标题</h4>
            </div>
            <div class="desc">
              <p>这是描述文本</p>
            </div>
          </div>
        </div>
      </li>
      <li class="col-xs-12 sm_item">
        <div>
          <div class="img">
            <div class="img-wrapper">
              <img
                src="http://p.cdn-static.cn/30303_15928097292549.png?imageView2/2/w/576/q/75"
                alt=""
              />
            </div>
          </div>
          <div class="text">
            <div class="title">
              <h4>这是标题</h4>
            </div>
            <div class="desc">
              <p>这是描述文本</p>
            </div>
          </div>
        </div>
      </li>
      <li class="col-xs-12 sm_item">
        <div>
          <div class="img">
            <div class="img-wrapper">
              <img
                src="http://p.cdn-static.cn/30303_15928097292549.png?imageView2/2/w/576/q/75"
                alt=""
              />
            </div>
          </div>
          <div class="text">
            <div class="title">
              <h4>这是标题</h4>
            </div>
            <div class="desc">
              <p>这是描述文本</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
@import "bootstrap/dist/css/bootstrap.min.css";
.imageText {
  display: flex;
  flex-wrap: wrap;
}
.img-wrapper {
  display: flex;
  justify-content: center;
  padding: 12px;
}
.title h4 {
  display: flex;
  justify-content: center;
  font-size: 22px;
  font-weight: 700;
  padding: 5px;
}
.desc {
  display: flex;
  justify-content: center;
  font-size: 16px;
  color: rgba(143, 149, 170, 1);
}
@media (min-width: 768px) {
  .sm_item {
    width: 33.3%;
  }
}
</style>