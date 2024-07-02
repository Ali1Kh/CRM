import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
} from "../ui/index";
import React from "react";

type Item = {
  value: string;
  text: string;
};

function generateRadioItems(dataArr: Item[]) {
  return dataArr.map(({ value, text }, i) => {
    return (
      <FormItem className="flex items-center space-x-3 space-y-0" key={i}>
        <FormControl>
          <RadioGroupItem value={value} />
        </FormControl>
        <FormLabel className="font-normal">{text}</FormLabel>
      </FormItem>
    );
  });
}

interface IForm_Field_Radio {
  control: any;
  label: string;
  name: string;
  dataArr: Item[];
}

function Form_Field_Radio({
  control,
  label,
  name,
  dataArr,
}: IForm_Field_Radio) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {generateRadioItems(dataArr)}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default Form_Field_Radio;
