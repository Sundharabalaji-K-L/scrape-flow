"use client";

import React, {useCallback, useState} from 'react';
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Layers2Icon, Loader2} from "lucide-react";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import {useForm} from "react-hook-form";
import {createWorkflowSchema, createWorkflowSchemaType} from "@/schema/workflows";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    FormControl,
    Form,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {useMutation} from "@tanstack/react-query";
import {CreateWorkflow} from "@/actions/workflows/createWorkflow";
import {toast} from "sonner";

const CreateWorkflowDialog = ({triggerText}:{
    triggerText?:string,
}) => {
    const [open, setOpen] = useState(false);
    const form = useForm<createWorkflowSchemaType>({
        resolver: zodResolver(createWorkflowSchema),
        defaultValues: {},
    });

    const {mutate, isPending} = useMutation({
        mutationFn: CreateWorkflow,
        onSuccess: () => {
            toast.success("Workflow created!", {id: "create-workflow"});
        },
        onError: () => {
            toast.error("Failed to create workflow!", {id: "create-workflow"});
        }
    });

    const onSubmit = useCallback((
        value: createWorkflowSchemaType
    )=> {
        toast.loading("Creating workflow...", {id: "create-workflow"});
        mutate(value);

    }, [mutate]);
    return (
       <Dialog open={open} onOpenChange={open => {
           form.reset();
           setOpen(open);
       }}>
           <DialogTrigger asChild>
               <Button>{triggerText ?? "Create workflow"}</Button>
           </DialogTrigger>

           <DialogContent className="px-0">
               <CustomDialogHeader
                   icon = {Layers2Icon}
                   title="Create workflow"
                   subTitle="Start building your workflow"
               />

               <div className="p-6">
                   <Form {...form}>
                       <form className="space-y-8 w-full"
                       onSubmit={form.handleSubmit(onSubmit)}>
                           <FormField
                               name="name"
                               render={({field})=>(
                                   <FormItem>
                                       <FormLabel>
                                           Name
                                           <p className="text-xs text-primary">(required)</p>
                                       </FormLabel>
                                       <FormControl>
                                           <Input {...field} />
                                       </FormControl>
                                       <FormDescription>
                                           Choose a descriptive and unique name
                                       </FormDescription>
                                   </FormItem>
                               )}>

                           </FormField>

                           <FormField
                               name="description"
                               render={({field})=>(
                                   <FormItem>
                                       <FormLabel>
                                           Description
                                           <p className="text-xs text-muted-foreground">(optional)</p>
                                       </FormLabel>
                                       <FormControl>
                                           <Textarea {...field} className="resize-none"/>
                                       </FormControl>
                                       <FormDescription>
                                           Provide a brief description of what your workflow does.
                                           <br/> This is optional but can hellp you remember the
                                           workflow&apos;s purpose
                                       </FormDescription>
                                   </FormItem>
                               )}>

                           </FormField>
                           <Button type="submit" className="w-full" disabled={isPending}>
                               {!isPending && "Proceed"}

                               {isPending && <Loader2  className="animate-spin" />}
                           </Button>
                       </form>
                   </Form>
               </div>
           </DialogContent>
       </Dialog>
    );
};

export default CreateWorkflowDialog;