
import VanNoticebar from"@/components/h5/show/VanNoticebar.vue"
import VanNoticebarLogo from "@/assets/h5/show/通知栏.png"

import VanSwiper from"@/components/h5/show/VanSwiper.vue"
import VanSwiperLogo from "@/assets/h5/show/轮播.png"


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