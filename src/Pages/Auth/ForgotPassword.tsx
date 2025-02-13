import { useFormik } from "formik"
import * as YUP from 'yup';
import logo from '../../assets/Images/Vectorw.png'
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../Store/store";
import { HandelForgotPassword } from "../../Store/user.slice";
import toast, { Toaster } from 'react-hot-toast'

export default function ForgotPassword() {

    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const validationSchema = YUP.object({
        email: YUP.string().email("الرجاء ادخال بريد الكتروني صحيح").required(" البريد الالكتروني مطلوب"),
    });
    const forgotPasswordForm = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const data = await dispatch(HandelForgotPassword(values.email));
            console.log(data.payload);
            if (data.payload.success) {
                toast.success('تم ارسال رابط استعادة كلمة المرور الى بريدك الالكتروني');
            }
            setLoading(false);
        }

    });

    return (
        <div className="m-0 p-0 " dir="rtl">
            <Toaster
                position="top-left"
                reverseOrder={false}
            />
            <div className="flex flex-wrap m-0 p-0 h-screen ">
                <div className="w-full md:w-1/3 p-8 flex flex-col justify-center">
                    <h6 className="text-xl font-semibold text-center"> 
                        نسيت كلمة المرور
                    </h6>
                    <div className="mb-3" >
                        <label htmlFor="email" className="block text-gray-700">
                            البريد الالكتروني
                        </label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            id="email"
                            name="email"
                            onChange={forgotPasswordForm.handleChange}
                            onBlur={forgotPasswordForm.handleBlur}
                            value={forgotPasswordForm.values.email}
                        />
                        {forgotPasswordForm.touched.email && forgotPasswordForm.errors.email && (
                            <div className="text-red-600 text-sm mt-1">
                                {forgotPasswordForm.errors.email}
                            </div>
                        )}
                    </div>

                    <form onSubmit={forgotPasswordForm.handleSubmit}>
                        {loading ? (
                            <button
                                type="button"
                                className="w-full p-2 bg-gray-500 text-white rounded-md"
                                disabled
                                title="Loading"
                            >
                                <i className="fa-solid fa-spinner fa-spin"></i>
                                Loading ...
                            </button>
                        ) : (
                            <button
                                disabled={!(forgotPasswordForm.isValid && forgotPasswordForm.dirty)}
                                type="submit"
                                className="w-full p-2 bg-main_color text-white rounded-md hover:opacity-80"
                            >
                                تسجيل الدخول
                            </button>
                        )}
                    </form>
                </div>

                <div className="hidden md:block md:w-2/3 bg-main_color p-6">

                    <div className=" flex justify-center items-center h-full">
                        <img src={logo} alt="logo" />
                    </div>
                </div>
            </div>
        </div>
    );
}
