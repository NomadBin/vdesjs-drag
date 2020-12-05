import { mapGetters } from "vuex";

export default {
  created() {
    console.log("aa");
  },
  computed: {
    ...mapGetters({
      curList: "currentList",
      cMode: "currentMode"
    })
  }
};
