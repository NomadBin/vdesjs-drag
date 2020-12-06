import Navbar from "@/components/pc/basics/Navbar.vue";
import NavbarLogo from "@/assets/pc/basics/导航栏.png";
import ImageText from "@/components/pc/basics/ImageText.vue";
import ImageTextLogo from "@/assets/pc/basics/图文.png";

import Swiper from "@/components/pc/media/Swiper.vue";

let basics = {
  components: {
    Navbar,
    ImageText,
    Swiper
  },
  data() {
    return {
      Logos: {
        Navbar: NavbarLogo,
        ImageText: ImageTextLogo
      }
    };
  }
};

export default basics;
