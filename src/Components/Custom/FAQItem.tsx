import { useState } from "react";
import arrowDown from "../../assets/Icons/Group.png";
import arrowDownRed from '../../assets/Images/FAQ/arrow-down.png'
export default function FAQItem({ title, description }: { title: string, description: string }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [arrow, setArrow] = useState(arrowDownRed);

    const handelExpand = () => {
        setIsExpanded(!isExpanded);
        setArrow(isExpanded ? arrowDownRed : arrowDown);
    };

    return (
        <div 
    className={`rounded-2xl p-2 my-3 bg-[#F7F8F9] border px-3 py-2 
        ${isExpanded ? 'border-[#3D9635]' : 'border-[#D5DAE1]'}`}
>
            <div onClick={handelExpand} className="flex justify-between py-2 cursor-pointer">
                <div className="text-start">
                    <h3 className="font-medium text-black">{title}</h3>
                </div>
                <div className="flex justify-center relative items-center text-white px-4 rounded-lg">
                    <img
                        src={arrow}
                        className={`absolute transform transition-transform ${isExpanded ? "rotate-180" : "rotate-0"}`}
                        alt="arrowDown"
                    />
                </div>
            </div>

            {isExpanded && (
                <div className="border-[#D5DAE1] p-2 border-t-2 text-gray-700 transition-all duration-300">
                    <p className="font-normal">{description}</p>
                </div>
            )}
        </div>
    );
}
