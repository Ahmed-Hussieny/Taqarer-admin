import { useAppDispatch } from '../../Store/store';
import { changeActiveNav, changeCurrentPath, HandleGetAllClientUsers, HandleToggleVerification } from '../../Store/user.slice';
import { useEffect, useState } from 'react';
// import editIcon from '../../assets/Icons/DashBoard/editIcon.svg';
import deleteIcon from '../../assets/Icons/DashBoard/trash.svg';
import pin from '../../assets/Icons/DashBoard/Pin.svg';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
interface Package {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  createdAt: string;
}
interface ClientUser {
  _id: string;
  username: string;
  email: string;
  endDate: string;
  isVerified: boolean;
  subscribed: boolean;
  startDate: string;
  packageId: Package;
  createdAt: string;
}
export default function SubscriberManagement() {
  //   const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { clientUsers, numberOfPages } = useSelector((state: { user: { clientUsers: ClientUser[], numberOfPages: number } }) => state.user);


  const fetchData = async ({
    page = 1,
    email = ''
  }: { page?: number, email?: string }) => {
    await dispatch(HandleGetAllClientUsers({ page, email }));
  };
  const handleKeyUp = (event: React.ChangeEvent<HTMLInputElement>) => {
    fetchData({ email: (event.target as HTMLInputElement).value });
  };

  const changeCurrentPage = (page: number) => {
    setCurrentPage(page);
    fetchData({ page });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData({ page: 1 });
    dispatch(changeCurrentPath('الاشتراك'));
    dispatch(changeActiveNav(6));
  }, []);

  const toggleVerifyUser = async (id: string) => {
    const data = await dispatch(HandleToggleVerification(id));
    if (data.payload.user.isVerified) {
      toast.success('تم تفعيل المشترك');
    } else {
      toast.success('تم تعليق المشترك')
    }
  };

  return (
    <div>
      {/* Items per page selector */}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className='grid md:grid-cols-3 grid-cols-1 mb-4 gap-2'>
        {/* Left Section - Search & Pagination */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-lg">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-lg font-medium text-black whitespace-nowrap">المشتركين</span>

          </div>
        </div>

        {/* Right Section - Filters & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 gap-3 rounded-lg">
          <div className="flex col-span- items-center md:justify-start w-auto justify-center">
            <form className="flex-1">
              <div className="relative shadow-lg rounded-lg">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                  <svg className="w-5 h-5 text-main_color" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="ps-10 w-full text-sm text-main_color placeholder:text-main_color border border-gray-300 rounded-lg bg-[#F7F8F9] py-2.5"
                  placeholder="البحث عن مشترك..."
                  onChange={handleKeyUp}
                />
              </div>
            </form>
          </div>
          <div className="flex col-span- items-center md:justify-end pb-3 sm:pb-4 justify-center gap-2">
          </div>
        </div>
      </div>
      {/* <EvidencesTable /> */}
      <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        {/* Table */}
        <table className="min-w-full divide-y border-separate">
          <thead className="bg-[#EAF7E8]">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">
                اسم المشترك
              </th>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 min-w-[90px]">
                ايميل المشترك
              </th>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 min-w-[px]">
                التحقق
              </th>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 min-w-[px]">
                نوع الاشتراك
              </th>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 min-w-[px]">
                قيمة الاشتراك
              </th>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 min-w-[px]">
                مدة الاشتراك
              </th>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 min-w-[200px]">
                خيارات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {clientUsers?.map((clientUser) => (
              <tr key={clientUser?._id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-center text-sm font-medium text-gray-900 sm:pl-6">
                  {clientUser?.username}
                </td>
                {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{governmental?.classification}</td> */}
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-center text-sm font-medium text-gray-900 sm:pl-6">
                  {clientUser?.email}
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-center text-sm font-medium text-gray-900 sm:pl-6">
                  {clientUser?.isVerified ? <div className='p-2 bg-[#C0F7F0] rounded-lg'>مؤكد</div> : <div className='p-2 bg-[#FFD6D6] rounded-lg'>غير مؤكد</div>}
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-center text-sm font-medium text-gray-900 sm:pl-6">
                  {clientUser?.packageId?.name ?

                    <>  الباقة {clientUser?.packageId?.name}</>
                    : "___"}
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-center text-sm font-medium text-gray-900 sm:pl-6">



                  {clientUser?.packageId?.price ?

                    <>  {clientUser?.packageId?.price}  ريال  </>
                    : "___"}
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-center text-sm font-medium text-gray-900 sm:pl-6">
                  <p>{clientUser?.startDate?.split('T')[0]}</p>
                  <p>{clientUser?.endDate?.split('T')[0]}</p>

                </td>
                <td className="whitespace-nowrap px-3 py-4 w-40 text-sm text-gray-500 min-w-[200px]">
                  <div className="flex items-center gap-2">
                    {/* <button
                                                // onClick={() => handleAction(clientUser._id, 'edit')}
                                                className="text-black flex items-center gap-1 rounded-lg py-2 px-3 hover:bg-gray-100 bg-[#F7F8F9] whitespace-nowrap"
                                                title="تعديل"
                                            >
                                                <img src={editIcon} alt="edit" className="w-4 h-4" />
                                                <span>تعديل</span>
                                            </button> */}
                    {clientUser.isVerified ? <button
                      onClick={() => toggleVerifyUser(clientUser._id)}
                      className="text-[#F59E0B] flex items-center gap-1 rounded-lg py-2 px-3 hover:bg-gray-100 bg-[#FFF6E7] whitespace-nowrap"
                      title="تعليق"
                    >
                      <img src={pin} alt="pin" className="w-4 h-4" />
                      <span>تعليق</span>
                    </button>
                      : <button
                        onClick={() => toggleVerifyUser(clientUser._id)}
                        className="text-[#F59E0B] flex items-center gap-1 rounded-lg py-2 px-3 hover:bg-gray-100 bg-[#FFF6E7] whitespace-nowrap"
                        title="تفعيل"
                      >
                        <img src={pin} alt="pin" className="w-4 h-4" />
                        <span>تفعيل</span>
                      </button>}

                    {/* pin */}
                    <button
                      // onClick={() => handleAction(clientUser._id, 'delete')}
                      className="text-red-600 p-2 rounded-lg bg-[#FFF1F1] hover:bg-red-50 flex items-center justify-center"
                      title="حذف"
                    >
                      <img className="w-4 h-4" src={deleteIcon} alt="delete" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-8 mb-4" dir="rtl">
        {/* Next Button (left side in RTL) */}

        <button
          onClick={() => changeCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-[#BBC3CF]  text-black hover:bg-gray-100 rounded-s-lg disabled:opacity-50"
          aria-label="الصفحة السابقة"
        >
          &lt; {/* Right-pointing arrow for "Previous" in RTL */}
        </button>
        {/* Page Numbers (descending order) */}
        {[...Array(numberOfPages)].map((_, index) => {
          return (
            <button
              key={index + 1}
              onClick={() => changeCurrentPage(index + 1)}
              className={`px-3 py-1 flex items-center justify-center ${currentPage === index + 1
                ? 'bg-[#BBC3CF]  text-black border'
                : 'text-black bg-[#F7F8F9] border border-1/2 border-slate-300'
                }`}
              aria-label={`الصفحة ${index + 1}`}
            >
              <span>{index + 1}</span>
            </button>
          );
        })}

        {/* Previous Button (right side in RTL) */}
        <button
          onClick={() => changeCurrentPage(Math.min(numberOfPages, currentPage + 1))}
          disabled={currentPage === numberOfPages}
          className="px-3 py-1 bg-[#BBC3CF]  text-black hover:bg-gray-100 rounded-l-lg disabled:opacity-50"
          aria-label="الصفحة التالية"
        >
          &gt; {/* Left-pointing arrow for "Next" in RTL */}
        </button>
      </div>
    </div>
  )
}
