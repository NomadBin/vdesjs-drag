import { $ } from './utils'
import { mod360 } from './translate'

// 将组合中的各个子组件拆分出来，并计算它们新的 style
export default function decomposeComponent(component, editorRect, parentStyle) {
    const componentRect = $(`#component${component.id}`).getBoundingClientRect()
    // 获取元素的中心点坐标
    const center = {
        x: componentRect.left - editorRect.left + componentRect.width / 2,
        y: componentRect.top - editorRect.top + componentRect.height / 2,
    }
    console.log('componentRect: ' + JSON.stringify(componentRect))
    console.log('editorRect: ' + JSON.stringify(editorRect))
    console.log("元素中心点: " + JSON.stringify(center))
    console.log("(component.groupStyle:" + JSON.stringify(component.groupStyle))
    component.mStyle.rotate = mod360(component.mStyle.rotate + parentStyle.rotate)
    component.mStyle.width = parseFloat(component.groupStyle.width) / 100 * parentStyle.width
    component.mStyle.height = parseFloat(component.groupStyle.height) / 100 * parentStyle.height
    // 计算出元素新的 top left 坐标
    component.mStyle.left = center.x - component.mStyle.width / 2
    component.mStyle.top = center.y - component.mStyle.height / 2
    component.groupStyle = {}
}