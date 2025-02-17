import { useFormik } from "formik";
import * as YUP from 'yup';
import logo from '../../assets/Images/Vectorw.png';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../Store/store";
import { handleRegister } from "../../Store/user.slice";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const validationSchema = YUP.object({
        username: YUP.string().required("الاسم مطلوب"),
        email: YUP.string().email("الرجاء ادخال بريد الكتروني صحيح").required(" البريد الالكتروني مطلوب"),
        password: YUP.string().min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل").required("كلمة المرور مطلوبة"),
        confirmPassword: YUP.string()
            .oneOf([YUP.ref('password'), ''], "يجب أن تتطابق كلمة المرور")
            .required("تأكيد كلمة المرور مطلوب")
    });

    const registerForm = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const data = await dispatch(handleRegister(values));
            if (data.payload.success) {
                toast.success('تم انشاء الحساب بنجاح، الرجاء التوجه للبريد الإلكتروني للتأكيد');
            }else{
                toast.error(data.payload.message);
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
                    <h6 className="text-xl font-semibold text-center">تسجيل جديد</h6>

                    <div className="mb-3">
                        <label htmlFor="username" className="block text-gray-700">الاسم</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            id="username"
                            name="username"
                            onChange={registerForm.handleChange}
                            onBlur={registerForm.handleBlur}
                            value={registerForm.values.username}
                        />
                        {registerForm.touched.username && registerForm.errors.username && (
                            <div className="text-red-600 text-sm mt-1">{registerForm.errors.username}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="block text-gray-700">البريد الإلكتروني</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            id="email"
                            name="email"
                            onChange={registerForm.handleChange}
                            onBlur={registerForm.handleBlur}
                            value={registerForm.values.email}
                        />
                        {registerForm.touched.email && registerForm.errors.email && (
                            <div className="text-red-600 text-sm mt-1">{registerForm.errors.email}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="block text-gray-700">كلمة المرور</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full p-2  border border-gray-300 rounded-md"
                                id="password"
                                name="password"
                                onChange={registerForm.handleChange}
                                onBlur={registerForm.handleBlur}
                                value={registerForm.values.password}
                            />
                            <span
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 left-3 flex items-center cursor-pointer text-gray-600"
                            >
                                {showPassword ?

                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    :
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeWidth={2} d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                        <path stroke="currentColor" strokeWidth={2} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                }
                            </span>

                        </div>
                        {registerForm.touched.password && registerForm.errors.password && (
                            <div className="text-red-600 text-sm mt-1">{registerForm.errors.password}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="block text-gray-700">تأكيد كلمة المرور</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="w-full p-2  border border-gray-300 rounded-md"
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={registerForm.handleChange}
                                onBlur={registerForm.handleBlur}
                                value={registerForm.values.confirmPassword}
                            />
                            <span
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute inset-y-0 left-3 flex items-center cursor-pointer text-gray-600"
                            >
                                {showConfirmPassword ?

                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    :
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeWidth={2} d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                        <path stroke="currentColor" strokeWidth={2} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                }
                            </span>

                        </div>
                        {registerForm.touched.confirmPassword && registerForm.errors.confirmPassword && (
                            <div className="text-red-600 text-sm mt-1">{registerForm.errors.confirmPassword}</div>
                        )}
                    </div>

                    <form onSubmit={registerForm.handleSubmit}>
                        {loading ? (
                            <button type="button" className="w-full p-2 bg-gray-500 text-white rounded-md" disabled>
                                <i className="fa-solid fa-spinner fa-spin"></i> Loading ...
                            </button>
                        ) : (
                            <button
                                disabled={!(registerForm.isValid && registerForm.dirty)}
                                type="submit"
                                className="w-full p-2 bg-main_color text-white rounded-md hover:opacity-80"
                            >
                                إنشاء حساب
                            </button>
                        )}
                    </form>

                    <div className="text-center mt-3">
                        <p>
                            لديك حساب بالفعل؟
                            <span
                                onClick={() => navigate("/login")}
                                className="text-main_color cursor-pointer hover:underline"
                            >
                                تسجيل الدخول
                            </span>
                        </p>
                    </div>
                </div>

                <div className="hidden md:block md:w-2/3 bg-main_color p-6">
                    <div className="flex justify-center items-center h-full">
                        <img src={logo} alt="logo" />
                    </div>
                </div>
            </div>
        </div>
    );
}
