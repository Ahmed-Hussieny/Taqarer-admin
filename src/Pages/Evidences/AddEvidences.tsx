import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import plus2 from '../../assets/Icons/DashBoard/plus2.svg';
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch } from "../../Store/store";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { changeCurrentPath } from "../../Store/user.slice";
import { handleAddEvidences } from "../../Store/evidence.slice";

interface FormValues {
  reportExcel: File | null;
}

const AddEvidences: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const initialValues: FormValues = { reportExcel: null };

  const validationSchema = Yup.object({
    reportExcel: Yup.mixed().required("مطلوب"),
  });

  useEffect(()=>{
    dispatch(changeCurrentPath('رفع الادلة'));
  }, [])

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setIsLoading(true);
          const formData = new FormData();

          if (values.reportExcel) {
            formData.append("excel", values.reportExcel);
          }

          const data = await dispatch(handleAddEvidences(formData));
          setIsLoading(false);

          if (data.payload.success) {
            toast.success("تمت الإضافة بنجاح");
          } else {
            toast.error(data.payload.message);
          }
        }}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-6">
            {/* Excel Upload */}
            <div>
              <label className="block text-sm font-medium">رفع ملف Excel</label>
              <input
                type="file"
                accept=".xlsx,.xls"
                id="file-upload"
                className="hidden"
                onChange={(event) => {
                  if (event.currentTarget.files && event.currentTarget.files.length > 0) {
                    const file = event.currentTarget.files[0];
                    setFieldValue("reportExcel", file);
                    setFileName(file.name);
                  }
                }}
              />
              <label
                htmlFor="file-upload"
                className="mt-1 flex items-center justify-center w-full bg-[#F7F8F9] p-2 rounded-lg border border-[#999999] cursor-pointer hover:bg-gray-200 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M8 12l4-4m0 0l4 4m-4-4v12" />
                </svg>
                <span className="ml-2 text-gray-700">رفع ملف Excel</span>
              </label>
              {fileName && (
                <p className="mt-2 text-sm text-gray-600">الملف المحدد: {fileName}</p>
              )}
              <ErrorMessage name="reportExcel" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center md:justify-end gap-2 pb-3 sm:pb-4">
              <button
                onClick={() => navigate(-1)}
                type="button"
                className="text-black text-sm flex items-center gap-1 rounded-lg py-3 px-6 hover:bg-green-50 bg-[#EAF7E8] transition-colors"
                title="الغاء"
                disabled={isLoading}
              >
                <span className='sm:inline pe-2'>الغاء</span>
              </button>
              <button
                type="submit"
                className="text-white text-sm flex items-center gap-1 rounded-lg py-3 px-3 bg-[#3D9635] hover:bg-green-600 transition-colors"
                title="اضافة التقرير"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                ) : (
                  <img src={plus2} alt="plus2" className="w-4 h-4" />
                )}
                <span className='sm:inline pe-2'>{isLoading ? "جاري التحميل..." : "اضافة الادلة"}</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEvidences;
