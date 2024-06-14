'use client';

import { TextField } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import React from "react";

const newIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title">
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <SimpleMDE />
      <Button>Submit new Issue</Button>
    </div>
  );
};

export default newIssuePage;
