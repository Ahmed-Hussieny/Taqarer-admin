import React from "react";
import TaqrerItem from "./TaqrerItem";
import { Report } from "../../Interfaces/report";

interface ReportTableProps {
    reports: Report[];
}
const ReportTable: React.FC<ReportTableProps> = ({ reports }) => {
    return (
        <>
            <div className="my-5 font-bold text-sm">
                <div className="grid grid-cols-12 gap-2 header bg-third_color text-black py-4 px-2 rounded-lg">
                    <div className="sm:col-span-4 col-span-5 ps-2 text-center">
                        <span>الإسم</span>
                    </div>
                    <div className="col-span-4 sm:col-span-3 sm:border-s-2 ps-2  text-center border-[#E0E0E0]r">
                        <span>المصدر</span>
                    </div>
                    <div className="col-span-2 sm:col-span-2 sm:border-s-2 ps-2  text-center border-[#E0E0E0]">
                        <span>العام</span>
                    </div>
                    <div className="col-span-3  border-s-2 ps-2 border-[#E0E0E0] text-center  hidden sm:block">
                        <span>خيارات</span>
                    </div>
                </div>
            </div>

            <div className="my-5 font-bold text-sm">
                {reports.map((report) => {
                    return (
                        <TaqrerItem
                            key={report._id}
                            name={report.name}
                            source={report.source}
                            year={report.year}
                            viewLink={report.link}
                            details={report.description}
                            pdfName={report.pdfName}
                        />
                    );
                })}
            </div>

        </>

    );
};

export default ReportTable;
