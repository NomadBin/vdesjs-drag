import jsCND from "./template/pc/jsCND";

const Handlebars = require("handlebars");
//basic
let Navbar = require("./template/pc/basics/Navbar.html");
let NavbarStyle = require("./template/pc/style/Navbar.html");
let Swiper = require("./template/pc/media/Swiper.handlebars");
let SwipperStyle = require("./template/pc/style/Swiper.handlebars");
let SwiperJsCode = require("./template/pc/js/Swiper.handlebars");
//bottom
let htmIndx = require("./template/pc/index.html");

//jsCND
let jsCDNList = require("./template/pc/jsCND");

let compoentTexts = {
  Navbar: Navbar,
  Swiper
};

let compoentStyle = {
  Navbar: NavbarStyle,
  Swiper: SwipperStyle
};

let componentJsCode = {
  Swiper: SwiperJsCode
};

Handlebars.registerHelper("hasCss", function(data) {
  return data.css ? true : false;
});

// 注册条件表达式 helper
Handlebars.registerHelper("compare", function(left, operator, right, options) {
  if (arguments.length < 3) {
    throw new Error('Handlerbars Helper "compare" needs 2 parameters');
  }
  var operators = {
    "==": function(l, r) {
      return l == r;
    },
    "===": function(l, r) {
      return l === r;
    },
    "!=": function(l, r) {
      return l != r;
    },
    "!==": function(l, r) {
      return l !== r;
    },
    "<": function(l, r) {
      return l < r;
    },
    ">": function(l, r) {
      return l > r;
    },
    "<=": function(l, r) {
      return l <= r;
    },
    ">=": function(l, r) {
      return l >= r;
    },
    typeof: function(l, r) {
      return typeof l == r;
    }
  };

  if (!operators[operator]) {
    throw new Error(
      'Handlerbars Helper "compare" doesn\'t know the operator ' + operator
    );
  }

  var result = operators[operator](left, right);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

let obj = {
  jsCodeList: [],
  jsCDN: [],

  generateHtmlCode(obj) {
    var templatesText = [];

    for (var i = 0; i < obj.length; i++) {
      if (obj[i].componentName == "Layout") {
      } else {
        var templateText = this.generateHtmlCodeFromObjToText(obj[i]);
        [this.jsCodeList[i], this.jsCDN[i]] = this.getJsCode(obj[i]);
        templatesText[i] = templateText;
      }
    }

    // 整合最终代码
    var template = Handlebars.compile(htmIndx);
    var styles = this.getStyles(obj);

    let index = template({
      styles: styles,
      templatesText: templatesText,
      jsCode: this.jsCodeList,
      jsCND: this.jsCDN
    });
    console.log(JSON.stringify(templatesText));

    return index;
  },

  // 遍历json，找到style模板并传入json编译成最终的style代码。
  getStyles(obj) {
    let stylesObj = {};
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].componentName == "Layout") {
      } else {
        var componentName = obj[i].componentName;
        if (compoentStyle[componentName] != null) {
          if (this.isFunction(compoentStyle[componentName])) {
            var tempateText = compoentStyle[componentName]({
              myItem: obj[i]
            });
          } else {
            var template = Handlebars.compile(compoentStyle[componentName]);
            var tempateText = template({
              myItem: obj[i]
            });
            console.log(tempateText, 8, obj);
          }

          stylesObj[componentName + obj[i].id] = tempateText;
        }
      }
    }
    console.log("stylesObj:" + JSON.stringify(stylesObj));
    return stylesObj;
  },

  // 根据每个组件的模板文件，传入json，编译成所需的组件代码。
  generateHtmlCodeFromObjToText(obj) {
    var compoentName = obj.componentName;
    var compoentText = compoentTexts[compoentName];
    //
    if (this.isFunction(compoentText)) {
      var templateShowText = compoentText({
        myItem: obj
      });
    } else {
      var template = Handlebars.compile(compoentText);
      var templateShowText = template({
        myItem: obj
      });
    }

    console.log(templateShowText);
    return templateShowText;
  },
  getJsCode(data) {
    if (data.jsCode === true) {
      let this$1 =
        componentJsCode[data.componentName] ||
        console.error("There is no corresponding JS code template");
      let templateJsCode = this$1({
        myItem: data
      });
      return [templateJsCode, jsCND[data.componentName]];
    } else {
      return [, {}];
    }
  },
  isObject(data) {
    return Object.prototype.toString.call(data) === "[object Object]";
  },
  isBoolean(data) {
    return Object.prototype.toString.call(data) === "[object Boolean]";
  },
  isFunction(data) {
    return Object.prototype.toString.call(data) === "[object Function]";
  }
};
export default obj;
