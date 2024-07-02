import { useParams } from "react-router-dom";
import Login_Form from "../../forms/login/login_form";
import AuthLayout from "../../layouts/auth-layout";
function SignIn() {
  const params = useParams();
  const lng = params?.lng;
  console.log(lng);
  return (
    <AuthLayout>
      <Login_Form lng={lng as string} />
    </AuthLayout>
  );
}

export default SignIn;
