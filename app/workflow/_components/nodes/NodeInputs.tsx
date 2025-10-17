import {Key, ReactNode} from "react";
import {Handle, Position} from "@xyflow/react";
import {cn} from "@/lib/utils";
import {TaskParm} from "@/types/task";
import NodeParmField from "@/app/workflow/_components/nodes/NodeParmField";
import string from "zod/src/v3/benchmarks/string";
import {ColorForHandle} from "@/app/workflow/_components/nodes/common";

export function NodeInputs(
    {
        children
    }: {
        children: ReactNode
    }
) {
    return (
        <div className="flex flex-col divide-y">
            {children}
        </div>
    )
}


export function NodeInput({input, nodeId}: { input: TaskParm, nodeId: string}) {
    return (
        <div className="flex justify-start relative p-3
        bg-secondary w-full">
           <NodeParmField param={input} nodeId={nodeId} />

            {!input.hideHandle && (
                <Handle
                    id={input.name}
                    type="target"  position={Position.Left}
                    className={cn("!bg-muted-foreground !border-2 !border-background " +
                        "!-left-2 !w-4 !h-4",
                    ColorForHandle[input.type])}
                />
            )}
        </div>

    )
}