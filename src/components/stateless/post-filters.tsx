import {
  Button,
  Separator,
  Slider_with_text,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/index";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldSelect from "./form-field-select";
import Form_Field_Radio from "./form-field-radio";
import Form_Field_Checkbox from "./form-field-checkbox";

import { updateSearchQuery } from "../../libs/update-search-params";
import {
  unstable_HistoryRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";

const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
];

const Title = ({ children }: { children: string }) => (
  <h3 className="text-lg mb-2">{children}</h3>
);

const tempDataArrRadio: any = [
  { value: "any", text: "Any" },
  { value: "1-2", text: "1-2 months" },
  { value: "6-12", text: "6-12 months" },
  { value: "12-24", text: "1-2 years" },
];

const FormSchema = z.object({
  rooms: z.string().optional(),
  kitchens: z.string().optional(),
  bathrooms: z.string().optional(),
  rental: z.string().optional(),
  price: z.number().optional().default(0),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

function Post_Filters() {
  const SLIDER_INITIAL_VALUE = [50];
  const router = null;
  const location = useLocation();
  const pathname = location.pathname;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["recents"],
    },
  });

  const resetFilters = () => {
    return form.reset();
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    updateSearchQuery(data, router, pathname);
  }

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1 p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Form_Field_Checkbox
                control={form.control}
                description="Select a category"
                items={items}
                title="Category"
                name={"items"}
              />
              <Separator className="my-4" />
              <Title>Price Range</Title>
              <FormField
                control={form.control}
                name="price"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel />
                    <FormControl>
                      <Slider_with_text
                        max={1000}
                        step={50}
                        min={SLIDER_INITIAL_VALUE[0]}
                        currency="$"
                        defaultValue={[value as number]}
                        value={[value as number]}
                        onValueChange={(vals) => {
                          onChange(vals[0]);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Click on slider to activate
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator className="my-4" />
              <Title>Rooms</Title>

              <FormFieldSelect
                control={form.control}
                name="kitchens"
                itemName="Kitchens"
                placeholder="Select no. of kitchens"
                totalItems={6}
              />
              <FormFieldSelect
                control={form.control}
                name="bathrooms"
                itemName="Bathrooms"
                placeholder="Select no. of bathrooms"
                totalItems={6}
                reset
              />
              <FormFieldSelect
                control={form.control}
                name="rooms"
                itemName="Rooms"
                placeholder="Select no. of rooms"
                totalItems={6}
              />

              <Separator className="my-4" />
              <Title>Rental Period</Title>
              <Form_Field_Radio
                control={form.control}
                dataArr={tempDataArrRadio}
                label="Select rental duration"
                name="rental"
              />
              <Button className="w-full mt-4" type="submit">
                Apply Filters
              </Button>
              <Button
                className="w-full mt-4"
                variant={"outline"}
                type="reset"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Post_Filters;
