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
import Spinner from "@/app/components/spinner";

type IssueForm = z.infer<typeof validationSchema>;

const newIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: {errors} } = useForm<IssueForm>(
    {resolver: zodResolver(validationSchema)}
  );
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred");
    }
  })

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className = 'mb-2'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={onSubmit}
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
        <Button disabled = {isSubmitting}> Submit new Issue {isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  );
};

export default newIssuePage;
