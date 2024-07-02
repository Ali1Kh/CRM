import { useParams } from "react-router-dom";
import Reset_Password_Form from "../../forms/reset-password/reset-password-form";
import AuthLayout from "../../layouts/auth-layout";
function Update_Password() {
  const params = useParams();
  const token = params?.token;
  return (
    <AuthLayout>
      <Reset_Password_Form />
    </AuthLayout>
  );
}

export default Update_Password;
