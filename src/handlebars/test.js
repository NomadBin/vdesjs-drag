var componentName = list[k].componentName
if (compentMethods[componentName] != null) {
    console.log(componentName + "有方法")
    var template = Handlebars.compile(compentMethods[componentName])
    var tempateText = template({
        myItem: list[k]
    })
    methodsObj[componentName + list[k].id] = tempateText
}