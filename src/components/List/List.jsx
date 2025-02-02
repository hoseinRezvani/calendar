import { memo } from "react"
import styles from "./List.module.css"

function List({ items }) {

    return (
        <>
            <div className={styles.listWrapper}>
                <ul>
                    {
                        items.map((i, index) => <li key={index}>{i}</li>)
                    }

                </ul>
            </div>
        </>
    )
}

export default memo(List)