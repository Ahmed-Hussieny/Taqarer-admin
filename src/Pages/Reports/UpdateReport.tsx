import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch } from "../../Store/store";
import { handleGetReport, handleUpdateReport } from "../../Store/report.slice";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import plus2 from '../../assets/Icons/DashBoard/plus2.svg'
import { changeCurrentPath } from "../../Store/user.slice";

interface FormValues {
  reportId: string;
  reportName: string;
  reportCategory: string;
  reportSource: string;
  reportYear: number | null;
  reportSummary: string;
  reportLink: string;
  reportPdf: File | null;
}

const UpdateReport: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { reportId } = useParams();
  const [initialValues, setInitialValues] = useState<FormValues>({
    reportId: "",
    reportName: "",
    reportCategory: "",
    reportSource: "",
    reportYear: null,
    reportSummary: "",
    reportLink: "",
    reportPdf: null,
  });

  useEffect(() => {
    const fetchReport = async () => {
      if (!reportId) return;
      try {
        const { payload } = await dispatch(handleGetReport(reportId));
        if (payload?.success) {
          setInitialValues({
            reportId: payload.report.reportId || "",
            reportName: payload.report.name || "",
            reportCategory: payload.report.classification || "",
            reportSource: payload.report.source || "",
            reportYear: payload.report.year || null,
            reportSummary: payload.report.description || "",
            reportLink: payload.report.link || "",
            reportPdf: null,
          });
        }
      } catch {
        toast.error("فشل تحميل التقرير");
      }
    };
    fetchReport();
  }, [dispatch, reportId]);

  const validationSchema = Yup.object().shape({
    reportId: Yup.string().required("مطلوب"),
    reportName: Yup.string().required("مطلوب"),
    reportCategory: Yup.string().required("مطلوب"),
    reportSource: Yup.string().required("مطلوب"),
    reportYear: Yup.number().required("مطلوب"),
    reportSummary: Yup.string().required("مطلوب"),
    reportLink: Yup.string().url("يجب أن يكون رابط صالح").required("مطلوب"),
    reportPdf: Yup.mixed().nullable(),
  });

  const handleSubmit = async (values: FormValues) => {
    const formData = new FormData();
    formData.append("reportId", values.reportId);
    formData.append("name", values.reportName);
    formData.append("classification", values.reportCategory);
    formData.append("source", values.reportSource);
    formData.append("year", values.reportYear?.toString() || "");
    formData.append("description", values.reportSummary);
    formData.append("link", values.reportLink);
    if (values.reportPdf) formData.append("pdf", values.reportPdf);

    try {
      const { payload } = await dispatch(handleUpdateReport({
        id: reportId as string,
        apiData: formData,
      }));
      if (payload.success) {
        toast.success("تم التحديث بنجاح");
        navigate(-1);
      } else {
        throw new Error(payload.message || "خطأ أثناء التحديث");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

    useEffect(()=>{
      dispatch(changeCurrentPath('رفع التقارير'));
    },[])

  return (
    <div className="p-4 py-0">
      <Toaster position="top-right" />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-6">
            <h2 className="font-bold text-main_color">ادخل بيانات التقرير</h2>
            {/* Row 1: Name & Category */}
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <div>
                <label className="block text-sm font-medium">رقم التقرير</label>
                <Field
                  type="text"
                  name="reportId"
                  className="mt-1 block w-full bg-[#F7F8F9] p-2 rounded-lg border border-[#999999]"
                />
                <ErrorMessage
                  name="reportId"
                  component="div"
                  className="text-red-500 text-sm"
                />
                </div>
                <div>
                <label className="block text-sm font-medium">اسم التقرير</label>
                <Field
                  type="text"
                  name="reportName"
                  className="mt-1 block w-full bg-[#F7F8F9] p-2 rounded-lg border border-[#999999]"
                />
                <ErrorMessage
                  name="reportName"
                  component="div"
                  className="text-red-500 text-sm"
                />
                </div>
                <div>
                <label className="block text-sm font-medium">تصنيف التقرير</label>
                <Field
                  type="text"
                  name="reportCategory"
                  className="mt-1 block w-full bg-[#F7F8F9] p-2 rounded-lg border border-[#999999]"
                />
                <ErrorMessage
                  name="reportCategory"
                  component="div"
                  className="text-red-500 text-sm"
                />
                </div>
                
            </div>

            {/* Row 2: Source & Year */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
  <div className="col-span-1">
    <label className="block text-sm font-medium">مصدر التقرير</label>
    <Field
      type="text"
      name="reportSource"
      className="mt-1 block w-full bg-[#F7F8F9] p-2 rounded-lg border border-[#999999]"
    />
    <ErrorMessage name="reportSource" component="div" className="text-red-500 text-sm" />
  </div>

  <div className="col-span-1">
    <label htmlFor="reportYear" className="block font-medium">سنة التقرير</label>
    <DatePicker
      selected={values.reportYear ? new Date(values.reportYear, 0) : null}
      onChange={(date) => setFieldValue("reportYear", date ? date.getFullYear() : null)}
      showYearPicker
      dateFormat="yyyy"
      className="w-full bg-[#F7F8F9] p-2 rounded-lg border border-[#999999]"
    />
    <ErrorMessage name="reportYear" component="div" className="text-red-500 text-sm" />
  </div>
</div>

            {/* Summary */}
            <div >
              <label className="block text-sm font-medium">نبذه عن التقرير</label>
              <Field
                as="textarea"
                name="reportSummary"
                className="mt-1 block w-full bg-[#F7F8F9] p-2 rounded-lg border border-[#999999]"
              />
              <ErrorMessage
                name="reportSummary"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Report Link */}
            <div>
              <label className="block text-sm font-medium">رابط التقرير الأساسي</label>
              <Field
                type="text"
                name="reportLink"
                className="mt-1 block w-full bg-[#F7F8F9] p-2 rounded-lg border border-[#999999]"
                placeholder="ادخل الرابط ..."
              />
              <ErrorMessage
                name="reportLink"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* PDF Upload */}
            <div>
              <label className="block text-sm font-medium">رفع الملفات</label>
              <input
                type="file"
                accept=".pdf"
                id="file-upload"
                title="رفع الملفات"
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
                <span className="ml-2 text-gray-700">رفع ملف PDF</span>
              </label>
              {fileName && (
                <p className="mt-2 text-sm text-gray-600">الملف المحدد: {fileName}</p>
              )}
              <ErrorMessage name="reportPdf" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Submit Button */}
            <div className="flex col-span- items-center md:justify-end pb-3 sm:pb-4 justify-center gap-2">
              <button
                onClick={() => navigate(-1)}
                type="submit"
                className="text-black text-sm flex items-center gap-1 rounded-lg py-3 px-6 hover:bg-green-50 bg-[#EAF7E8] transition-colors"
                title="الغاء"
              >
                <span className='sm:inline pe-2'>الغاء</span>
              </button>
              <button
                className="text-white  text-sm flex items-center gap-1 rounded-lg py-3 px-3 hover:bg-green-600 bg-main_color transition-colors"
                title="اضافة التقرير"
              >
                <img src={plus2} alt='plus2' className="w-4 h-4" />
                <span className=' sm:inline pe-2'>تعديل التقرير</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateReport;
