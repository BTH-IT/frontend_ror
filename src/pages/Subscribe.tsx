import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import weatherService from "../services/weatherService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  location: Yup.string().required("Location is required"),
});

function Subscribe() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      location: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await weatherService.subcriber(
          values.email,
          values.location
        );

        toast.success(res.message);

        navigate("/confirm-email", {
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
      <h1 className="uppercase font-semibold text-3xl text-center">Subcribe</h1>
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
          <label htmlFor="location">Location:</label>
          <Input
            id="location"
            name="location"
            type="text"
            placeholder="Location"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
          />
          <div className="text-red-400">
            {formik.touched.location && formik.errors.location
              ? formik.errors.location
              : ""}
            &nbsp;
          </div>
        </div>

        <Button className="!bg-Blue mt-4 text-white !rounded-md" type="submit">
          Subcribe
        </Button>
      </form>
    </div>
  );
}

export default Subscribe;
