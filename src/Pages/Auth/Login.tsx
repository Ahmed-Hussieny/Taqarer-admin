import { useFormik } from "formik"
import * as YUP from 'yup';
import logo from '../../assets/Images/Vectorw.png'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../Store/store";
import { handleLogin } from "../../Store/user.slice";
import toast, { Toaster } from 'react-hot-toast'

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validationSchema = YUP.object({
        email: YUP.string().email("الرجاء ادخال بريد الكتروني صحيح").required(" البريد الالكتروني مطلوب"),
        password: YUP.string().required("كلمة المرور مطلوبة")
    });
    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const data = await dispatch(handleLogin(values));
            console.log(data.payload);
            if (data.payload.success) {
                localStorage.setItem('userToken', data.payload.userToken);
                toast.success('تم تسجيل الدخول بنجاح');
                setTimeout(() => {
                    navigate('/');
                }, 1000);
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
                    <h6 className="text-xl font-semibold text-center">تسجيل الدخول</h6>
                    

                    <div className="mb-3" >
                        <label htmlFor="email" className="block text-gray-700">
                        البريد الالكتروني   
                        </label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            id="email"
                            name="email"
                            onChange={loginForm.handleChange}
                            onBlur={loginForm.handleBlur}
                            value={loginForm.values.email}
                        />
                        {loginForm.touched.email && loginForm.errors.email && (
                            <div className="text-red-600 text-sm mt-1">
                                {loginForm.errors.email}
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="block text-gray-700">
                            كلمة المرور
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full p-2  border border-gray-300 rounded-md"
                                id="password"
                                name="password"
                                onChange={loginForm.handleChange}
                                onBlur={loginForm.handleBlur}
                                value={loginForm.values.password}
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
                        {loginForm.touched.password && loginForm.errors.password && (
                            <div className="text-red-600 text-sm mt-1">
                                {loginForm.errors.password}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center mb-3">
                        <Link to="/forgot-password" className="text-blue-600 hover:underline">
                            نسيت كلمة المرور؟
                        </Link>
                    </div>

                    <form onSubmit={loginForm.handleSubmit}>
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
                                disabled={!(loginForm.isValid && loginForm.dirty)}
                                type="submit"
                                className="w-full p-2 bg-main_color text-white rounded-md hover:opacity-80"
                            >
                                تسجيل الدخول
                            </button>
                        )}
                    </form>

                    <div className="text-center mt-3">
                        <p>
                            ليس لديك حساب؟
                            <span
                                onClick={() => navigate("/Register")}
                                className="text-main_color cursor-pointer hover:underline"
                            >
                                تسجيل جديد
                            </span>
                        </p>
                    </div>
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
