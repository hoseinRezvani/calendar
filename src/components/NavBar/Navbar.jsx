import { memo, useContext } from "react"
import styles from "./NavBar.module.css"
import { CoreContext } from "../../App";

function NavBar(props) {
    
    
    return (
        <>
            <div className={styles.topNav}>
                <div className="logo">
                    Logo
                </div>
                <div></div>
            </div>
        </>
    )
}

export default memo(NavBar);