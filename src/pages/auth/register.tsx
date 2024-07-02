import Register_Form from "../../forms/register/register_form";
import AuthLayout from "../../layouts/auth-layout";

function SignUp() {
  return (
    <AuthLayout>
      <Register_Form />
    </AuthLayout>
  );
}

export default SignUp;
