import React, { useEffect } from 'react'
import { useAppDispatch } from '../../Store/store';
import { changeActiveNav, changeCurrentPath } from '../../Store/user.slice';
import { useSelector } from 'react-redux';
import { Pakage } from '../../Interfaces/pakage';
import { handleGetAllPayments } from '../../Store/pakage.slice';
import { Toaster } from 'react-hot-toast';
import plus2 from '../../assets/Icons/DashBoard/plus2.svg'
import icon from '../../assets/Icons/trueIcon.svg';
import { useNavigate } from 'react-router-dom';

export default function Subscribtion() {
  const { pakages } = useSelector((state: { pakages: { pakages: Pakage[] } }) => state.pakages);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPakages = async () => {
      await dispatch(handleGetAllPayments());
    };
    fetchPakages();
  }, [dispatch]);

  useEffect(() => {
    dispatch(changeCurrentPath('الاشتركات'));
    dispatch(changeActiveNav(7));
  }, []);
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className='flex justify-between items-center'>
        <div><p className='font-bold text-lg'>الباقات</p></div>
        <button
          onClick={() => navigate('/Dashboard/add-subscription')}
          className="text-white  text-sm flex items-center gap-1 rounded-lg py-2 px-3 hover:bg-green-600 bg-[#3D9635] transition-colors"
          title="اضافة باقة"
        >
          <img src={plus2} alt='plus2' className="w-4 h-4" />
          <span className=' sm:inline pe-2'>اضافة باقة</span>
        </button>
      </div>
      <div className='container mx-auto my-9 text-center px-4'>
        <p className='text-2xl font-bold'>باقة تقارير</p>
      </div>

      <div className='container flex  justify-center mb-20 gap-4 mx-auto'>
        {pakages?.map((pakage, index) => (
          <div key={index} className='bg-[#EAF7E8] border rounded-2xl text-center w-64 p-4'>
            <p className='mb-2 font-bold'>{pakage?.name}</p>
            <p className='text-2xl font-bold text-main_color'>{pakage?.price} ريال</p>
            <p className='text-slate-600 mt-3 border-b-2 pb-6'>{pakage?.description}</p>
            <div className='my-4 border-b-2 pb-6'>
              {pakage?.features.map((feature, index) => (
                <div key={index} className='flex my-2 gap-2'>
                  <img src={icon} alt='icon' />
                  <p>{feature}</p>
                </div>
              ))}
            </div>
            <div>
              <button className="bg-gradient-to-r text-sm w-3/4 py-3 mb-3 from-[#3D9635] to-[#97DB91] text-white rounded-full px-4">
                اشتري الآن
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
