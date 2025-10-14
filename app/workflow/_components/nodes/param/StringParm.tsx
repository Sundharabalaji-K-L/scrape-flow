"use client";


import React, {useId, useState} from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {ParamProps} from "@/types/appNode";


const StringParm = ({param, value, updateParamValue}: ParamProps) => {
    const [internalValue, setInternalValue] = useState(value);
    const id = useId();

    return (
        <div className="space-y-1 p-1 w-full">
            <Label  htmlFor={id} className="text-xs flex">
                {param.name}
                {param.required && <p className="text-red-400 px-2">*</p>}
            </Label>
            <Input id={id}  value={internalValue} placeholder="Enter value here"
                   onChange={e=>{
                setInternalValue(e.target.value);
            }}
                   onBlur={e=>updateParamValue(e.target.value)}
                   className="text-xs"
            />
            {param.helperText && (
                <p className="text-muted-foreground px-2">{param.helperText}</p>
            )}
        </div>
    );
};

export default StringParm;