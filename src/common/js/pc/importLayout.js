import Plate from "@/components/pc/basics/Plate.vue";
import PlateLogo from "@/assets/pc/basics/图文.png";

let layout = {
    components: {
      Plate
    },
    data() {
      return {
        Logos: {
          Plate: PlateLogo
        }
      };
    }
  };
  
  export default layout;