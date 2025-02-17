
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { useAppDispatch } from '../../Store/store';
import { changeActiveNav, changeCurrentPath } from '../../Store/user.slice';
import img1 from '../../assets/Images/Article/MainArticle.png';
import plus2 from '../../assets/Icons/DashBoard/plus2.svg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { handleAddGovernmental } from '../../Store/governmental.slice';

const ArticleEditor: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const validationSchema = yup.object({
    image: yup.mixed()
      .required('الصورة مطلوبة')
      .test('fileType', 'يجب أن تكون الصورة من نوع jpg, jpeg, png, أو gif', value => {
        if (value) {
          return ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].includes((value as File).type);
        }
        return true;
      }),
    name: yup.string().required('العنوان مطلوب'),
    description: yup.string().required('الوصف مطلوب'),
    link: yup.string().url('الرابط غير صحيح'),
    classification: yup.string().required('محتوى المقال مطلوب')
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(changeCurrentPath('رفع الجهات'));
    dispatch(changeActiveNav(4));
  }, []);

  const handleSubmit = async (values: { image: File | null; name: string; link: string; description: string; classification: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('classification', values.classification);
    formData.append('link', values.link);
    if (values.image) {
      formData.append('image', values.image);
    }

    try {
      const data = await dispatch(handleAddGovernmental(formData));
      if(data.payload.success) {
        toast.success('تمت اضافة الجهة بنجاح');
        navigate(-1);
      }else{
        toast.error('فشلت عملية اضافة الجهة');
      }
      // 
    } catch (error) {
      console.error('Submission error:', error);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        image: null as File | null,
        name: '',
        description: '',
        classification: '',
        link: ''
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form>
          <p className="text-lg font-bold mb-2 text-main_color whitespace-nowrap">ادخل بيانات الجهة</p>

          <div className='bg-[#F7F8F9] p-2 items-center py-5 rounded-xl border mb-2 gap-3 grid md:grid-cols-5 grid-cols-1'>
            <div className='col-span-1 px-3'>
              <img 
                src={previewImage || img1} 
                alt="Article" 
                className="h-24 w-24  object-cover rounded-lg"
              />
            </div>
            <div className='col-span-4'>
              <div className='flex'>
                <label className='bg-main_color text-white hover:opacity-90 border px-4 py-2 rounded-lg cursor-pointer'>
                  تحميل صورة جديدة
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0];
                      if (file) {
                        setFieldValue('image', file);
                        setPreviewImage(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
                <button 
                  type="button"
                  className='bg-[#EAF7E8] ms-2 text-main_color hover:opacity-90  border px-4 py-2 rounded-lg'
                  onClick={() => {
                    setFieldValue('image', null);
                    setPreviewImage(null);
                  }}
                >
                  اعادة الضبط
                </button>
              </div>
              <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
              <p className="text-sm mt-2 text-slate-400 whitespace-nowrap">
                مسموح ب jbg او gif او png الحجم الاقصى 800 كيلوبايت
              </p>
            </div>
          </div>

          <p className="text-lg my-2 font-bold whitespace-nowrap">اسم الجهة</p>
          <Field
            type="text"
            name="name"
            className='w-full mb-1 border bg-[#F7F8F9] p-2 rounded-lg'
            placeholder="عنوان الجهة"
          />
          <ErrorMessage name="name" component="div" className="text-red-500 text-sm mb-2" />


          <p className="text-lg my-2 font-bold whitespace-nowrap">رابط الجهة</p>
          <Field
            type="text"
            name="link"
            className='w-full mb-1 border bg-[#F7F8F9] p-2 rounded-lg'
            placeholder="رابط الجهة"
          />
          <ErrorMessage name="link" component="div" className="text-red-500 text-sm mb-2" />

          <p className="text-lg my-2 font-bold whitespace-nowrap">تصنيف الجهة</p>
          <Field
            type="text"
            name="classification"
            className='w-full mb-1 border bg-[#F7F8F9] p-2 rounded-lg'
            placeholder="تصنيف الجهة"
          />
          <ErrorMessage name="classification" component="div" className="text-red-500 text-sm mb-2" />

          <p className="text-lg my-2 font-bold whitespace-nowrap">وصف الجهة</p>
          <Field
            type="text"
            name="description"
            className='w-full mb-1 border bg-[#F7F8F9] p-2 rounded-lg'
            placeholder="وصف الجهة"
          />
          <ErrorMessage name="description" component="div" className="text-red-500 text-sm mb-2" />
          <div className="flex items-center md:justify-end pb-3 sm:pb-4 justify-center gap-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-black text-sm flex items-center gap-1 rounded-lg py-3 px-10 hover:bg-green-50 bg-[#EAF7E8] transition-colors"
            >
              <span className='sm:inline pe-2'>الغاء</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white px-16 text-sm flex items-center gap-1 rounded-lg py-3 hover:bg-green-600 bg-[#3D9635] transition-colors"
            >
              <img src={plus2} alt='plus2' className="w-4 h-4" />
              <span className='sm:inline'>اضافة</span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ArticleEditor;