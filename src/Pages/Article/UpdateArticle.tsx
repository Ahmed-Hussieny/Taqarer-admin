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
import { ClipLoader } from 'react-spinners';

const UpdateArticle: React.FC = () => {
  const { articleId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [articleData, setArticleData] = useState<{ image?: string; title: string; description: string; content: string } | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>(''); // State to store fetched HTML content

  // Validation schema
  const validationSchema = yup.object({
    image: yup.mixed(),
    title: yup.string().required('العنوان مطلوب'),
    description: yup.string().required('الوصف مطلوب'),
    content: yup.string().required('محتوى المقال مطلوب')
  });

  // ReactQuill modules
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

  // Fetch article data and HTML content
  const fetchArticle = async () => {
    if (articleId) {
      const response = await dispatch(handleGetArticle(articleId));
      const article = response.payload.article;
      if (article) {
        setArticleData({
          image: article.image,
          title: article.title,
          description: article.description,
          content: article.content // This is the file URL
        });
        setPreviewImage(article.image || null);

        // Fetch HTML content from the file URL
        if (article.content) {
          try {
            const response = await fetch(article.content);
            const content = await response.text();
            setHtmlContent(content); // Set the fetched HTML content
          } catch (error) {
            console.error('Error fetching HTML content:', error);
            toast.error('فشل في تحميل محتوى المقال');
          }
        }
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchArticle();
    dispatch(changeCurrentPath('تعديل المقالة'));
    dispatch(changeActiveNav(3));
  }, []);

  // Handle form submission
  const handleSubmit = async (values: { image: File | null | ""; title: string; description: string; content: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);

    // Create a file from the updated content
    const contentFile = new File([values.content], 'content.txt', { type: 'text/plain' });
    formData.append('contentFile', contentFile); // Append the file with key `contentFile`

    // Append image only if it's a new file
    if (values.image instanceof File) {
      formData.append('image', values.image);
    }

    try {
      const data = await dispatch(handleUpdateArticle({
        id: articleId!,
        apiData: formData
      }));
      console.log('Form values:', data);
      if (data.payload.success) {
        toast.success('تم تعديل المقالة بنجاح');
        navigate(-1);
      } else {
        toast.error('فشلت عملية تعديل المقالة');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('حدث خطأ أثناء تعديل المقالة');
    }

    
    setSubmitting(false);
  };

  return (
    <Formik
      enableReinitialize // Reinitialize form when articleData changes
      initialValues={{
        image: '',
        title: articleData?.title || '',
        description: articleData?.description || '',
        content: htmlContent || '' // Use fetched HTML content as initial value
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting, values }) => (
        <Form>
          <p className="text-xl font-medium mb-2 text-black whitespace-nowrap">تعديل مقالة</p>
          <p className="text-lg font-bold mb-2 text-main_color whitespace-nowrap">ادخل بيانات المقالة</p>

          {/* Image Upload Section */}
          <div className='bg-[#F7F8F9] p-2 items-center py-5 rounded-xl border mb-2 gap-3 grid md:grid-cols-5 grid-cols-1'>
            <div className='col-span-1 px-3'>
              <img
                src={previewImage || img1}
                alt="Article"
                className="h-28 w-32 object-cover rounded-lg"
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
                  className='bg-[#EAF7E8] ms-2 text-main_color hover:opacity-90 border px-4 py-2 rounded-lg'
                  onClick={() => {
                    setFieldValue('image', null);
                    setPreviewImage(articleData?.image || null); // Reset to original image
                  }}
                >
                  اعادة الضبط
                </button>
              </div>
              <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
              <p className="text-sm mt-2 text-slate-400 whitespace-nowrap">
                مسموح ب jpg أو gif أو png. الحجم الأقصى 800 كيلوبايت
              </p>
            </div>
          </div>

          {/* Title Field */}
          <p className="text-lg my-2 font-bold whitespace-nowrap">عنوان المقالة</p>
          <Field
            type="text"
            name="title"
            className='w-full mb-1 border bg-[#F7F8F9] p-2 rounded-lg'
            placeholder="عنوان المقالة"
          />
          <ErrorMessage name="title" component="div" className="text-red-500 text-sm mb-2" />

          {/* Description Field */}
          <p className="text-lg my-2 font-bold whitespace-nowrap">وصف المقالة</p>
          <Field
            type="text"
            name="description"
            className='w-full mb-1 border bg-[#F7F8F9] p-2 rounded-lg'
            placeholder="وصف المقالة"
          />
          <ErrorMessage name="description" component="div" className="text-red-500 text-sm mb-2" />

          {/* Content Field */}
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

          {/* Buttons */}
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
              {isSubmitting ? (
                <ClipLoader color="#ffffff" size={20} /> // Show spinner when submitting
              ) : (
              <>
              <img src={plus2} alt='plus2' className="w-4 h-4" />
              <span className='sm:inline'>تعديل</span></>
)}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateArticle;