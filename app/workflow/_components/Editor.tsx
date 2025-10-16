"use client";

import React from 'react';
import {Workflow} from "@prisma/client";
import {ReactFlowProvider} from "@xyflow/react";
import FlowEditor from "@/app/workflow/_components/FlowEditor";
import TopBar from "@/app/workflow/_components/tobar/TopBar";
import TaskMenu from "@/app/workflow/_components/TaskMenu";

const Editor = ({workflow}: {workflow: Workflow}) => {
    return (
       <ReactFlowProvider>
           <div className="flex flex-col h-full w-full overflow-hidden">
               <TopBar
                   title="Workflow editor"
                   subTitle={workflow.name}
                   workflowId={workflow.id}
               />

               <section className="flex h-full overflow-auto">
                   <TaskMenu />
                   <FlowEditor workflow={workflow} />
               </section>
           </div>
       </ReactFlowProvider>
    );
};

export default Editor;