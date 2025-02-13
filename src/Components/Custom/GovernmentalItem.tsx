
import eyeIcon from "../../assets/Icons/Eye_fill.svg";

export default function GovernmentalItem({
    name,
    nameImage,
    viewLink,
    details
}: {
    name: string;
    nameImage: string;
    viewLink?: string;
    details: string;
}) {

    return (
        <div className="bg-white shadow-lg my-3 border text-black rounded-lg transition-all duration-300">
            {/* Main Content */}
            <div className="grid grid-cols-12  gap-3 py-5 px-3 ">
                {/* Name Column */}
                <div className="sm:col-span-4 col-span-12 flex  justify-between md:px-3 items-start font-medium">
                    <span>{name}</span>
                    <img src={nameImage} className="w-32 h-7 ms-2 hidden sm:block" alt="nameImage" />
                </div>

                {/* Source Column */}
                <div className="col-span-4 sm:col-span-5 font-medium text-[#3b3a3a] sm:border-s border-[#E0E0E0] ps-3 hidden sm:flex">
                    <span>{details}</span>
                </div>

                {/* Action Buttons */}
                <div className="col-span-3 justify-center items-start border-s border-[#E0E0E0] ps-2 gap-3 relative hidden sm:flex">
                    {/* View Button */}
                    <div className="flex items-center text-main_color bg-[#EAF7E8] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#d4f2d0] transition">
                        <span className=" font-medium">رابط الموقع</span>
                        <img src={eyeIcon} className="w-4 h-4 ms-2" alt="eyeIcon" />
                    </div>
                </div>
            </div>

            <div className="col-span-4 sm:col-span-5 font-medium text-[#3b3a3a] sm:border-s border-[#E0E0E0] px-3 sm:hidden">
                <span>{details}</span>
            </div>

            <div className="col-span-3 mt-3 items-center ps-2 gap-3 relative pb-3 flex justify-between sm:hidden">
                {/* View Button */}
                <div className="flex items-center text-main_color bg-[#EAF7E8] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#d4f2d0] transition"
                onClick={()=> window.open(viewLink, "_blank")}>
                    <span className=" font-medium">رابط الموقع</span>
                    <img src={eyeIcon} className="w-4 h-4 ms-2" alt="eyeIcon" />
                </div>
            </div>
        </div>
    );
}
