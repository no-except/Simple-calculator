function operator(s){
    return (s==='+')||(s==='-')||(s==='*')||(s==='/')||(s==='^');
}

function _operator(s){
    return (s==='+')||(s==='-')||(s==='*')||(s==='/')||(s==='(')||(s===')')||(s==='^');
}

function Ans(ss){
    let s = [];
    for (let i=0;i<ss.length;i++){
        s.push(ss[i]);
    }
    if (operator(s[0]) && s[0]!=='-'){
        return 'Wrong expression'; 
    }
    for (let i=0;i<s.length-1;i++){
        if (operator(s[i]) && operator(s[i+1])){
            return 'Wrong expression';    
        }
        if (s[i] === '.' && s[i+1] === '.'){
            return 'Wrong expression'; 
        }
    }
    if (s[0] === '-'){
        s[0] = '^';
    }
    for (let i=1;i<s.length;i++){
        if ((s[i] === '-' && s[i-1] === '(') || (s[i] === '-' && operator(s[i-1]))){
            s[i] = '^';
        }
    }
    let index = 0;
    let rnp = [];
    let stack = [];
    while(true){
        if (index>=s.length){
            if (stack.length === 0){
                break;
            }
            else {
                if (operator(stack[stack.length-1])){
                    rnp.push(stack.pop());
                }
                else if (stack[stack.length-1] === '('){
                    return 'Wrong expression';
                }
            }
        }
        else {
            if (_operator(s[index])){
                if (stack.length === 0){
                    if (s[index] === ')'){
                        return 'Wrong expression';
                    }
                    stack.push(s[index]);
                    index++;
                }
                else {
                    if (s[index] === '+' || s[index] === '-' || s[index] === '^'){
                        if (operator(stack[stack.length-1])){
                            rnp.push(stack.pop());
                        }
                        else if (stack[stack.length-1] === '('){
                            stack.push(s[index]);
                            index++;
                        }
                    }
                    else if (s[index] === '*' || s[index] === '/'){
                        if (stack[stack.length-1] === '+' || stack[stack.length-1] === '-' || stack[stack.length-1] === '(' || stack[stack.length-1] === '^'){
                            stack.push(s[index]);
                            index++;
                        }
                        else if (stack[stack.length-1] === '*' || stack[stack.length-1] === '/'){
                            rnp.push(stack.pop());
                        }
                    }
                    else if (s[index] === '('){
                        stack.push(s[index]);
                        index++;
                    }
                    else if (s[index] === ')'){
                        if (stack[stack.length-1] === '('){
                            stack.pop();
                            index++;
                        }
                        else if (operator(stack[stack.length-1])){
                            rnp.push(stack.pop());
                        }
                    } 
                }
            }
            else {
                let left = index;
                let right = index;
                while(!_operator(s[index+1]) && index+1<s.length){
                    index++;
                }
                right = index;
                rnp.push(Number.parseFloat(ss.slice(left,right+1)));
                index++;
            }
        }
    } 
    for (let i=0;i<rnp.length;i++){
        if (operator(rnp[i])){
            if (stack.length === 0){
                return 'Wrong expression';
            }
            else if (stack.length === 1){
                if (rnp[i] === '^'){
                    stack.push(-stack.pop());
                }
                else {
                    return 'Wrong expression';
                }
            }
            else {
                if (rnp[i] === '^'){
                    stack.push(-stack.pop());
                }
                else {
                    let operand1 = stack.pop();
                    let operand2 = stack.pop();
                    if (rnp[i] === '+'){
                        stack.push(operand2+operand1);
                    }
                    if (rnp[i] === '*'){
                        stack.push(operand2*operand1);
                    }
                    if (rnp[i] === '/'){
                        stack.push(operand2/operand1);
                    }
                    if (rnp[i] === '-'){
                        stack.push(operand2-operand1);
                    }
                }
            }
        }
        else {
            stack.push(rnp[i]);
        }
    }
    return stack[0].toString();
}

export default Ans;