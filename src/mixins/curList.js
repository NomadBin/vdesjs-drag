import { mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters({
      curList: "currentList",
      cMode: "currentMode",
      currentData: "currentData",
      hasRevocationSnaphot: "hasRevocationSnaphot",
      hasForwardSnaphot: "hasForwardSnaphot"
    }),
    ...mapState({
      "freeFrame": "freeFrame",
      areaData: "areaData",
      referenceLine: "referenceLine",
    })
  }
};
