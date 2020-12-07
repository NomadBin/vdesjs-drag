export default {
  created() {
    // Sortable.js的bug， 此处阻止火狐浏览器打开新窗口进行搜索
    document.body.ondrop = function(event) {
      event.preventDefault();
      event.stopPropagation();
    };
  }
};
