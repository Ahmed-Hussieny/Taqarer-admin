import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../Store/store';
import { changeActiveNav, changeCurrentPath } from '../../Store/user.slice';
import { useSelector } from 'react-redux';
import { Pakage } from '../../Interfaces/pakage';
import { handleGetAllPayments, handleDeletePakage, handleTogglePakage } from '../../Store/pakage.slice';
import { Toaster } from 'react-hot-toast';
import plus2 from '../../assets/Icons/DashBoard/plus2.svg'
import icon from '../../assets/Icons/trueIcon.svg';
import { useNavigate } from 'react-router-dom';
import deleteIcon from '../../assets/Icons/DashBoard/trash.svg';
import toggleIcon from '../../assets/Icons/DashBoard/editIcon.png';

export default function Subscribtion() {
  const { pakages } = useSelector((state: { pakages: { pakages: Pakage[] } }) => state.pakages);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: string }>({});
  const [isFetching, setIsFetching] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPakages = async () => {
      setIsFetching(true);
      try {
        await dispatch(handleGetAllPayments());
      } finally {
        setIsFetching(false);
      }
    };
    fetchPakages();
  }, [dispatch]);

  useEffect(() => {
    dispatch(changeCurrentPath('الاشتركات'));
    dispatch(changeActiveNav(7));
  }, []);

  const handleDelete = async (id: string) => {
    setLoadingStates(prev => ({ ...prev, [id]: 'delete' }));
    try {
      await dispatch(handleDeletePakage({ id }));
      await dispatch(handleGetAllPayments());
    } finally {
      setLoadingStates(prev => ({ ...prev, [id]: '' }));
      setSelectedPackageId(null);
    }
  };

  const handleToggle = async (id: string) => {
    setLoadingStates(prev => ({ ...prev, [id]: 'toggle' }));
    try {
      await dispatch(handleTogglePakage({ id }));
      await dispatch(handleGetAllPayments());
    } finally {
      setLoadingStates(prev => ({ ...prev, [id]: '' }));
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='flex justify-between items-center'>
        <div><p className='font-bold text-lg'>الباقات</p></div>
        <button
          onClick={() => navigate('/Dashboard/add-subscription')}
          className="text-white text-sm flex items-center gap-1 rounded-lg py-2 px-3 hover:bg-green-600 bg-[#3D9635] transition-colors"
          title="اضافة باقة"
        >
          <img src={plus2} alt='plus2' className="w-4 h-4" />
          <span className='sm:inline pe-2'>اضافة باقة</span>
        </button>
      </div>
      <div className='container mx-auto my-9 text-center px-4'>
        <p className='text-2xl font-bold'>باقة تقارير</p>
      </div>

      {isFetching ? (
        <div className="flex justify-center items-center h-64">
          <p> جاري التحميل...</p>
        </div>
      ) : (
        <div className='container flex justify-center mb-20 gap-4 mx-auto flex-wrap'>
          {pakages?.map((pakage) => (
            <div key={pakage._id} className='bg-[#EAF7E8] border rounded-2xl text-center w-64 p-4 relative'>
              <div className='items-center flex justify-end mb-3 gap-2'>
                <button
                  onClick={() => navigate(`/Dashboard/edit-subscription/${pakage._id}`)}
                  className="p-1 hover:bg-blue-100 rounded-full"
                  title="تعديل"
                >
                  <img src={toggleIcon} alt="edit" className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setSelectedPackageId(pakage._id)}
                  className="hover:bg-red-100 rounded-full w-5 h-5"
                  title="حذف"
                  disabled={!!loadingStates[pakage._id]}
                >
                  <img src={deleteIcon} alt="delete" className="w-full" />
                </button>

                <button
                  onClick={() => handleToggle(pakage._id)}
                  className={`p-1 ${pakage.active ? "bg-main_color" : "bg-red-800"} rounded-full w-5 h-5 flex items-center justify-center`}
                  title={pakage.active ? 'تعطيل' : 'تفعيل'}
                  disabled={!!loadingStates[pakage._id]}
                >
                  {loadingStates[pakage._id] === 'toggle' && (
                    <svg className="animate-spin h-5 w-5 text-[#ffffff]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                </button>
              </div>

              <p className='mb-2 font-bold'>{pakage?.name}</p>
              <p className='text-2xl font-bold text-main_color'>{pakage?.price} ريال</p>
              <p className='text-slate-600 mt-3'>{pakage?.duration} يوم</p>
              <p className='text-slate-600 border-b-2 pb-6'>{pakage?.description}</p>
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

          {selectedPackageId && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white p-6 text-center rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">هل أنت متأكد؟</h2>
                <div className='grid grid-cols-3 gap-2'>
                  <button
                    onClick={() => handleDelete(selectedPackageId)}
                    disabled={loadingStates[selectedPackageId] === 'delete'}
                    className="bg-red-600 col-span-2 text-white px-4 py-2 rounded-md mr-2 flex justify-center items-center gap-2"
                  >
                    {loadingStates[selectedPackageId] === 'delete' ? (
                      <>

                        <svg className="animate-spin h-5 w-5 text-[#3D9635]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </>
                    ) : 'نعم, حذف هذه الباقة'}
                  </button>
                  <button
                    onClick={() => setSelectedPackageId(null)}
                    className="bg-gray-300 col-span-1 px-4 py-2 rounded-md"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}