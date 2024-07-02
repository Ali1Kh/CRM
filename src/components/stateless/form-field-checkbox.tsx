import { FormControl, Checkbox, FormLabel, FormMessage } from "../ui/index";
import { FormField, FormItem, FormDescription } from "../ui/index";
import React from "react";

type Item = {
  id: string;
  label: string;
};

function Form_Field_Checkbox({
  control,
  items,
  title,
  description,
  name,
}: // form,
{
  control: any;
  items: any;
  title: string;
  description: string;
  name: string;
  // form: any;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormDescription>{description}</FormDescription>
          </div>

          {items.map((item: any) => (
            <FormField
              key={item.id}
              control={control}
              name="items"
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value: any) => value !== item.id
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{item.label}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default Form_Field_Checkbox;
