import { useEffect, useState } from "react"
import { useAppDispatch } from "../../Store/store";
import { changeActiveNav, changeCurrentPath } from "../../Store/user.slice";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

import { handleGetAllClassifications, handleGetAllNumberOfReportsForClassification, handleGetAllNumberOfReportsForSourses, handleGetAllSource, handleGetgetReportsCountersBetweenYears, handleGetMostRepeatedClassification, handleGetMostRepeatedSource, handleGetReportsChartData, handleGetTop5RepeatedClassifications, handleGetTop5RepeatedSources } from "../../Store/statistics.slice";
import { useSelector } from "react-redux";
import YearRangeSelector from "../../Components/Custom/DropdownYear";
import DropdownT from "../../Components/Custom/DropdownT";
interface DropdownItem {
    value: string;
    label: string;
}
export default function Statistics() {
    const dispatch = useAppDispatch();
    const { classifications, sources, numberOfClassifications, numberOfSourses, numberOfReportsBetweenYears, chartData, mostRepetedClassification, mostRepeted5Classifications, mostRepetedSource, mostRepeted5Sources } = useSelector((state: {
        Statistics: {
            classifications: string[], sources: string[], numberOfClassifications: number, numberOfSourses: number, numberOfReportsBetweenYears: number, chartData: [{
                year: string;
                count: number;
            }], mostRepetedClassification: string, mostRepeted5Classifications: [
                {
                    _id: string;
                    count: number;
                }
            ], mostRepetedSource: string,
            mostRepeted5Sources: [
                {
                    _id: string;
                    count: string;
                }];
        }
    }) => state.Statistics);
    //^ classifications
    const [selectedClassification, setSelectedClassification] = useState<string>('');
    const [classificationOptions, setClassificationOptions] = useState<DropdownItem[]>([]);
    const handleClassificationChange = async (value: string) => {
        setSelectedClassification(value);
        await dispatch(handleGetAllNumberOfReportsForClassification({ classification: value }));
    }
    useEffect(() => {
        setClassificationOptions([
            { value: '', label: 'الكل' },
            ...(classifications ? classifications.map((report: string) => ({ value: report, label: report })) : []),
        ]);
    }, [classifications]);

    //^ sources
    const [selectedSource, setSelectedSource] = useState<string>('');
    const [sourceOptions, setSourceOptions] = useState<DropdownItem[]>([]);
    const handleSourceChange = async (value: string) => {
        setSelectedSource(value);
        await dispatch(handleGetAllNumberOfReportsForSourses({ source: value }));
    }
    useEffect(() => {
        setSourceOptions([
            { value: '', label: 'الكل' },
            ...(sources ? sources.map((source: string) => ({ value: source, label: source })) : []),
        ]);
    }, [
        sources,
    ]);

    //^ year Selector 
    const handleYearChange = async (startYear: string, endYear: string) => {
        console.log(startYear, endYear);
        await dispatch(handleGetgetReportsCountersBetweenYears({ startYear, endYear }));
    };

    // ^ chart data 
    const data = {

        labels: [...chartData.map((data) => data.year)],
        datasets: [
            {
                label: "التقارير",
                data: [...chartData.map((data) => data.count)],
                borderColor: "#3D9635",
                backgroundColor: "#3D9635",
                tension: 0,
                pointStyle: "circle",
                pointRadius: 5,
                pointHoverRadius: 5,
                pointBackgroundColor: "#3D9635",
                pointBorderColor: "#3D9635",
                pointBorderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
    };


    const fetchData = async () => {
        await dispatch(handleGetAllClassifications());
        const data = await dispatch(handleGetAllNumberOfReportsForClassification({ classification: '' }));
        console.log(data);
        await dispatch(handleGetAllNumberOfReportsForSourses({ source: '' }));
        await dispatch(handleGetAllSource());
        await dispatch(handleGetReportsChartData());
        await dispatch(handleGetMostRepeatedClassification());
        await dispatch(handleGetTop5RepeatedClassifications());
        await dispatch(handleGetMostRepeatedSource());
        await dispatch(handleGetTop5RepeatedSources());
    };
    useEffect(() => {
        dispatch(changeCurrentPath('احصائيات المنصة'));
        fetchData();
        dispatch(changeActiveNav(5));
    }, []);
    return (
        <div>
            <div className="grid md:grid-cols-3 grid-cols-1">
                <div className="">
                    <DropdownT
                        label="التصنيف"
                        options={classificationOptions}
                        selectedValue={selectedClassification}
                        onChange={handleClassificationChange}
                    />
                    <div className="bg-white mt-2 py-2 text-center rounded-lg shadow-lg">
                        <p className="text-lg text-[#575a5e] font-bold">عدد التقارير</p>
                        <p className="text-4xl mt-2 text-[#202224] font-bold">{numberOfClassifications || 0}</p>
                    </div>

                </div>
                <div className="ms-2">
                    <DropdownT
                        label="المصدر"
                        options={sourceOptions}
                        selectedValue={selectedSource}
                        onChange={handleSourceChange}
                    />
                    <div className="bg-white mt-2 py-2 text-center rounded-lg shadow-lg">
                        <p className="text-lg text-[#575a5e] font-bold">عدد التقارير</p>
                        <p className="text-4xl mt-2 text-[#202224] font-bold">{numberOfSourses || 0}</p>
                    </div>
                </div>
                <div>

                    <div className="p4">
                        <label className="block text-gray-700 ">{"العام"}</label>
                        <YearRangeSelector onYearChange={handleYearChange} />
                    </div>
                    <div className="bg-white m-2 py-2 text-center rounded-lg shadow-lg">
                        <p className="text-lg text-[#575a5e] font-bold">عدد التقارير</p>
                        <p className="text-4xl mt-2 text-[#202224] font-bold">{numberOfReportsBetweenYears || 0}</p>
                    </div>
                </div>
            </div>
            <div className=" bg-white p-5 rounded-lg m-auto w-full">
                <p className="font-bold">السنوات الاعلى و الأقل تقرير</p>
                <Line data={data} height={'100%'} options={options} />
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-3 grid-cols-1">
                <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold">المصادر الاعلى تقارير</p>
                    <div className="grid grid-cols-3 text-center border-b-2 pb-2">
                        {mostRepeted5Classifications.map((classification, index) => (
                            <div className="bg-[#F7F8F9] px-2 text-sm py-1 rounded-lg" key={index}>
                                {classification._id}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between pt-3 items-center">
                        <p className="font-bold ">المصدر الاعلى تقارير</p>
                        <p className="bg-[#EAF7E8] px-2 py-1 text-sm rounded-lg">{mostRepetedClassification}</p>
                    </div>

                </div>

                <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold">المصادر الاعلى تقارير</p>
                    <div className="grid grid-cols-3 text-center border-b-2 pb-2">
                        {mostRepeted5Sources.map((source, index) => (
                            <div className="bg-[#F7F8F9] px-2 text-sm py-1 rounded-lg" key={index}>
                                {source._id}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between pt-3 items-center">
                        <p className="font-bold ">المصدر الاعلى تقارير</p>
                        <p className="bg-[#EAF7E8] px-2 py-1 text-sm rounded-lg"> {mostRepetedSource}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
