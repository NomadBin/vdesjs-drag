const Handlebars = require("handlebars");
//basic
let Navbar = require("./template/pc/basics/Navbar.html")
let NavbarStyle = require("./template/pc/style/Navbar.html")

//bottom
let htmIndx = require("./template/pc/index.html")


let compoentTexts = {
    "Navbar": Navbar,
}

let compoentStyle = {
    "Navbar": NavbarStyle,
}


// 注册条件表达式 helper
Handlebars.registerHelper('compare', function (left, operator, right, options) {
    if (arguments.length < 3) {
        throw new Error('Handlerbars Helper "compare" needs 2 parameters');
    }
    var operators = {
        '==': function (l, r) { return l == r; },
        '===': function (l, r) { return l === r; },
        '!=': function (l, r) { return l != r; },
        '!==': function (l, r) { return l !== r; },
        '<': function (l, r) { return l < r; },
        '>': function (l, r) { return l > r; },
        '<=': function (l, r) { return l <= r; },
        '>=': function (l, r) { return l >= r; },
        'typeof': function (l, r) { return typeof l == r; }
    };

    if (!operators[operator]) {
        throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
    }

    var result = operators[operator](left, right);

    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

let obj = {
    generateHtmlCode(obj) {
        var templatesText = [];

        for (var i = 0; i < obj.length; i++) {

            if (obj[i].componentName == "Layout") {

            } else {
                var templateText = this.generateHtmlCodeFromObjToText(obj[i])
                templatesText[i] = templateText;
            }


        }

        // 整合最终代码
        var template = Handlebars.compile(htmIndx)
        var styles = this.getStyles(obj)

        let index = template({
            "styles": styles,
            "templatesText": templatesText

        })
        console.log(JSON.stringify(templatesText))


        return index;

    },


    // 遍历json，找到style模板并传入json编译成最终的style代码。
    getStyles(obj) {
        let stylesObj = {

        }
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].componentName == "Layout") {

            } else {
                var componentName = obj[i].componentName
                if (compoentStyle[componentName] != null) {
                    var template = Handlebars.compile(compoentStyle[componentName])
                    var tempateText = template({
                        myItem: obj[i]
                    })
                    stylesObj[componentName + obj[i].id] = tempateText
                }
            }
        }
        console.log("stylesObj:" + JSON.stringify(stylesObj))
        return stylesObj;

    },

    // 根据每个组件的模板文件，传入json，编译成所需的组件代码。
    generateHtmlCodeFromObjToText(obj) {
        var compoentName = obj.componentName;
        var compoentText = compoentTexts[compoentName];
        var template = Handlebars.compile(compoentText);
        var templateShowText = template({
            myItem: obj
        });
        return templateShowText;

    },
    isObject(data) {
        return Object.prototype.toString.call(data) === '[object Object]';
    },
    isBoolean(data) {
        return Object.prototype.toString.call(data) === '[object Boolean]';
    }


}
export default obj