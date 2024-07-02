import { Link } from "react-router-dom";
import { reset_password } from "../../services/auth.service";
import { useLocation } from "react-router-dom";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast,
} from "../../components/ui/index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./form.schema";
import { z } from "zod";

function Reset_Password_Form() {
  const location = useLocation();
  const pathname = location.pathname;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = pathname.split("/").slice(-1)[0];
    try {
      const response = await reset_password(values, token);
      if (response) {
        toast({
          title: "Success",
          description: "Password update Successfully!",
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
          <h1 className="text-3xl font-bold">Update Password</h1>
          <p className="text-balance text-muted-foreground">
            Enter the details below to update password
          </p>
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter new password"
                  type="password"
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
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm your password"
                  type="password"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Update Password
        </Button>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="signin" className="underline">
            Sign In
          </Link>
        </div>
      </form>
    </Form>
  );
}

export default Reset_Password_Form;
