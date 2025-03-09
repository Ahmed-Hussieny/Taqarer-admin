import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../Store/store";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import plus2 from '../../assets/Icons/DashBoard/plus2.svg';
import { changeActiveNav, changeCurrentPath } from "../../Store/user.slice";
import { handleGetGovernmental, handleUpdateGovernmental } from "../../Store/governmental.slice";

interface FormValues {
  name: string;
  link: string;
  classification: string;
  description: string;
}

const UpdateGovernmental: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { governmentalId } = useParams();
  const [initialValues, setInitialValues] = useState<FormValues>({
    name: "",
    link: "",
    classification: "",
    description: "",
  });

  useEffect(() => {
    if (!governmentalId) return;
    
    const fetchGovernmental = async () => {
      try {
        const { payload } = await dispatch(handleGetGovernmental(governmentalId));
        if (payload?.success) {
          setInitialValues({
            name: payload.governmental.name || "",
            link: payload.governmental.link || "",
            classification: payload.governmental.classification || "",
            description: payload.governmental.description || "",
          });
        }
      } catch {
        toast.error("فشل تحميل الجهة الحكومية");
      }
    };

    fetchGovernmental();
  }, [dispatch, governmentalId]);

  useEffect(() => {
    dispatch(changeCurrentPath('رفع الجهات الحكومية'));
    dispatch(changeActiveNav(4));
  }, [dispatch]);

  const validationSchema = Yup.object({
    name: Yup.string().required("مطلوب"),
    link: Yup.string().url("يجب أن يكون رابط صالح").required("مطلوب"),
    classification: Yup.string().required("مطلوب"),
    description: Yup.string().required("مطلوب"),
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const { payload } = await dispatch(handleUpdateGovernmental({ id: governmentalId!, apiData: values }));
      if (payload.success) {
        toast.success("تم التحديث بنجاح");
        navigate(-1);
      } else {
        throw new Error(payload.message || "خطأ أثناء التحديث");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "حدث خطأ غير معروف");
    }
  };

  return (
    <div className="p-4 py-0">
      <Toaster position="top-right" />
      <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={handleSubmit}>
        {() => (
          <Form className="space-y-6">
            <h2 className="font-bold text-main_color">ادخل بيانات الجهة الحكومية</h2>

            {/* Name & Category */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium">رقم الجهة</label>
                <Field type="text" name="name" className="mt-1 block w-full bg-[#F7F8F9] p-2 rounded-lg border border-[#999999]" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium"> رابط الجهة</label>
                <Field type="text" name="link" className="mt-1 block w-full bg-[#F7F8F9] p-2 rounded-lg border border-[#999999]" />
                <ErrorMessage name="link" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            {/* Source & Summary */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium">تصنيف الجهة</label>
                <Field type="text" name="classification" className="mt-1 block w-full bg-[#F7F8F9] p-2 rounded-lg border border-[#999999]" />
                <ErrorMessage name="classification" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">نبذه عن الجهة</label>
                <Field as="textarea" name="description" className="mt-1 block w-full bg-[#F7F8F9] p-2 rounded-lg border border-[#999999]" />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center md:justify-end pb-3 sm:pb-4 justify-center gap-2">
              <button type="button" onClick={() => navigate(-1)} className="text-black text-sm flex items-center gap-1 rounded-lg py-3 px-6 hover:bg-green-50 bg-[#EAF7E8] transition-colors">
                <span className="sm:inline pe-2">الغاء</span>
              </button>
              <button type="submit" className="text-white text-sm flex items-center gap-1 rounded-lg py-3 px-3 hover:bg-green-600 bg-main_color transition-colors">
                <img src={plus2} alt="plus2" className="w-4 h-4" />
                <span className="sm:inline pe-2">تعديل الجهة الحكومية</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateGovernmental;
