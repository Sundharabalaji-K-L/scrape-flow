"use server";


import {auth} from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function getWorkflowsForUser() {
    const {userId} = auth();
    if(!userId) {
        throw new Error("UnAuthenticated");
    }

    return prisma.workflow.findMany(
        {
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: "asc",
            }
        }
    );
}