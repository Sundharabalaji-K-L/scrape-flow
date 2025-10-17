"use client";

import React from 'react';
import {ParamProps} from "@/types/appNode";

const BrowserInstanceParm = ({param}: ParamProps) => {
    return (
      <p className="text-xs">{param.name}</p>
    );
};

export default BrowserInstanceParm;