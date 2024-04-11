import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import weatherService from "../services/weatherService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

function Subscribe() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await weatherService.unsubcriber(values.email);

        toast.success(res.message);

        navigate("/", {
          replace: true,
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("An error occurred");
        }
      }
    },
  });

  return (
    <div className="max-w-[1000px] mx-auto mt-6 p-4">
      <h1 className="uppercase font-semibold text-3xl text-center">
        Unsubcribe
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

        <Button className="!bg-Blue mt-8 text-white !rounded-md" type="submit">
          Unsubcribe
        </Button>
      </form>
    </div>
  );
}

export default Subscribe;
