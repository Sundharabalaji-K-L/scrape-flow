import {Node} from "@xyflow/react";
import {TaskParm, TaskType} from "@/types/task";


export interface AppNodeData {
    type: TaskType;
    inputs: Record<string, string>;
    [key: string]: any;
}

export interface AppNode extends Node {
    data: AppNodeData;
}

export interface ParamProps {
    param: TaskParm;
    value: string;
    updateParamValue: (newValue: string) => void;
}
