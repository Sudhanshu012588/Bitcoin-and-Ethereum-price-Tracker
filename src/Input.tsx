import { ChangeEventHandler } from "react";


export type InputProps = {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    placeholder?:string;
}
export default function input(props:InputProps){
    return(<>
        <div className=" bg-blue-950 border border-white/10"></div>
        <input
          className=" text-right border-0 w-24 bg-blue-950 p-2 pl-4 rounded-lg"
          type="text"
          value={props.value}
          onChange={props.onChange}/>
          </>
    )
}