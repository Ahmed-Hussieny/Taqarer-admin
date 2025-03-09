import { useEffect, useState } from 'react';
import editIcon from '../../assets/Icons/DashBoard/editIcon.svg';
import deleteIcon from '../../assets/Icons/DashBoard/trash.svg';
import eyes from '../../assets/Icons/Articles/View.svg';
import plus from '../../assets/Icons/DashBoard/plus.svg';
import plus2 from '../../assets/Icons/DashBoard/plus2.svg';
import { useAppDispatch } from '../../Store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { changeActiveNav, changeCurrentPath } from '../../Store/user.slice';
import { Evidence } from '../../Interfaces/evidence';
import { handleDeleteGovernmental, handleGetAllGovernmentals } from '../../Store/governmental.slice';
import Dropdown from '../../Components/Custom/Dropdown';
interface DropdownItem {
    value: string;
    label: string;
}
export default function GovernmentalsTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedName, setSelectedName] = useState<string>('');
    const [nameOptions, setNameOptions] = useState<DropdownItem[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [governmentalToDelete, setGovernmentalToDelete] = useState<string | null>(null);

    const { governmentals, numberOfPages, classifications } = useSelector(
        (state: { governmentals: { governmentals: Evidence[]; classifications: string[]; nameFilters: string[]; yearFilters: string[]; numberOfPages: number } }) => state.governmentals
    );
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleAction = async (reportId: string, action: string) => {
        if (action === 'edit') {
            navigate(`/Dashboard/edit-governmental/${reportId}`);
        } else if (action === 'delete') {
            setGovernmentalToDelete(reportId); // Set the governmental ID to delete
            setShowDeleteModal(true); // Show the delete confirmation modal
        }
    };
    useEffect(() => {
        setNameOptions([
            { value: '', label: 'الكل' },
            ...(classifications ? classifications.map((report: string) => ({ value: report, label: report })) : []),
        ]);
    }, [classifications]);
    
    const confirmDelete = async () => {
        if (!governmentalToDelete) return;

        const data = await dispatch(handleDeleteGovernmental(governmentalToDelete));
        if (data.payload.success) {
            toast.success('تم حذف الجهة بنجاح');
        } else {
            toast.error(data.payload.message);
        }

        setShowDeleteModal(false);
        setGovernmentalToDelete(null);
    };

    const changeCurrentPage = (page: number) => {
        setCurrentPage(page);
        fetchData({ page });
    };

    const fetchData = async ({ page = 1, name = '', classification = '' }: { page?: number; name?: string,classification?: string }) => {
        await dispatch(handleGetAllGovernmentals({ page, name, classification }));

    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData({ page: 1 });
        dispatch(changeCurrentPath('رفع الجهات الحكومية'));
        dispatch(changeActiveNav(4));
    }, []);

    const handleKeyUp = (event: React.ChangeEvent<HTMLInputElement>) => {
        fetchData({ name: (event.target as HTMLInputElement).value });
    };

    const navigateToView = (link: string) => {
        window.open(link, '_blank');
    };

    const handleNameChange = (value: string) => {
        fetchData({ classification: value});
        setSelectedName(value);
    }
    return (
        <div className="">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flow-root">
                {/* Items per page selector */}
                <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
                    {/* Left Section - Search & Pagination */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-lg">
                        <div className="flex items-center gap-3 flex-1">
                            <span className="text-lg font-medium text-black whitespace-nowrap">الجهات</span>
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
                                        className="ps-10 w-full text-sm text-main_color placeholder:text-main_color border border-gray-300 rounded-lg bg-gray-50 py-2.5"
                                        placeholder="ابحث الأن ..."
                                        onChange={handleKeyUp}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Section - Filters & Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 gap-3 rounded-lg">
                    <div className="flex col-span- items-center md:justify-start w-auto justify-center">
                            <Dropdown
                                label="نوع الجهة"
                                options={nameOptions}
                                selectedValue={selectedName}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="flex col-span- items-center md:justify-end pb-3 sm:pb-4 justify-center gap-2">
                            <button
                                onClick={() => navigate('/Dashboard/add-governmental')}
                                className="text-black text-sm flex items-center gap-1 rounded-lg py-2 px-3 hover:bg-green-50 bg-[#EAF7E8] transition-colors"
                                title="اضافة جهة"
                            >
                                <img src={plus} alt="plus" className="w-4 h-4" />
                                <span className="sm:inline pe-2">اضافة جهة</span>
                            </button>
                            <button
                                onClick={() => navigate('/Dashboard/add-governmentals')}
                                className="text-white text-sm flex items-center gap-1 rounded-lg py-2 px-3 hover:bg-green-600 bg-[#3D9635] transition-colors"
                                title="اضافة مجموعة جهات حكوميه"
                            >
                                <img src={plus2} alt="plus2" className="w-4 h-4" />
                                <span className="sm:inline pe-2">اضافة جهات حكوميه</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    {/* Table */}
                    <table className="min-w-full divide-y border-separate">
                        <thead className="bg-[#EAF7E8]">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-6">
                                    اسم الجهة
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 min-w-[90px]">
                                    نوع الجهة
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 min-w-[px]">
                                    الرابط
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 min-w-[100px]">
                                    خيارات
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {governmentals?.map((governmental) => (
                                <tr key={governmental?._id}>
                                    <td className="whitespace-nowrap flex justify-between py-4 pl-4 pr-3 items-center text-sm font-medium text-gray-900 sm:pl-6">
                                        <p>{governmental?.name}</p>
                                        {/* <img src={governmental?.image} alt='logo' className="w-32 h-12 inline-block rounded-full" /> */}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{governmental?.classification}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 min-w-[150px]">
                                        <button
                                            onClick={() => navigateToView(`${governmental?.link}`)}
                                            className="text-black flex items-center gap-1 rounded-lg py-2 px-3 hover:bg-gray-100 bg-[#F7F8F9] whitespace-nowrap"
                                            title="عرض الرابط"
                                        >
                                            <img src={eyes} alt="eyes" className="w-4 h-4 inline-block" />
                                            <span>عرض الرابط</span>
                                        </button>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 w-40 text-sm text-gray-500 min-w-[200px]">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleAction(governmental._id, 'edit')}
                                                className="text-black flex items-center gap-1 rounded-lg py-2 px-3 hover:bg-gray-100 bg-[#F7F8F9] whitespace-nowrap"
                                                title="تعديل"
                                            >
                                                <img src={editIcon} alt="edit" className="w-4 h-4" />
                                                <span>تعديل</span>
                                            </button>
                                            <button
                                                onClick={() => handleAction(governmental._id, 'delete')}
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
                {/* Pagination controls */}
                <div className="flex justify-center items-center mt-8 mb-4" dir="rtl">
                    <button
                        onClick={() => changeCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-[#BBC3CF] text-black hover:bg-gray-100 rounded-s-lg disabled:opacity-50"
                        aria-label="الصفحة السابقة"
                    >
                        &lt;
                    </button>
                    {[...Array(numberOfPages)].map((_, index) => {
                        return (
                            <button
                                key={index + 1}
                                onClick={() => changeCurrentPage(index + 1)}
                                className={`px-3 py-1 flex items-center justify-center ${
                                    currentPage === index + 1
                                        ? 'bg-[#BBC3CF] text-black border'
                                        : 'text-black bg-[#F7F8F9] border border-1/2 border-slate-300'
                                }`}
                                aria-label={`الصفحة ${index + 1}`}
                            >
                                <span>{index + 1}</span>
                            </button>
                        );
                    })}
                    <button
                        onClick={() => changeCurrentPage(Math.min(numberOfPages, currentPage + 1))}
                        disabled={currentPage === numberOfPages}
                        className="px-3 py-1 bg-[#BBC3CF] text-black hover:bg-gray-100 rounded-l-lg disabled:opacity-50"
                        aria-label="الصفحة التالية"
                    >
                        &gt;
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">تأكيد الحذف</h2>
                        <p className="mb-6">هل أنت متأكد أنك تريد حذف هذه الجهة؟</p>
                        <div className="grid grid-cols-2 gap-2 space-x-4">
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                إلغاء
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={confirmDelete}
                            >
                                حذف
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}