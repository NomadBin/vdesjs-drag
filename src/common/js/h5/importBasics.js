
import VanButton from"@/components/h5/basics/VanButton.vue"
import VanButtonLogo from "@/assets/h5/basics/按钮.png"

import VanCell from"@/components/h5/basics/VanCell.vue"
import VanCellLogo from "@/assets/h5/basics/单元格.png"

import VanIcon from"@/components/h5/basics/VanIcon.vue"
import VanIconLogo from "@/assets/h5/basics/图标.png"

import VanImage from"@/components/h5/basics/VanImage.vue"
import VanImageLogo from "@/assets/h5/basics/图片.png"




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