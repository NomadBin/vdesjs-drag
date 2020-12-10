<template>
  <div
    class="var"
    :style="{
      '--navbarBg': myItem.propValues[navbarBgIndex].value,
      '--navbarHeigth': myItem.propValues[navbarHeigthIndex].value.num + myItem.propValues[navbarHeigthIndex].value.unit,
      '--itemBg': myItem.propValues[itemBgIndex].value,
      '--itemHoverBg': myItem.propValues[itemHoverBgIndex].value,
      '--logoRightSpace':
        myItem.propValues[logoRightSpaceIndex].value.num +
        myItem.propValues[logoRightSpaceIndex].value.unit,
      '--navItemSpace':
        myItem.propValues[navItemSpaceIndex].value.num +
        myItem.propValues[navItemSpaceIndex].value.unit,
        '--navItemTopSpace':
        myItem.propValues[navItemTopSpaceIndex].value.num +
        myItem.propValues[navItemTopSpaceIndex].value.unit,
      '--fontSize': myItem.propValues[fontSizeIndex].value + 'px',
    }"
  >
    <div class="navbar navbar-my navbar-static-top">
      <div class="container-fluid">
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
              :style="{'height': myItem.propValues[logoSizeIndex].value + 'px'}"
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
      navbarHeigthIndex: 1,
      itemBgIndex: 2,
      itemHoverBgIndex: 3,
      logoIndex: 4,
      logoSizeIndex: 5,
      logoRightSpaceIndex: 6,
      navItemSpaceIndex: 7,
      navItemTopSpaceIndex: 8,
      fontSizeIndex: 9,
      dataIndex: 10,
    };
  },
};
</script>


<style scoped>
@import 'bootstrap/dist/css/bootstrap.min.css';
.var {
  --navbarBg: lightgray;
  --navbarHeigth: 5rem;
  --itemBg: black;
  --itemHoverBg: blue;
  --logoRightSpace: 6rem;
  --navItemSpace: 1rem;
  --navItemTopSpace: 0rem;
  --fontSize: 16px;
}

.navbar-my {
  margin-bottom: 0px;
  background-color: var(--navbarBg);
  z-index: 1;
  
}
.navbar-my .navbar-nav {
    height: var(--navbarHeigth);
}
.navbar-my .navbar-toggle .icon-bar {
  background-color: var(--itemBg);
}
.navbar .navbar-brand {
  margin-right: var(--logoRightSpace);
}
.navbar-my .navbar-nav > li {
  margin-right: var(--navItemSpace);
  margin-top: var(--navItemTopSpace);
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