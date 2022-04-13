import Input from './input'
import Button from './button';
import styles from './css/calculator.module.css'
import styles__btn from './css/button.module.css'
import React from 'react'
import Ans from './Ans'

function Calculator(){
    let [input__value,setValue] = React.useState('');
    const buttons = ['C','Del','(',')','/','1','2','3','.','*','4','5','6','-','+','7','8','9','0','Ans'];

    function changeInput(s){
        if (s[0] === 'W'){
            let ss = s.slice(16);
            setValue(ss);
        }
        else {
            setValue(s);
        }
    }
    return (
        <div className = {styles.calc__body}>
            <Input changeInput= {changeInput} input__value={input__value}></Input>
            <div onClick = {(e)=>{
                if (e.target.className === styles__btn.btn){
                    if (e.target.textContent === 'Del'){
                        setValue(input__value.slice(0,input__value.length-1));
                    }
                    else if (e.target.textContent === 'C'){
                        setValue('');
                    }
                    else if (e.target.textContent === 'Ans'){
                        let res = Ans(input__value);
                        if (res === Infinity){
                            setValue("Wrong Expression");
                        }
                        else {
                            setValue(res);
                        }
                    }
                    else {
                        changeInput(input__value+e.target.textContent);
                    }
                }
            }}className={styles.button__grid}>
            {
                buttons.map((item,index)=>{
                    return <Button index={index} key={index} text={item}></Button>
                })
            }
            </div>
        </div>
    );
}

export default Calculator;