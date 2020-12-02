import VanCalendar from "@/components/h5/form/VanCalendar.vue";
import VanCalendarLogo from "@/assets/h5/form/日历.png"

import VanCheckbox from "@/components/h5/form/VanCheckbox.vue";
import VanCheckboxLogo from "@/assets/h5/form/复选框.png"

import VanDatetimePicker from "@/components/h5/form/VanDatetimePicker.vue";
import VanDatetimePickerLogo from "@/assets/h5/form/时间选择.png"

import VanField from "@/components/h5/form/VanField.vue";
import VanFieldLogo from "@/assets/h5/form/输入框.png"

let layout = {
    components: {
        VanCalendar,
        VanCheckbox,
        VanDatetimePicker,
        VanField
    },
    data() {
        return {
            Logos: {
                "VanCalendar": VanCalendarLogo,
                "VanCheckbox": VanCheckboxLogo,
                "VanDatetimePicker": VanDatetimePickerLogo,
                "VanField": VanFieldLogo
            }
        }

    }
        
   
}

export default layout