const Handlebars = require("handlebars");
//basic
let VanButton = require("./template/h5/basic/VanButton.html")
let VanCell = require("./template/h5/basic/VanCell.html")
let VanIcon = require("./template/h5/basic/VanIcon.html")
let VanImage = require("./template/h5/basic/VanImage.html")

//form
let VanCheckbox = require("./template/h5/form/Vancheckbox.html")
let VanCalendar = require("./template/h5/form/VanCalendar.html")
let VanField = require("./template/h5/form/VanField.html")

//feeback
let VanShareSheet = require("./template/h5/feeback/VanShareSheet.html")

//show
let VanNoticebar = require("./template/h5/show/VanNoticebar.html")
let VanSwiper = require("./template/h5/show/VanSwiper.html")

//nav
let VanGrid = require("./template/h5/nav/VanGrid.html")

//bottom
let bottomScript = require("./template/h5/bottomScript.html")
let VanCalendarMethod = require("./template/h5/methods/Vancalendar.html")
let VanShareSheetMethod = require("./template/h5/methods/VanShareSheet.html")


let compoentTexts = {
    "VanButton": VanButton,
    "VanCheckbox": VanCheckbox,
    "VanCell": VanCell,
    "VanIcon": VanIcon,
    "VanImage": VanImage,
    "VanCalendar": VanCalendar,
    "VanField": VanField,
    "VanShareSheet": VanShareSheet,
    "VanNoticebar": VanNoticebar,
    "VanSwiper": VanSwiper,
    "VanGrid": VanGrid,
}

let compentMethods = {
    "VanCalendar": VanCalendarMethod,
    "VanShareSheet": VanShareSheetMethod
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
    generateVueCode(obj) {
        var allCodeText = "<template>" + "\r\n";
        allCodeText = allCodeText + "<div>" + "\r\n"

        for (var i = 0; i < obj.length; i++) {

            if (obj[i].componentName == "VanLayout") {
                console.log("为layout：" + JSON.stringify(obj[i]))
                var VanRow = "<van-row>" + "\r\n";
                for (var j = 0; j < obj[i].cols.length; j++) {
                    var VanCol = "<van-col span='" + obj[i].cols[j].span + "'>" + "\r\n";
                    var list = obj[i].cols[j].list;
                    for (var k = 0; k < list.length; k++) {
                        var templateShowText = this.generateVueCodeFromObjToText(list[k])
                        VanCol = VanCol + templateShowText + "\r\n";

                    }
                    VanCol = VanCol + "</van-col>" + "\r\n";
                    VanRow = VanRow + VanCol + "\r\n";
                }
                VanRow = VanRow + "</van-row>" + "\r\n";
                allCodeText = allCodeText + VanRow + "\r\n"

            } else {
                var templateShowText = this.generateVueCodeFromObjToText(obj[i])
                allCodeText = allCodeText + templateShowText + "\r\n"

            }


        }
        allCodeText = allCodeText + "</div>" + "\r\n"
        allCodeText = allCodeText + "</template>" + "\r\n"



        // 获取vue代码底部script标签代码
        var template = Handlebars.compile(bottomScript)
        var varsObj = this.getBottomScriptVars(obj)
        var methodsObj = this.getBottomScriptMethods(obj)

        var bottomScriptText = template({
            "data": varsObj,
            "methdos": methodsObj

        })
        allCodeText = allCodeText + bottomScriptText + "\r\n"


        return allCodeText;

        // let template = Handlebars.compile(VanButton);
        // console.log(template({}))
    },

    // 遍历json 找到isModeal为true(获取data下的内容)
    getBottomScriptVars(obj) {
        let varsObj = {

        };
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].componentName == "VanLayout") {
                for (var j = 0; j < obj[i].cols.length; j++) {
                    var list = obj[i].cols[j].list;
                    for (var k = 0; k < list.length; k++) {
                        var propValues = list[k].propValues
                        for (var l = 0; l < propValues.length; l++) {
                            if (propValues[l].isModel == true) {
                                console.log(propValues[l].key + obj[i].id + "为isModel")
                                if (this.isObject(propValues[l].value)) {
                                    //为对象需要用json格式化
                                    var str = JSON.stringify(propValues[l].value);
                                    varsObj[propValues[l].key + obj[i].id] = str
                                } else if (this.isBoolean(propValues[l].value)) {
                                    var str = propValues[l].value
                                    varsObj[propValues[l].key + obj[i].id] = str

                                } else {
                                    var str = "\"" + propValues[l].value + "\""
                                    varsObj[propValues[l].key + obj[i].id] = str
                                }

                            }
                        }

                    }
                }
            } else {
                var propValues = obj[i].propValues
                for (var j = 0; j < propValues.length; j++) {
                    if (propValues[j].isModel == true) {
                        console.log(propValues[j].key + obj[i].id + "为isModel")
                        if (this.isObject(propValues[j].value)) {
                            //为对象需要用json格式化
                            var str = JSON.stringify(propValues[j].value);
                            varsObj[propValues[j].key + obj[i].id] = str
                        } else if (this.isBoolean(propValues[j].value)) {
                            var str = propValues[j].value
                            varsObj[propValues[j].key + obj[i].id] = str

                        } else {
                            var str = "\"" + propValues[j].value + "\""
                            varsObj[propValues[j].key + obj[i].id] = str
                        }

                    }
                }
            }
        }
        console.log(JSON.stringify(varsObj))
        return varsObj;
    },

    // 遍历json，找到methods模板并传入json编译成最终的methods代码。
    getBottomScriptMethods(obj) {
        let methodsObj = {

        }
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].componentName == "VanLayout") {
                for (var j = 0; j < obj[i].cols.length; j++) {
                    var list = obj[i].cols[j].list;
                    for (var k = 0; k < list.length; k++) {
                        var componentName = list[k].componentName
                        if (compentMethods[componentName] != null) {
                            console.log(componentName + "有方法")
                            var template = Handlebars.compile(compentMethods[componentName])
                            var tempateText = template({
                                myItem: list[k]
                            })
                            methodsObj[componentName + list[k].id] = tempateText
                        }

                    }
                }

            } else {
                var componentName = obj[i].componentName
                if (compentMethods[componentName] != null) {
                    console.log(componentName + "有方法")
                    var template = Handlebars.compile(compentMethods[componentName])
                    var tempateText = template({
                        myItem: obj[i]
                    })
                    methodsObj[componentName + obj[i].id] = tempateText
                }
            }
        }
        console.log("methodsObj:" + JSON.stringify(methodsObj))
        return methodsObj;

    },

    // 根据每个组件的模板文件，传入json，编译成所需的组件代码。
    generateVueCodeFromObjToText(obj) {
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