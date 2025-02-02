import { useState } from "react";
import styles from "./Form.module.css"; 
import Numeric from "../Numeric/Numeric";

export default function Form(props) {

    const [form, setForm] = useState({});

    function handleChange(event) {
        
        const name = event.target.name;
        const value = event.target.value;
        setForm(prev => ({...prev, [name]: value})); 
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(form);        
    }

    function handlePopulate() {
        setForm(prev => ({...prev, username: "hosein agha", password: "sirusak"})); 
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.formController}>
                    <label htmlFor="username">username</label>
                    <input onChange={handleChange} type="text" name="username" value={form.username || ""} id="username" />
                </div>

                <div className={styles.formController}>
                    <label htmlFor="password">password</label>
                    <input onChange={handleChange} type="password" name="password" value={form.password || ""} id="password" />
                </div>

                <div className={styles.formController}>
                    <label htmlFor="salary">salary</label>
                    <Numeric name="salary" onChange={handleChange} />
                </div>

                <div className={styles.action} style={{"marginTop": "1rem"}}>
                    <button className={styles.button} type="submit">submit</button>
                    <button onClick={handlePopulate} className={styles.button} type="button">populate</button>
                </div>
            </form>
        </>
    )
} 