import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import weatherService from "../services/weatherService";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  token: Yup.string().required("Token is required"),
});

function ConfirmEmail() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      token: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await weatherService.confirm(values.email, values.token);

        toast.success(res.message);

        navigate("/", {
          replace: true,
        });
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An error occurred");
        }
      }
    },
  });

  return (
    <div className="max-w-[1000px] mx-auto mt-6 p-4">
      <h1 className="uppercase font-semibold text-3xl text-center">
        Verify Email
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email:</label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <div className="text-red-400">
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""}
            &nbsp;
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="token">Token:</label>
          <Input
            id="token"
            name="token"
            type="text"
            placeholder="token"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.token}
          />
          <div className="text-red-400">
            {formik.touched.token && formik.errors.token
              ? formik.errors.token
              : ""}
            &nbsp;
          </div>
        </div>

        <Button className="!bg-Blue mt-8 text-white !rounded-md" type="submit">
          Verify
        </Button>
      </form>
    </div>
  );
}

export default ConfirmEmail;
