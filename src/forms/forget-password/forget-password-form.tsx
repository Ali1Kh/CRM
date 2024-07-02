import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useToast,
  Input,
} from "../../components/ui/index";
import { Link } from "react-router-dom";

import { formSchema } from "./form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { forget_password } from "../../services/auth.service";
import { z } from "zod";

function Forget_Password_Form() {
  // const response = await forget_password({ email });
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await forget_password(values);
      if (response) {
        toast({
          title: "Reset token sent!",
          description: "Please check your mail for reset token.",
        });
      }
    } catch (error: any) {
      if (error.data) {
        const { message, status } = error.data;
        return toast({
          title: status,
          description: message,
          variant: "destructive",
        });
      }
      return toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 min-w-[400px]"
      >
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Forget Password</h1>
          <p className="text-balance text-muted-foreground">
            Enter the email below to request reset token
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Login
        </Button>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/auth/signin" className="underline">
            Sign In
          </Link>
        </div>
      </form>
    </Form>
  );
}

export default Forget_Password_Form;
