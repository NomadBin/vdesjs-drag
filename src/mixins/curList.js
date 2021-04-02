import { mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters({
      curList: "currentList",
      cMode: "currentMode",
      currentData: "currentData"
    }),
    ...mapState({
      "freeFrame": "freeFrame"
    })
  }
};
