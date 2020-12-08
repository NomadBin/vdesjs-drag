import jsCND from "./template/pc/jsCND";

const Handlebars = require("handlebars");
//basic
let Navbar = require("./template/pc/basics/Navbar.html");
let NavbarStyle = require("./template/pc/style/Navbar.html");
let Swiper = require("./template/pc/media/Swiper.handlebars");
let SwipperStyle = require("./template/pc/style/Swiper.handlebars");
let SwiperJsCode = require("./template/pc/js/Swiper.handlebars");
let PlateStyle = require("./template/pc/style/Plate.html");

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
  Swiper: SwipperStyle,
  Plate: PlateStyle
};

let componentJsCode = {
  Swiper: SwiperJsCode
};

Handlebars.registerHelper("hasCss", function (data) {
  return data.css ? true : false;
});

// 注册条件表达式 helper
Handlebars.registerHelper("compare", function (left, operator, right, options) {
  if (arguments.length < 3) {
    throw new Error('Handlerbars Helper "compare" needs 2 parameters');
  }
  var operators = {
    "==": function (l, r) {
      return l == r;
    },
    "===": function (l, r) {
      return l === r;
    },
    "!=": function (l, r) {
      return l != r;
    },
    "!==": function (l, r) {
      return l !== r;
    },
    "<": function (l, r) {
      return l < r;
    },
    ">": function (l, r) {
      return l > r;
    },
    "<=": function (l, r) {
      return l <= r;
    },
    ">=": function (l, r) {
      return l >= r;
    },
    typeof: function (l, r) {
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
  jsCodeList: {},
  jsCDN: {},
  styles: {},

  generateHtmlCode(obj) {
    var templatesText = [];
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].componentName == "Layout") {
      } else if (obj[i].componentName == "Plate") {
        var platHtml = "<div class=\"plate" + obj[i].id + "\" >"
        this.styles[i] = this.getStyle(obj[i])
        for (var j = 0; j < obj[i].cols[0].list.length; j++) {
          var objItem = obj[i].cols[0].list[j];

          var templateText = this.generateHtmlCodeFromObjToText(objItem);
          platHtml = platHtml + templateText;

          [this.jsCodeList[i + "-" + j], this.jsCDN[i + "-" + j]] = this.getJsCode(objItem);
          this.styles[i + "-" + j] = this.getStyle(objItem);

        }
        platHtml = platHtml + "</div>";
        templatesText[i] = platHtml;

      } else {
        var templateText = this.generateHtmlCodeFromObjToText(obj[i]);
        [this.jsCodeList[i], this.jsCDN[i]] = this.getJsCode(obj[i]);
        templatesText[i] = templateText;

        this.styles[i] = this.getStyle(obj[i]);
      }
    }
    console.log(JSON.stringify(this.styles))


    // 整合最终代码
    var template = Handlebars.compile(htmIndx);

    let index = template({
      styles: this.styles,
      templatesText: templatesText,
      jsCode: this.jsCodeList,
      jsCND: this.jsCDN
    });
    console.log(JSON.stringify(templatesText));

    return index;
  },

  // 根据组件的style模板传入json，编译style代码
  getStyle(obj) {
    var tempateText = '';
    var componentName = obj.componentName;
    if (compoentStyle[componentName] != null) {
      if (this.isFunction(compoentStyle[componentName])) {
        tempateText = compoentStyle[componentName]({
          myItem: obj
        });
      } else {
        var template = Handlebars.compile(compoentStyle[componentName]);
        tempateText = template({
          myItem: obj
        });
      }
    }
    return tempateText;
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
