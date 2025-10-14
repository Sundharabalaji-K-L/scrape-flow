"use client";

import React from 'react';
import {Button} from "@/components/ui/button";
import {CheckIcon} from "lucide-react";

const SaveBtn = () => {
    return (
        <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={()=>
        alert("Todo")}
        >
            <CheckIcon  size={16} className="stroke-green-400"/>
            Save
        </Button>
    );
};

export default SaveBtn;