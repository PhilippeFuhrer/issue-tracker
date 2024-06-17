"use client";

import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios, { Axios } from "axios";
import "easymde/dist/easymde.min.css";
import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from '@hookform/resolvers/zod'
import { validationSchema } from "@/app/validationSchema";
import { z } from 'zod';
import ErrorMessage from "@/app/components/errorMessage";

type IssueForm = z.infer<typeof validationSchema>;

const newIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: {errors} } = useForm<IssueForm>(
    {resolver: zodResolver(validationSchema)}
  );
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className = 'mb-2'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")}>
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>
        <Button>Submit new Issue</Button>
      </form>
    </div>
  );
};

export default newIssuePage;
