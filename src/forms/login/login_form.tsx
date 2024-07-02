import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useToast,
  Input,
  Label,
} from "../../components/ui/index";
import { Link } from "react-router-dom";
// import { useTranslation } from "../../i18n/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./form.schema";

function Login_Form({ lng }: { lng: string }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // const response = await signIn("credentials", {
    //   email: values.email,
    //   password: values.password,
    //   redirect: false,
    // });
    // if (response?.error)
    //   return toast({
    //     title: "Error",
    //     description: "Invalid username or password.",
    //     variant: "destructive",
    //   });

    // return toast({
    //   title: "Success",
    //   variant: "success",
    //   description: "Login successfully, You may redirect to dashboard",
    // });
    return toast({
      title: "Error",
      description: "Please implement the login in forms/login/login_form",
      variant: "destructive",
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 min-w-[400px]"
        >
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Signin</h1>
            <p className="text-balance text-muted-foreground">
              Enter the details below to signin to your account
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
                <FormDescription className="text-right">
                  <Link
                    className="underline text-sm"
                    to={"/auth/forget-password"}
                  >
                    Forget Password
                  </Link>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button
            variant="outline"
            type="button"
            className="w-full"
            // onClick={async () => await signIn('google')}
          >
            Login with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/auth/register" className="underline">
              Register
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}

export default Login_Form;
