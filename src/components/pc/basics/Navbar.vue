<template>
  <div
    class="var"
    ref="var"
    :style="{
      '--navbarBg': myItem.propValues[navbarBgIndex].value,
      '--itemBg': myItem.propValues[itemBgIndex].value,
      '--itemHoverBg': myItem.propValues[itemHoverBgIndex].value,
      '--logoRightSpace':
        myItem.propValues[logoRightSpaceIndex].value.num +
        myItem.propValues[logoRightSpaceIndex].value.unit,
      '--navItemSpace':
        myItem.propValues[navItemSpaceIndex].value.num +
        myItem.propValues[navItemSpaceIndex].value.unit,
      '--fontSize': myItem.propValues[fontSizeIndex].value + 'px',
    }"
  >
    <div class="navbar navbar-my navbar-static-top">
      <div class="container">
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">
            <img
              :src="myItem.propValues[logoIndex].value"
              alt=""
              style="height: 25px"
            />
          </a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav" >
            <li v-for="(item, i) in myItem.propValues[dataIndex].value.data" :key="i"><a :href="item.url">{{item.name}}</a></li>
          </ul>
          <!-- <ul class="nav navbar-nav navbar-sub pull-right">
            <li><a href="#">Register</a></li>
            <li><a href="#">Login</a></li>
          </ul> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    myItem: {},
  },

  data() {
    return {
      navbarBgIndex: 0,
      itemBgIndex: 1,
      itemHoverBgIndex: 2,
      logoIndex: 3,
      logoRightSpaceIndex: 4,
      navItemSpaceIndex: 5,
      fontSizeIndex: 6,
      dataIndex: 7,
    };
  },
};
</script>
<style scoped>
.var {
  --navbarBg: lightgray;
  --itemBg: black;
  --itemHoverBg: black;
  --logoRightSpace: 6rem;
  --navItemSpace: 1rem;
  --fontSize: 16px;
}

.navbar-my {
  background-color: var(--navbarBg);
  height: 5rem;
}
.navbar > .container .navbar-brand {
  margin-right: var(--logoRightSpace);
}
.navbar-my .navbar-nav > li {
  margin-right: var(--navItemSpace);
}

.navbar-my .navbar-nav > li > a {
  color: var(--itemBg);
  font-size: var(--fontSize);
}
.navbar-my .navbar-nav > li > a:hover,
.navbar-my .navbar-nav > li > a:focus {
  color: var(--itemHoverBg);
  background-color: var(--navbarBg);
}
</style>