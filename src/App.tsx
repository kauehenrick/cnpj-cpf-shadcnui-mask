"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import CNPJInput from "./components/ui/CNPJInput";
import CPFInput from "./components/ui/CPFInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  personRegisterNumber: z.string().min(2).max(50),
  personType: z.string(),
});

function App() {
  const [handlePersonType, setHandlePersonType] = useState("juridica");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personRegisterNumber: "",
      personType: "juridica",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <FormField
            control={form.control}
            name="personType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de pessoa</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setHandlePersonType(value);
                  }}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Selecione o tipo de pessoa" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="juridica">Jurídica</SelectItem>
                    <SelectItem value="fisica">Física</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {handlePersonType == "juridica"
            ? <FormField
              control={form.control}
              name="personRegisterNumber"
              render={({ field }) => (
                <CNPJInput form={form} {...field} />
              )}
            />
            : <FormField
              control={form.control}
              name="personRegisterNumber"
              render={({ field }) => (
                <CPFInput form={form} {...field} />
              )}
            />
          }
        </div>
      </form>
    </Form>
  )
}

export default App
