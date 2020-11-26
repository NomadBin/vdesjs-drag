
import VanButton from"@/components/basics/VanButton.vue"
import VanButtonLogo from "@/assets/basics/按钮.png"

import VanCell from"@/components/basics/VanCell.vue"
import VanCellLogo from "@/assets/basics/单元格.png"

import VanIcon from"@/components/basics/VanIcon.vue"
import VanIconLogo from "@/assets/basics/图标.png"

import VanImage from"@/components/basics/VanImage.vue"
import VanImageLogo from "@/assets/basics/图片.png"




let basics = {
    components: {
        VanButton,
        VanCell,
        VanIcon,
        VanImage
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