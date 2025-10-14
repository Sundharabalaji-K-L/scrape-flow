"use client";

import React, {useCallback} from 'react';
import {TaskParamType, TaskParm} from "@/types/task";
import StringParm from "@/app/workflow/_components/nodes/param/StringParm";
import {useReactFlow} from "@xyflow/react";
import {AppNode} from "@/types/appNode";

const NodeParmField = ({param, nodeId}: {param: TaskParm, nodeId: string}) => {
    const {updateNodeData , getNode} = useReactFlow();
    const node = getNode(nodeId) as AppNode;
    const value = node?.data.inputs?.[param.name] || "";

    const updateNodeParamValue = useCallback((newValue: string)=> {
        updateNodeData(nodeId, {
            inputs: {
                ...node.data.inputs,
                [param.name]: newValue,
            }
        })
    }, [
       updateNodeData, param.name, node?.data.inputs, nodeId
    ]);

   switch (param.type) {
       case TaskParamType.STRING:
           return (
               <StringParm param={param} value={value} updateParamValue={updateNodeParamValue} />
           )

       default:
           return <div className="w-full">
               <p className="text-xs text-muted-foreground">Not Implemented</p>
           </div>;
   }
};

export default NodeParmField;