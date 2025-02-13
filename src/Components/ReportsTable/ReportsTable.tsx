import { useEffect, useState } from 'react';
import editIcon from '../../assets/Icons/DashBoard/editIcon.svg';
import deleteIcon from '../../assets/Icons/DashBoard/trash.svg';
import downloadIcon from '../../assets/Icons/DashBoard/downloadIcon.svg';
import plus from '../../assets/Icons/DashBoard/plus.svg'
import plus2 from '../../assets/Icons/DashBoard/plus2.svg'

import Dropdown from '../Custom/Dropdown';
import { useAppDispatch } from '../../Store/store';
import { handleGetAllReports } from '../../Store/report.slice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
interface Report {
    _id: string;
    name: string;
    type: string;
    year: number;
    source: string;
    classification: string;
}
interface DropdownItem {
    value: string;
    label: string;
}
export default function ReportsTable() {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedName, setSelectedName] = useState<string>('');
    const [selectedSource, setSelectedSource] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [nameOptions, setNameOptions] = useState<DropdownItem[]>([]);
    const [sourceOptions, setSourceOptions] = useState<DropdownItem[]>([]);
    const [yearOptions, setYearOptions] = useState<DropdownItem[]>([]);
    const { reports, sourceFilters, nameFilters, yearFilters, numberOfPages } = useSelector((state: { reports: { reports: Report[], sourceFilters: string[], nameFilters: string[], yearFilters: string[], numberOfPages: number } }) => state.reports);
    const navigete = useNavigate();
    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = reports.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = numberOfPages;

    const handleAction = (reportId: string, action: string) => {
        console.log(`${action} report ${reportId}`);
    };

    const handlePageChange = async (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
            await fetchData({ page: newPage, name: selectedName, source: selectedSource, year: selectedYear });
        }
    };

    const dispatch = useAppDispatch();
    const fetchData = async ({
        page = 1,
        name = '',
        source = '',
        year = '',
        custom = '',
    }: { page?: number, name?: string, source?: string, year?: string, custom?: string }) => {
        await dispatch(handleGetAllReports({ page, name, source, year, custom }));
    };

    useEffect(() => {
        setNameOptions([
            { value: '', label: 'الكل' },
            ...(nameFilters ? nameFilters.map((report: string) => ({ value: report, label: report })) : []),
        ]);
        setSourceOptions([
            { value: '', label: 'الكل' },
            ...(sourceFilters ? sourceFilters.map((report: string) => ({ value: report, label: report })) : []),
        ]);
        setYearOptions([
            { value: '', label: 'الكل' },
            ...(yearFilters ? yearFilters.map((report: string) => ({ value: report, label: report })) : []),
        ]);
    }, [nameFilters, sourceFilters, yearFilters]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData({ page: 1 });
    }, []);
    const handleNameChange = (value: string) => {
        console.log(value);
        fetchData({ name: value, source: selectedSource, year: selectedYear });
        setSelectedName(value);
    }

    const handleSourceChange = (value: string) => {
        console.log(value);
        fetchData({ name: selectedName, source: value, year: selectedYear });
        setSelectedSource(value);
    };
    const handleYearChange = (value: string) => {
        console.log(value);
        fetchData({ name: selectedName, source: selectedSource, year: value });
        setSelectedYear(value);
    }
    const handleKeyUp = (event: React.ChangeEvent<HTMLInputElement>) => {
        fetchData({ custom: (event.target as HTMLInputElement).value });
        console.log("Input Value:", (event.target as HTMLInputElement).value);
    };
    return (
        <div className="">
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
                        <div className="flex col-span- items-center md:justify-end pb-3 sm:pb-4 justify-center gap-2">
                            <button
                                onClick={()=>navigete('/add-report')}
                                className="text-black text-sm flex items-center gap-1 rounded-lg py-2 px-3 hover:bg-green-50 bg-[#EAF7E8] transition-colors"
                                title="اضافة تقرير"
                            >
                                <img src={plus} alt='plus' className="w-4 h-4" />
                                <span className=' sm:inline pe-2'>اضافة تقرير</span>
                            </button>
                            <button
                                onClick={()=>navigete('/add-reports')}
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
                                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 min-w-[90px]">
                                    نوع التقرير
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 min-w-[px]">
                                    سنه التقرير
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 min-w-[150px]">
                                    مصدر التقرير
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 min-w-[100px]">
                                    خيارات
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 min-w-[60px]">
                                    تحميل
                                </th>

                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {currentItems.map((report) => (
                                <tr key={report._id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {report.name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report.classification}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report.year}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report.source}</td>
                                    <td className="whitespace-nowrap px-3 py-4 w-40 text-sm text-gray-500 min-w-[200px]">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleAction(report._id, 'edit')}
                                                className="text-black flex items-center gap-1 rounded-lg py-2 px-3 hover:bg-gray-100 bg-[#F7F8F9] whitespace-nowrap"
                                                title="تعديل"
                                            >
                                                <img src={editIcon} alt='edit' className="w-4 h-4" />
                                                <span>تعديل</span>
                                            </button>
                                            <button
                                                onClick={() => handleAction(report._id, 'delete')}
                                                className="text-red-600 p-2 rounded-lg bg-[#FFF1F1] hover:bg-red-50 flex items-center justify-center"
                                                title="حذف"
                                            >
                                                <img className='w-4 h-4' src={deleteIcon} alt='delete' />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 min-w-[150px]">
                                        <button
                                            onClick={() => handleAction(report._id, 'download')}
                                            className="text-black flex items-center gap-1 rounded-lg py-2 px-3 hover:bg-green-50 bg-[#EAF7E8] whitespace-nowrap"
                                            title="تحميل"
                                        >
                                            <img src={downloadIcon} alt='download' className="w-4 h-4" />
                                            <span>تحميل</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                </div>
                {/* Pagination controls */}
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            السابق
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            التالي
                        </button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
                        <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                >
                                    <span className="sr-only">السابق</span>
                                    &lt;
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        aria-current={currentPage === page ? 'page' : undefined}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === page
                                            ? 'bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                >
                                    <span className="sr-only">التالي</span>
                                    &gt;
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}