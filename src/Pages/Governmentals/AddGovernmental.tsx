import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import plus2 from "../../assets/Icons/DashBoard/plus2.svg";
import { useAppDispatch } from "../../Store/store";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { changeActiveNav, changeCurrentPath } from "../../Store/user.slice";
import { handleAddGovernmental } from "../../Store/governmental.slice";

// Form field types
interface FormValues {
  name: string;
  link: string;
  classification: string;
  description: string;
}

// Initial form values
const initialValues: FormValues = {
  name: "",
  link: "",
  classification: "",
  description: "",
};

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("مطلوب"),
  link: Yup.string().url("يجب أن يكون رابط صالح").required("مطلوب"),
  classification: Yup.string().required("مطلوب"),
  description: Yup.string().required("مطلوب"),
});

// Reusable Input Component
const FormInput: React.FC<{ label: string; name: string; type?: string; as?: string }> = ({ label, name, type = "text", as }) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <Field
      type={type}
      name={name}
      as={as}
      className="mt-1 block w-full bg-[#F7F8F9] p-2 rounded-lg border border-[#999999]"
    />
    <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
  </div>
);

const AddGovernmental: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(changeCurrentPath("رفع الجهات الحكومية"));
    dispatch(changeActiveNav(4));
  }, [dispatch]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await dispatch(handleAddGovernmental(values));
            if (response.payload?.success) {
              toast.success("تمت الإضافة بنجاح");
              navigate(-1); 
            } else {
              toast.error(response.payload?.message || "حدث خطأ أثناء الإضافة");
            }
          } catch {
            toast.error("حدث خطأ غير متوقع");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <h2 className="font-bold text-main_color">ادخل بيانات  الجهة الحكومية</h2>

            {/* Row 1: Name & Link */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <FormInput label="اسم الجهة" name="name" />
              <FormInput label="الرابط" name="link" />
            </div>

            {/* Row 2: Classification & Report Summary */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <FormInput label="التصنيف" name="classification" />
              <FormInput label="نبذة عن الجهة" name="description" as="textarea" />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center md:justify-end gap-2 pb-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-black text-sm flex items-center gap-1 rounded-lg py-3 px-6 hover:bg-green-50 bg-[#EAF7E8] transition-colors"
                title="إلغاء"
              >
                <span className="sm:inline pe-2">إلغاء</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`text-white text-sm flex items-center gap-1 rounded-lg py-3 px-3 transition-colors ${
                  isSubmitting ? "bg-gray-400" : "bg-[#3D9635] hover:bg-green-600"
                }`}
                title="إضافة الحهة"
              >
                <img src={plus2} alt="plus2" className="w-4 h-4" />
                <span className="sm:inline pe-2">إضافة الحهة</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddGovernmental;
