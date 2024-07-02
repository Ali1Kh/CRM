"use client";
import {
  Button,
  Input,
  Form,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormField,
  useToast,
} from "../../components/ui/index";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./form.schema";
import { register_account } from "../../services/auth.service";

function Register_Form() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await register_account(values);
      if (response) {
        toast({
          title: "Registration Successful",
          description: "Now you can login with your account.",
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
          <h1 className="text-3xl font-bold">Register an account</h1>
          <p className="text-balance text-muted-foreground">
            Enter the details below to create an account
          </p>
        </div>
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input placeholder="Enter your fullname" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a password"
                  {...field}
                  required
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
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

export default Register_Form;
