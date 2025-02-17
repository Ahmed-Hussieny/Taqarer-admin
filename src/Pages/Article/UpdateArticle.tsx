import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { useAppDispatch } from '../../Store/store';
import { changeActiveNav, changeCurrentPath } from '../../Store/user.slice';
import img1 from '../../assets/Images/Article/MainArticle.png';
import plus2 from '../../assets/Icons/DashBoard/plus2.svg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { handleGetArticle, handleUpdateArticle } from '../../Store/article.slice';
import toast from 'react-hot-toast';

const UpdateArticle: React.FC = () => {
  const { articleId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const validationSchema = yup.object({
    image: yup.mixed(),
    title: yup.string().required('العنوان مطلوب'),
    description: yup.string().required('الوصف مطلوب'),
    content: yup.string().required('محتوى المقال مطلوب')
  });
  

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }, { font: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      [{ align: [] }, { direction: 'rtl' }],
      [{ color: [] }, { background: [] }],
      ['clean']
    ],
  };


  const [articleData, setArticleData] = useState<{ image?: string; title: string; description: string; content: string } | null>(null);

  const fetchArticle = async () => {
    if (articleId) {
      const response = await dispatch(handleGetArticle(articleId));
      const article = response.payload.article;
      if (article) {
        setArticleData({
          image: article.image, 
          title: article.title,
          description: article.description,
          content: article.content
        });
        setPreviewImage(article.image);
      }
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchArticle();
    dispatch(changeCurrentPath('رفع المقالات'));
    dispatch(changeActiveNav(3));
  }, []);

  const handleSubmit = async (values: { image: File | null | ""; title: string; description: string; content: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('content', values.content);
    if (values.image) {
      formData.append('image', values.image);
    }

    try {
      const data = await dispatch(handleUpdateArticle({
        id: articleId!,
        apiData: formData
      }));
      if (data.payload.success) {
        toast.success('تمت اضافة المقالة بنجاح');
        navigate(-1);
      } else {
        toast.error('فشلت عملية اضافة المقالة');
      }
      // 
    } catch (error) {
      console.error('Submission error:', error);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        image:  '',
        title: articleData?.title || '',
        description: articleData?.description || '',
        content: articleData?.content || ''
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >

      {({ setFieldValue, isSubmitting, values }) => (
        <Form>
          <p className="text-xl font-medium mb-2 text-black whitespace-nowrap">اضافة مقالة</p>
          <p className="text-lg font-bold mb-2 text-main_color whitespace-nowrap">ادخل بيانات المقالة</p>

          <div className='bg-[#F7F8F9] p-2 items-center py-5 rounded-xl border mb-2 gap-3 grid md:grid-cols-5 grid-cols-1'>
            <div className='col-span-1 px-3'>
              <img
                src={previewImage || img1}
                alt="Article"
                className="h-28 w-32  object-cover rounded-lg"
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

          <p className="text-lg my-2 font-bold whitespace-nowrap">عنوان المقالة</p>
          <Field
            type="text"
            name="title"
            className='w-full mb-1 border bg-[#F7F8F9] p-2 rounded-lg'
            placeholder="عنوان المقالة"
          />
          <ErrorMessage name="title" component="div" className="text-red-500 text-sm mb-2" />

          <p className="text-lg my-2 font-bold whitespace-nowrap">وصف المقالة</p>
          <Field
            type="text"
            name="description"
            className='w-full mb-1 border bg-[#F7F8F9] p-2 rounded-lg'
            placeholder="وصف المقالة"
          />
          <ErrorMessage name="description" component="div" className="text-red-500 text-sm mb-2" />

          <p><span className="text-lg my-2 font-bold whitespace-nowrap">(المقال)</span> (ادخل محتوى المقال)</p>
          <ReactQuill
            value={values.content}
            onChange={(value) => setFieldValue('content', value)}
            modules={modules}
            style={{
              direction: 'rtl',
              textAlign: 'center',
            }}
            className="mb-1"
          />
          <ErrorMessage name="content" component="div" className="text-red-500 text-sm mb-3" />

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
              <span className='sm:inline'>تعديل</span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateArticle;