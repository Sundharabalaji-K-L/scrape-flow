"use server";


import {createWorkflowSchema, createWorkflowSchemaType} from "@/schema/workflows";
import {auth} from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import {workflowStatus} from "@/types/workflow";
import {redirect} from "next/navigation";
import {AppNode} from "@/types/appNode";
import {Edge} from "@xyflow/react";
import {CreateFlowNode} from "@/lib/workflow/createFlowNode";
import {TaskType} from "@/types/task";

export async function CreateWorkflow(form: createWorkflowSchemaType) {
    const {success, data} = createWorkflowSchema.safeParse(form);

    if(!success) {
        throw new Error("Invalid form data");
    }

    const {userId} = auth();
    if(!userId) {
        throw new Error("unauthenticated");
    }

    const initialFlow: {nodes: AppNode[], edges: Edge[]} = {
      nodes: [],
      edges: []
    };

    initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));
    const result = await prisma.workflow.create({
        data: {
            userId: userId,
            status: workflowStatus.DRAFT,
            definition: JSON.stringify(initialFlow),
            ...data
        },
    });

    if(!result) {
        throw new Error("failed to create workflow");
    }

    redirect(`/workflow/editor/${result.id}`);
}