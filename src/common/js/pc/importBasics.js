import Navbar from"@/components/pc/basics/Navbar.vue"
import NavbarLogo from "@/assets/pc/basics/导航栏.png"
import ImageText from"@/components/pc/basics/ImageText.vue"
import ImageTextLogo from "@/assets/pc/basics/图文.png"

let basics = {
    components: {
        Navbar,
        ImageText,
    },
    data() {
        return {
            Logos: {
                "Navbar": NavbarLogo,
                "ImageText": ImageTextLogo,
            }
        }

    }
        
   
}

export default basics