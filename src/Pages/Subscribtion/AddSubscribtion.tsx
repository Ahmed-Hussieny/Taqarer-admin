import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import deleteIcon from '../../assets/Icons/DashBoard/trash.svg'
import { useAppDispatch } from '../../Store/store';
import { handleAddPackage } from '../../Store/pakage.slice';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// Initial values for the form
const initialValues = {
  name: '',
  price: 0,
  duration: 0,
  description: '',
  features: [''],
  maxNumberOfReports: 0,
};

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('حقل الاسم مطلوب'),
  price: Yup.number()
    .required('حقل السعر مطلوب')
    .positive('يجب أن يكون السعر رقمًا موجبًا'),
  duration: Yup.number()
    .required('حقل المدة مطلوب')
    .positive('يجب أن تكون المدة رقمًا موجبًا'),
  description: Yup.string().required('حقل الوصف مطلوب'),
  features: Yup.array()
    .of(Yup.string().required('حقل الميزة مطلوب'))
    .min(1, 'يجب إضافة ميزة واحدة على الأقل'),
  maxNumberOfReports: Yup.number()
    .required('حقل الحد الأقصى للتقارير مطلوب')
    .positive('يجب أن يكون الحد الأقصى للتقارير رقمًا موجبًا'),
});

const AddSubscribtion: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
  const handleSubmit = async (values: typeof initialValues) => {
    const data =  await dispatch(handleAddPackage(values));
    if(data.payload.success){
        toast.success('تمت العملية بنجاح');
        navigate(-1);
    }else{
        toast.error(data.payload.message);
    }
  };

  return (
    <div className="p-4 rtl" dir="rtl">
        <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <h1 className="text-2xl font-bold mb-4">إضافة خطة جديدة</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                الاسم
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Price Field */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                السعر
              </label>
              <Field
                type="number"
                id="price"
                name="price"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Duration Field */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                المدة (بالأيام)
              </label>
              <Field
                type="number"
                id="duration"
                name="duration"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="duration" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                الوصف
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Features Field */}
            <div>
              <label htmlFor="features" className="block text-sm font-medium text-gray-700">
                الميزات
              </label>
              <FieldArray name="features">
                {({ push, remove }) => (
                  <div>
                    {values.features.map((_, index) => (
                      <div key={index} className="flex gap-1 space-x-2 mt-2">
                        <Field
                          type="text"
                          name={`features[${index}]`}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="inline-flex items-center ms-2 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <img src={deleteIcon} alt="delete" className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push('')}
                      className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-main_color hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      إضافة ميزة
                    </button>
                  </div>
                )}
              </FieldArray>
              <ErrorMessage name="features" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Max Number of Reports Field */}
            <div>
              <label htmlFor="maxNumberOfReports" className="block text-sm font-medium text-gray-700">
                الحد الأقصى للتقارير
              </label>
              <Field
                type="number"
                id="maxNumberOfReports"
                name="maxNumberOfReports"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="maxNumberOfReports" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-main_color hover:opacity-90 w-full focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              إرسال
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSubscribtion;