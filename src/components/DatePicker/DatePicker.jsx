import { memo, useState } from "react";
import Calendar from "../Calendar/Calendar";
import moment, { weekdays } from 'jalali-moment'

function DatePicker(props) {

    const [datepicker, setDatepicker] = useState(props.selectedDay ?? ""); 
    let [selectedDate, setSelectedDate] = useState(props.selectedDay ?? "");    

    function handleSelect(day) {
        setDatepicker(day.format("YYYY/MM/DD"))
    }

    function handleChange(event) {
        const value = event.target.value;
        const day = value ? moment(value, "jYYYY/jMM/jDD").locale("fa") : moment().locale("fa");
        setDatepicker(value); 
        setSelectedDate(day);
    }
    return (
        <>
            <div style={{"width": "465px"}}>

                <Calendar selectedDay={selectedDate} onSelect={(day) => handleSelect(day)}/>
                <div className="form-group w-100 mt-2">
                    <input value={datepicker} onChange={handleChange} type="text" className="form-control" />
                </div>
            </div>
        </>
    )
}

export default memo(DatePicker);