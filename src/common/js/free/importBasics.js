
import VanButton from"@/components/free/basics/VanButton.vue"
import VanButtonLogo from "@/assets/free/basics/按钮.png"

import VanCell from"@/components/free/basics/VanCell.vue"
import VanCellLogo from "@/assets/free/basics/单元格.png"

import VanIcon from"@/components/free/basics/VanIcon.vue"
import VanIconLogo from "@/assets/free/basics/图标.png"

import VanImage from"@/components/free/basics/VanImage.vue"
import VanImageLogo from "@/assets/free/basics/图片.png"

// 组合组件
// import Group from"@/components/free/Group.vue"


let basics = {
    components: {
        VanButton,
        VanCell,
        VanIcon,
        VanImage,
    },
    data() {
        return {
            Logos: {
                "VanButton": VanButtonLogo,
                "VanCell": VanCellLogo,
                "VanIcon": VanIconLogo,
                "VanImage": VanImageLogo
            }
        }

    }
        
   
}

export default basics