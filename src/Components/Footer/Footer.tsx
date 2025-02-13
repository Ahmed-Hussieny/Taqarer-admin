
import { Footer, FooterCopyright, FooterLinkGroup } from "flowbite-react";
import logo from '../../assets/Images/Vectorw.png';
import undeline from '../../assets/Icons/Rectangle 46.png';
import linkIcon from '../../assets/Icons/link-2.png';
import icon1 from '../../assets/Icons/Layer_1.png';
import icon2 from '../../assets/Icons/info-circle.png';
import icon3 from '../../assets/Icons/grammerly.png';
import icon4 from '../../assets/Icons/alarm.png';
import smsicon from '../../assets/Icons/sms-tracking.png';
import { useNavigate } from "react-router-dom";
export function FooterC() {
    const navigate = useNavigate();
    return (
        <Footer className=" text-white rounded-none">
            
            <div className="w-full bg-black">
            <div className="h-2 w-full bg-secondary_color"></div>
                <div className="grid container m-auto grid-cols-1 gap-8 px-6 py-8 md:grid-cols-4">
                    <div>
                        <img src={logo} alt="logo" />
                        <p className="mt-4 px-2 text-sm">منصة تقارير هي وجهتك الأولى للحصول على التقارير والدراسات الموثوقة من مصادر معتمدة.</p>
                    </div>
                    <div>
                        <div>
                            <p className="text-gray-500 font-medium">اتجاهات التقارير</p>
                            <img src={undeline} alt="undeline" className=" me-auto" />
                        </div>
                        <FooterLinkGroup col className="grid md:grid-cols-1 grid-cols-2 gap-4 ">
                            <div className='flex mt-6 items-center cursor-pointer'  onClick={()=>navigate('/Governmental')}>
                                <img className="w-4 h-4 me-1" src={linkIcon} alt="linkIcon" />
                                <span className="text-[#EAF7E8]"> الجهات الحكومية</span>
                            </div>
                            <div className='flex mt-6 items-center cursor-pointer' onClick={()=>navigate('/AboutUs')}>
                                <img className="w-4 h-4 me-1" src={linkIcon} alt="linkIcon" />
                                <span className="text-[#EAF7E8]"> من نحن</span>
                            </div>
                            <div className='flex mt-6 items-center cursor-pointer' onClick={()=>navigate('/Articles')}>
                                <img className="w-4 h-4 me-1" src={linkIcon} alt="linkIcon" />
                                <span className="text-[#EAF7E8]"> المقالات</span>
                            </div>
                        </FooterLinkGroup>
                    </div>
                    <div>
                        <div>
                            <p className="text-gray-500 font-medium"> مركز الدعم</p>
                            <img src={undeline} alt="undeline" className=" me-auto" />
                        </div>
                        <FooterLinkGroup col className="grid md:grid-cols-1 grid-cols-2 gap-4">
                            <div className='flex mt-6 items-center cursor-pointer' onClick={()=>navigate('/Faqs')}>
                                <img className="w-4 h-4 me-2" src={icon1} alt="icon1" />
                                <span className="text-[#EAF7E8]"> الأسئلة الشائعة (FAQ)</span>
                            </div>
                            <div className='flex mt-6 items-center cursor-pointer'>
                                <img className="w-4 h-4 me-2" src={icon2} alt="icon2" />
                                <span className="text-[#EAF7E8]">سياية الخصوصية</span>
                            </div>
                            <div className='flex mt-6 items-center cursor-pointer'>
                                <img className="w-4 h-4 me-2" src={icon3} alt="icon3" />
                                <span className="text-[#EAF7E8]"> الشروط و الاحكام</span>
                            </div>
                            <div className='flex mt-6 items-center cursor-pointer'>
                                <img className="w-4 h-4 me-2" src={icon4} alt="icon4" />
                                <span className="text-[#EAF7E8]"> تواصل معنا</span>
                            </div>
                        </FooterLinkGroup>
                    </div>
                    <div>
                        <div>
                            <p className="text-gray-500 font-medium">تواصل معنا</p>
                            <img src={undeline} alt="undeline" className=" me-auto" />
                        </div>
                        <FooterLinkGroup col dir="ltr">
                            <div className='mt-6 items-center'>
                                <p className="text-[#EAF7E8]">TAGARER LTD</p>
                                <p className="text-[#EAF7E8]">Registered in England and Wales</p>
                                <p className="text-[#EAF7E8]">Company Number: 16173662</p>
                            </div>
                            <div className='' >
                                <span className="text-main_color">Registered Office :</span>
                                <p className="text-[#EAF7E8]">Office 11244</p>
                                <p className="text-[#EAF7E8]">182-184 High Street North</p>
                                <p className="text-[#EAF7E8]">East Ham, London</p>
                                <p className="text-[#EAF7E8]">E6 2JA</p>
                            </div>
                            <div className='flex mt-6 items-center'>
                                <img className=" me-1" src={smsicon} alt="smsicon" />
                                <span className="text-[#EAF7E8]"> info@Tagarer.com</span>
                            </div>
                        </FooterLinkGroup>
                    </div>
                </div>
                <div className="w-full bg-secondary_color px-12 py-4">
                    <div className="container m-auto sm:flex sm:items-center sm:justify-between text-center">
                        <div className="my-2 flex items-center justify-center space-x-4">
                            <p className="text-sm me-10">سياسة الخصوصية</p>
                            <p className="text-sm">الشروط والأحكام</p>
                        </div>
                        <FooterCopyright href="#" by="  تقارير. جميع الحقوق محفوظة  " className="text-white lg:order-first" year={2024} />
                    </div>
                </div>
            </div>
        </Footer>
    );
}
