"use server";


import {createWorkflowSchema, createWorkflowSchemaType} from "@/schema/workflows";
import {create} from "node:domain";
import {auth} from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import {workflowStatus} from "@/types/workflow";
import {redirect} from "next/navigation";

export async function CreateWorkflow(form: createWorkflowSchemaType) {
    const {success, data} = createWorkflowSchema.safeParse(form);

    if(!success) {
        throw new Error("Invalid form data");
    }

    const {userId} = auth();
    if(!userId) {
        throw new Error("unauthenticated");
    }

    const result = await prisma.workflow.create({
        data: {
            userId: userId,
            status: workflowStatus.DRAFT,
            definition: "TODO",
            ...data
        },
    });

    if(!result) {
        throw new Error("failed to create workflow");
    }

    redirect(`/workflow/editor/${result.id}`);
}