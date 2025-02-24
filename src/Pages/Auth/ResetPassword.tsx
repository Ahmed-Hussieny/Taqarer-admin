import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as YUP from "yup";
import { useFormik } from "formik";
import logo from '../../assets/Images/Vectorw.png'
import toast, { Toaster } from "react-hot-toast";
import { HandelResetPassword, HandelVerifyResetCode } from "../../Store/user.slice";
import { useAppDispatch } from "../../Store/store";
const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { token } = useParams();
    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setLoading(false);
                toast.error("رمز غير صالح أو مفقود");
                navigate('/forgot-password');
                return;
            }
            setLoading(true);
            const data = await dispatch(HandelVerifyResetCode({ token }));
            if (data.payload.success) {
                toast.success('تم التحقق من الرمز بنجاح');
            } else {
                toast.error(data.payload.message);
                navigate('/forgot-password');
            }
            setLoading(false);
        };
        verifyToken();
    }, [token, dispatch, navigate]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const validationSchema = YUP.object({
        newPassword: YUP.string().min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل").required("كلمة المرور مطلوبة"),
        confirmPassword: YUP.string()
            .oneOf([YUP.ref('newPassword'), ''], "يجب أن تتطابق كلمة المرور")
            .required("تأكيد كلمة المرور مطلوب")
    });
    const resetPasswordForm = useFormik({
        initialValues: {
            token,
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const data = await dispatch(HandelResetPassword({ token: values.token as string, newPassword: values.newPassword }));
            if (data.payload.success) {
                toast.success(' تم تغيير كلمة المرور بنجاح');
            }else{
                toast.error(data.payload.message);
                navigate('/forgot-password');
            }
            setLoading(false);

        }

    }); if (!token) {
        return <p>Invalid or missing token.</p>;
    }

    return (
        <div className="m-0 p-0 " dir="rtl">
            <Toaster
                reverseOrder={false}
                position="top-left"
            />
            <div className="flex flex-wrap m-0 p-0 h-screen ">
                <div className="w-full md:w-1/3 p-8 flex flex-col justify-center">
                    <h6 className="text-xl font-semibold text-center">
                        إعادة تعيين كلمة المرور
                    </h6>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="block text-gray-700">كلمة المرور</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full p-2  border border-gray-300 rounded-md"
                                id="newPassword"
                                name="newPassword"
                                onChange={resetPasswordForm.handleChange}
                                onBlur={resetPasswordForm.handleBlur}
                                value={resetPasswordForm.values.newPassword}
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
                        {resetPasswordForm.touched.newPassword && resetPasswordForm.errors.newPassword && (
                            <div className="text-red-600 text-sm mt-1">{resetPasswordForm.errors.newPassword}</div>
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
                                onChange={resetPasswordForm.handleChange}
                                onBlur={resetPasswordForm.handleBlur}
                                value={resetPasswordForm.values.confirmPassword}
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
                        {resetPasswordForm.touched.confirmPassword && resetPasswordForm.errors.confirmPassword && (
                            <div className="text-red-600 text-sm mt-1">{resetPasswordForm.errors.confirmPassword}</div>
                        )}
                    </div>

                    <form onSubmit={resetPasswordForm.handleSubmit}>
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
                                disabled={!(resetPasswordForm.isValid && resetPasswordForm.dirty)}
                                type="submit"
                                className="w-full p-2 bg-main_color text-white rounded-md hover:opacity-80"
                            >
                                إعادة تعيين كلمة المرور
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
};

export default ResetPassword;
