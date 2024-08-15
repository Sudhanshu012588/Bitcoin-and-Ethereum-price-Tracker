import { InputProps } from "./Input";
import Input from "./Input.tsx"
export default function AmountInput(props:InputProps){
    return(
        <>
       
        <div>
        <Input 
        placeholder="Amount"
        value={props.value} 
        onChange={props.onChange}
        />
        <span className="text-white/50 px-4">USD</span>
        </div>
        </>
    )
}