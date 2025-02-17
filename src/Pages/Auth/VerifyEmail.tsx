import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Store/store';
import { HandelresendVerificationEmail, HandelVerifyEmail } from '../../Store/user.slice';
import logo from "../../assets/Images/Vector.png";
import success from "../../assets/Icons/Check_ring_duotone.svg";
import fail from "../../assets/Icons/Dell_duotone.svg";
import toast, { Toaster } from 'react-hot-toast';

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);
    const [verify, setVerify] = useState<boolean | null>(null);

    const verifyEmail = async () => {
        if (!token) {
            toast.error("Invalid or missing token.");
            return;
        }

        setLoading(true);
        try {
            const data = await dispatch(HandelVerifyEmail(token));
            if (data.payload.success) {
                setVerify(true);
                toast.success("Email verified successfully.");
                return navigate('/login');
            } else {
                setVerify(false);
                toast.error("Verification failed.");
            }
        } catch (error) {
            console.error("Error during verification:", error);
            toast.error("Something went wrong. Please try again.");
            setVerify(false);
        } finally {
            setLoading(false);
        }
    };

    const resendEmail = async () => {

        try {
            if (token) {
                const data = await dispatch(HandelresendVerificationEmail(token));
                if (data.payload.success) {
                    setVerify(true);
                    toast.success(data.payload.message);
                } else {
                    if (data.payload.message === "User is already verified") {
                        setVerify(true);
                        toast.success("User is already verified");
                        return navigate('/login');
                    }
                    toast.error(data.payload.message);
                }
            }

        } catch (error) {
            console.error("Error during resending verification email:", error);
            toast.error("Failed to send verification email.");
        }
    };

    useEffect(() => {
        verifyEmail();
    }, [token]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Toaster
                position="top-left"
                reverseOrder={false}
            />
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <div className="flex justify-center mb-6">
                    <img className="w-1/2" src={logo} alt="logo" />
                </div>

                {loading ? (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500 mx-auto"></div>
                        <p className="mt-4">Verifying...</p>
                    </div>
                ) : (
                    <>
                        {verify === null ? (
                            <div className="text-center">
                                <p className="text-gray-600">Verifying your email...</p>
                            </div>
                        ) : verify ? (
                            <div className="text-center">
                                <img className="w-1/2 mx-auto mb-4" src={success} alt="Success" />
                                <h3 className="text-green-600 text-xl font-semibold">Email Verified!</h3>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg transition hover:bg-blue-600"
                                >
                                    Go to Login
                                </button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <img className="w-1/2 mx-auto mb-4" src={fail} alt="Failure" />
                                <h3 className="text-red-600 text-xl font-semibold">Verification Failed</h3>
                                <p className="text-gray-600 mt-4">The verification link may have expired or is invalid.</p>
                                <button
                                    onClick={resendEmail}
                                    className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg transition hover:bg-blue-600"
                                >
                                    Resend Activation Email
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
