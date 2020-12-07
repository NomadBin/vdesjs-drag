import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      curList: "currentList",
      cMode: "currentMode"
    })
  }
};
