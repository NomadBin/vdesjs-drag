import E from 'wangeditor'
const { PanelMenu } = E

class MyImage extends PanelMenu {
    constructor(editor) {
        const $elem = E.$(
            `<div class="w-e-menu"><i class="w-e-icon-image"></i></div>`
        )
        super($elem, editor)
        this.editor = editor

    }
    // 菜单点击事件
    clickHandler() {
        // 做任何你想做的事情
        // 可参考【常用 API】文档，来操作编辑器

        // alert('hello world')
        console.log(this.editor.$toolbarElem.elems[0])
        console.log(E.$(this.editor.$toolbarElem.elems[0]))
    }
    tryChangeActive() {
        
    }


}

export default MyImage