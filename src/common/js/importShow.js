
import VanNoticebar from"@/components/show/VanNoticebar.vue"
import VanNoticebarLogo from "@/assets/show/通知栏.png"

import VanSwiper from"@/components/show/VanSwiper.vue"
import VanSwiperLogo from "@/assets/show/轮播.png"


let basics = {
    components: {
        VanNoticebar,
        VanSwiper
    },
    data() {
        return {
            Logos: {
                "VanNoticebar": VanNoticebarLogo,
                "VanSwiper": VanSwiperLogo
            }
        }

    }
        
   
}

export default basics