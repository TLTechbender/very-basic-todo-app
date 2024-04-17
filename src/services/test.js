import { v4 as uuidv4 } from "uuid";

const check = uuidv4();

console.log(check);


const obj = {
    me: 'pablo',
    you: 'smellos',
    them: 'jagos'

}
obj.id = check;
console.log(obj);
