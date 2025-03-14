import { useEffect, useLayoutEffect, useState } from 'react';
import editIcon from '../../assets/Icons/DashBoard/editIcon.svg';
import deleteIcon from '../../assets/Icons/DashBoard/trash.svg';
import downloadIcon from '../../assets/Icons/DashBoard/downloadIcon.svg';
import plus from '../../assets/Icons/DashBoard/plus.svg'
import plus2 from '../../assets/Icons/DashBoard/plus2.svg'
import Dropdown from '../../Components/Custom/Dropdown';
import { useAppDispatch } from '../../Store/store';
import { handelDownloadReport, handleDeleteReport, handleGetAllReports } from '../../Store/report.slice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { changeCurrentPath } from '../../Store/user.slice';
interface Report {
    _id: string;
    name: string;
    type: string;
    year: number;
    source: string;
    pdfName: string;
    classification: string;
}
interface DropdownItem {
    value: string;
    label: string;
}
export default function ReportsTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedName, setSelectedName] = useState<string>('');
    const [downloadingReportId, setDownloadingReportId] = useState<string>('');
    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedSource, setSelectedSource] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [nameOptions, setNameOptions] = useState<DropdownItem[]>([]);
    const [sourceOptions, setSourceOptions] = useState<DropdownItem[]>([]);
    const [yearOptions, setYearOptions] = useState<DropdownItem[]>([]);
    const { reports, sourceFilters, nameFilters, yearFilters, numberOfPages } = useSelector((state: { reports: { reports: Report[], sourceFilters: string[], nameFilters: string[], yearFilters: string[], numberOfPages: number } }) => state.reports);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [reportIdToDelete, setReportIdToDelete] = useState<string | null>(null);
    const navigate = useNavigate();
    const handleAction = async (reportId: string, action: string) => {
        try {
            switch (action) {
                case 'edit':
                    navigate(`/Dashboard/edit-report/${reportId}`);
                    break;

                case 'delete':
                    setReportIdToDelete(reportId);
                    setShowDeleteModal(true);
                    break;

                case 'download':
                    try {
                        setDownloadingReportId(reportId);
                        await dispatch(handelDownloadReport(reportId));
                    } finally {
                        setDownloadingReportId('');
                    }
                    break;
            }
        } catch (error) {
            console.error(`Error handling action "${action}":`, error);
            toast.error('حدث خطأ أثناء تنفيذ العملية');
        }
    };

    const handleDeleteAction = async () => {
        if (!reportIdToDelete) return;

        const data = await dispatch(handleDeleteReport(reportIdToDelete));
        if (data.payload.success) {
            toast.success('تم حذف التقرير بنجاح');
        } else {
            toast.error(data.payload.message);
        }

        setShowDeleteModal(false);
        setReportIdToDelete(null);
    };

    const changeCurrentPage = (page: number) => {
        setCurrentPage(page);
        fetchData({ page,
            classification: selectedName,
            source: selectedSource,
            year: selectedYear,
            custom: '',
         });
    };

    const dispatch = useAppDispatch();
    const fetchData = async ({
        page = 1,
        classification = '',
        source = '',
        year = '',
        custom = '',
    }: { page?: number, classification?: string, source?: string, year?: string, custom?: string }) => {
        const data = await dispatch(handleGetAllReports({ page, classification, source, year, custom }));
        console.log(data.payload);
    };

    useEffect(() => {
        setNameOptions([
            { value: '', label: 'الكل' },
            ...nameFilters.map((name: string) => ({ value: name, label: name })),
        ]);
        setSourceOptions([
            { value: '', label: 'الكل' },
            ...sourceFilters.map((source: string) => ({ value: source, label: source })),
        ]);
        setYearOptions([
            { value: '', label: 'الكل' },
            ...yearFilters.map((year: string) => ({ value: year, label: year })),
        ]);
    }, [nameFilters, sourceFilters, yearFilters]);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        fetchData({ page: 1 });
        dispatch(changeCurrentPath('رفع التقارير'));
    }, []);

    const handleNameChange = (value: string) => {
        setSelectedName(value);
        setSelectedSource('');
        setSelectedYear('');
        fetchData({ classification: value });
    };

    const handleSourceChange = (value: string) => {
        setSelectedSource(value);
        setSelectedYear('');
        fetchData({ source: value, classification: selectedName,
            custom: searchValue,
            page: 1
         });
    };

    const handleYearChange = (value: string) => {
        setSelectedYear(value);
        fetchData({ year: value, classification: selectedName, source: selectedSource,
            custom: searchValue,
            page: 1
         });
    };

    const handleKeyUp = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedYear("");
        setSelectedSource("");
        setSelectedName("");
        setSearchValue(event.target.value);
        fetchData({ custom: (event.target as HTMLInputElement).value,
            classification: selectedName,
            source: selectedSource,
            year: selectedYear,
            page: 1,
         });
    };

    return (
        <div className="">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flow-root">
                {/* Items per page selector */}
                <div className='grid md:grid-cols-3 grid-cols-1 gap-2'>
                    {/* Left Section - Search & Pagination */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-lg">
                        <div className="flex items-center gap-3 flex-1">
                            <span className="text-lg font-medium text-black whitespace-nowrap">التقارير</span>
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
                                        value={searchValue}
                                        className="ps-10 w-full text-sm text-main_color placeholder:text-main_color border border-gray-300 rounded-lg bg-gray-50 py-2.5"
                                        placeholder="ابحث الأن ..."
                                        onChange={handleKeyUp}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Section - Filters & Actions */}
                    <div className="col-span-2 gap-3 items-center rounded-lg">
                        <div className="justify-between items-center">
                            <div className='grid grid-cols-3 gap-2'>
                                <Dropdown
                                    label="نوع التقرير"
                                    options={nameOptions}
                                    selectedValue={selectedName}
                                    onChange={handleNameChange}
                                />
                                <Dropdown
                                    label="المصدر"
                                    options={sourceOptions}
                                    selectedValue={selectedSource}
                                    onChange={handleSourceChange}
                                />
                                <Dropdown
                                    label="العام"
                                    options={yearOptions}
                                    selectedValue={selectedYear}
                                    onChange={handleYearChange}
                                />
                            </div>

                        </div>
                        <div className="flex mt-2 col-span- items-center md:justify-end pb-3 sm:pb-4 justify-end ms-auto gap-2">
                            <button
                                onClick={() => navigate('/Dashboard/add-report')}
                                className="text-black text-sm flex items-center gap-1 rounded-lg py-2 px-3 hover:bg-green-50 bg-[#EAF7E8] transition-colors"
                                title="اضافة تقرير"
                            >
                                <img src={plus} alt='plus' className="w-4 h-4" />
                                <span className=' sm:inline pe-2'>اضافة تقرير</span>
                            </button>
                            <button
                                onClick={() => navigate('/Dashboard/add-reports')}
                                className="text-white  text-sm flex items-center gap-1 rounded-lg py-2 px-3 hover:bg-green-600 bg-[#3D9635] transition-colors"
                                title="اضافة مجموعة تقارير"
                            >
                                <img src={plus2} alt='plus2' className="w-4 h-4" />
                                <span className=' sm:inline pe-2'>اضافة مجموعة تقارير</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    {/* Table */}
                    <table className="min-w-full divide-y border-separate  ">
                        {/* ... (same table header as before) ... */}
                        <thead className="bg-[#EAF7E8]">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900  sm:pl-6">
                                    اسم التقرير
                                </th>

                                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 min-w-[150px]">
                                    مصدر التقرير
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 min-w-[px]">
                                    سنه التقرير
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 min-w-[90px]">
                                    نوع التقرير
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 min-w-[100px]">
                                    خيارات
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 w-10">
                                    تحميل
                                </th>

                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {reports?.map((report) => (
                                <tr key={report?._id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {report?.name}
                                    </td>

                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report?.source}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report?.year}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report?.classification}</td>
                                    <td className="whitespace-nowrap px-3 py-4 w-40 text-sm text-gray-500 min-w-[200px]">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleAction(report?._id, 'edit')}
                                                className="text-black flex items-center gap-1 rounded-lg py-2 px-3 hover:bg-gray-100 bg-[#F7F8F9] whitespace-nowrap"
                                                title="تعديل"
                                            >
                                                <img src={editIcon} alt='edit' className="w-4 h-4" />
                                                <span>تعديل</span>
                                            </button>
                                            <button
                                                onClick={() => handleAction(report?._id, 'delete')}
                                                className="text-red-600 p-2 rounded-lg bg-[#FFF1F1] hover:bg-red-50 flex items-center justify-center"
                                                title="حذف"
                                            >
                                                <img className='w-4 h-4' src={deleteIcon} alt='delete' />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 min-w-[150px]">
                                        <button
                                            onClick={() => handleAction(report?.pdfName, 'download')}
                                            className="text-black flex items-center gap-1 rounded-lg py-2 px-3 hover:bg-green-50 bg-[#EAF7E8] whitespace-nowrap"
                                            title="تحميل"
                                            disabled={downloadingReportId === report._id}
                                        >
                                            {downloadingReportId === report._id ? (
                                                <svg className="animate-spin h-5 w-5 text-[#3D9635]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : (
                                                <>
                                                    <img src={downloadIcon} alt='download' className="w-4 h-4" />
                                                    <span>تحميل</span>
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination controls */}
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
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">تأكيد الحذف</h2>
                        <p className="mb-6">هل أنت متأكد أنك تريد حذف هذا التقرير ؟</p>
                        <div className="grid grid-cols-2 gap-2 space-x-4">
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                إلغاء
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={handleDeleteAction}
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