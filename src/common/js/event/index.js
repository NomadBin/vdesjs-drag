import store from '@/store/index';

let obj = {
    // 根据事件的json数据结构决定具体的myFunction
    initMyFunction(obj) {
        // 缩放动作
        if (obj.actionValue.value == "scale") {
            obj.myFunction = function () {
                var x = obj.data[0].value / 10;
                var y = obj.data[1].value / 10;
                console.log(x + ":" + y);
                store.state.domList[
                    obj.targentObjId
                ].style.transform = `scale(${x}, ${y})`;
                store.state.domList[obj.targentObjId].style.transition = "transform 2s";

            }
        }

        return obj;
    },
    // 根据事件的json数据结构来对dom添加事件监听
    domToAddEventListner(obj) {
        if (obj.targetObjValue.value == "currentObj") {
            store.state.domList[obj.targentObjId].addEventListener(
                obj.triggerEventValue.value,
                obj.myFunction
            );
        }

    }
}
export default obj