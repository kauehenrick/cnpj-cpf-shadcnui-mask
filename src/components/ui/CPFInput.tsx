import { useReducer } from "react";
import { UseFormReturn } from "react-hook-form";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type TextInputProps = {
    form: UseFormReturn<any>;
    name: string;
};

function cpf(v: string) {
    v = v.replace(/\D/g, "");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return v;
}

export default function CPFInput(props: TextInputProps) {
    const initialValue = props.form.getValues()[props.name] || "";

    const [value, setValue] = useReducer((_: any, next: string) => {
        return cpf(next);
    }, initialValue);

    function handleChange(realChangeFn: Function, formattedValue: string) {
        const digits = formattedValue.replace(/\D/g, "");
        realChangeFn(digits);
    }

    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => {
                const _change = field.onChange;

                return (
                    <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                            <Input
                                placeholder=""
                                type="text"
                                maxLength={14}
                                {...field}
                                value={value}
                                onChange={(ev) => {
                                    const newValue = ev.target.value;
                                    setValue(newValue);
                                    handleChange(_change, newValue);
                                }}
                                className='w-[220px]'
                            />
                        </FormControl>
                        <FormDescription className="hidden" />
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}