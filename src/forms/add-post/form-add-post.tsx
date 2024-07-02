import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  toast,
} from "../../components/ui/index";
import { useForm } from "react-hook-form";
import { formSchema } from "./form-schema";
import { z } from "zod";
import FormFieldSelect from "../../components/stateless/form-field-select";
import { FileInput } from "../../components/stateful/file-input";
import useGallery from "../../hooks/use-gallery";

function Form_Add_Post() {
  const galleryHandlers = useGallery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: [],
      description: "",
      property_details: [],
      bedrooms: "0",
      bathrooms: "0",
      length: "0",
      width: "0",
      images: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    var formData = new FormData();
    console.log(typeof values);

    const valuesCopy: any = { ...values };

    // // Loop through the object and append each key-value pair to the FormData object
    for (var key in valuesCopy) {
      if (valuesCopy.hasOwnProperty(key)) {
        const value = valuesCopy[key];
        formData.append(key, value);
      }
    }

    const imagesArray = galleryHandlers.input.map((el: any) => el.file);

    for (var i = 0; i < imagesArray.length; i++) {
      formData.append("images[]", imagesArray[i]);
    }

    //make requeset here.
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 min-w-[400px] pb-10"
      >
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Post an advert</h1>
          <p className="text-balance text-muted-foreground">
            Enter the details below to post an advert
          </p>
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title for post" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Please enter the description"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormFieldSelect
          itemName="Bedrooms"
          control={form.control}
          name="bedrooms"
          placeholder="Select no. of bedrooms"
          totalItems={6}
        />
        <FormFieldSelect
          itemName="Kitchens"
          control={form.control}
          name="bathrooms"
          placeholder="Select no. of Kitchens"
          totalItems={6}
        />
        <div className="flex gap-x-3">
          <FormField
            control={form.control}
            name="length"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Length</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the length in sqft"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Width</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the width in sqft"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormItem>
          <FormLabel>Gallery</FormLabel>
          <FileInput {...galleryHandlers} />
        </FormItem>

        <div className="flex gap-x-4 justify-end">
          <Button type="submit">Save</Button>
          <Button type="button" variant={"secondary"}>
            Publish
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default Form_Add_Post;
