import styles from './css/input.module.css'
import React from 'react'

function input({input__value,changeInput}){
    let font = {fontSize:24};
    if (input__value.length>20){
        font.fontSize = 22;
    }
    if (input__value.length>30){
        font.fontSize = 20;
    }
    if (input__value.length>35){
        font.fontSize = 18;
    }
    return (
        <input style = {font} onChange = {(e)=>{changeInput(e.target.value)}} value={input__value} className={styles.input}></input>
    );
}

export default input;