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
import Footer from "./components/Footer";
import Header from "./components/Header";

const formSchema = z.object({
  cpf: z.string().min(11, { message: "O CPF deve conter 11 caracteres." }),
  cnpj: z.string().min(14, { message: "O CNPJ deve conter 14 caracteres." }),
  personRegisterNumber: z.string().min(2).max(50),
  personType: z.string(),
});

function App() {
  const [handlePersonType, setHandlePersonType] = useState("juridica");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: "",
      cnpj: "",
      personType: "juridica",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <main className="flex flex-col items-center justify-between h-screen py-7">
      <Header />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-end space-y-8">
          <div className="flex gap-3">
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
                name="cnpj"
                render={({ field }) => (
                  <CNPJInput form={form} {...field} />
                )}
              />
              : <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <CPFInput form={form} {...field} />
                )}
              />
            }
          </div>

          <Button type="submit">Salvar</Button>
        </form>
      </Form>

      <Footer />
    </main>
  )
}

export default App
