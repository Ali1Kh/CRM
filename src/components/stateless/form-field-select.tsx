import {
  Select,
  FormControl,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  FormField,
  FormItem,
  FormMessage,
  SelectItem,
} from "../ui/index";

interface IFormFieldSelect {
  name: string;
  control: any;
  totalItems: number;
  itemName: string;
  placeholder: string;
  reset?: boolean;
}

const FormFieldSelect = ({
  name,
  control,
  totalItems,
  itemName,
  placeholder,
  reset,
}: IFormFieldSelect) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="my-4">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{placeholder}</SelectLabel>
                {reset && <SelectItem value={"any"}>Any</SelectItem>}
                {generateArrOfValues(totalItems, itemName).map((el: any, i) => {
                  return (
                    <SelectItem key={i} value={el.value}>
                      {el.text}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

function generateArrOfValues(length: number, text: string) {
  return Array(length)
    .fill("")
    .map((_, i) => {
      return {
        value: (i + 1).toString(),
        text: `${i + 1} ${text}`,
      };
    });
}

export default FormFieldSelect;
