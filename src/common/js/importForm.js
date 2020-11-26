import VanCalendar from "@/components/form/VanCalendar.vue";
import VanCalendarLogo from "@/assets/form/日历.png"

import VanCheckbox from "@/components/form/VanCheckbox.vue";
import VanCheckboxLogo from "@/assets/form/复选框.png"

import VanDatetimePicker from "@/components/form/VanDatetimePicker.vue";
import VanDatetimePickerLogo from "@/assets/form/时间选择.png"

import VanField from "@/components/form/VanField.vue";
import VanFieldLogo from "@/assets/form/输入框.png"

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