import Navbar from "@/components/pc/basics/Navbar.vue";
import NavbarLogo from "@/assets/pc/basics/导航栏.png";
import ImageText from "@/components/pc/basics/ImageText.vue";
import ImageTextLogo from "@/assets/pc/basics/图文.png";
import Swiper from "@/components/pc/media/Swiper.vue";
import SwiperLogo from "@/assets/pc/basics/轮播图.png";

import RichText from "@/components/pc/basics/RichText.vue";
import RichTextLogo from "@/assets/pc/basics/富文本.png";



let basics = {
  components: {
    Navbar,
    ImageText,
    Swiper,
    RichText,
  },
  data() {
    return {
      Logos: {
        Navbar: NavbarLogo,
        ImageText: ImageTextLogo,
        Swiper: SwiperLogo,
        RichText: RichTextLogo,
      }
    };
  }
};

export default basics;
