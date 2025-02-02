import { useContext, useState } from "react"
import { CoreContext } from "../../App";

export default function Numeric(props) {
    const context = useContext(CoreContext); 

    console.log(context);
    const [value, setValue] = useState("");

    function handleChange(event) {
        const rawValue = event.target.value;
        const onlynumber = rawValue.replace(/[^0-9]/g, "");
        const number = onlynumber ? parseInt(onlynumber) : "";
        setValue(number);

        if (props.onChange) {
            event.target.value = number;
            props.onChange(event);
        }
    }

    return (
        <input type="text" name={props.name || "numeric"} onChange={handleChange} value={value} />
    )
}