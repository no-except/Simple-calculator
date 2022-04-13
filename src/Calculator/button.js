import styles__btn from './css/button.module.css'
import React from 'react'

function button({text}){
    return (
        <div className={styles__btn.btn}>{text}</div>
    );
}
export default button;