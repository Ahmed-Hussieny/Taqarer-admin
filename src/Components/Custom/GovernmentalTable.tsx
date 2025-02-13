import MoreButton from "./MoreButton";
import GovernmentalItem from "./GovernmentalItem";
import img1 from '../../assets/Images/Government/Frame 43 (1).png';
// import img2 from '../../assets/Images/Government/Frame 43 (2).png';
import { IGovernmental } from "../../Interfaces/governmental";
export default function GovernmentalTable({governmentals}: {governmentals: IGovernmental[]}) {
    return (
        <>
            <div className="my-5 font-bold text-sm  hidden sm:block">
                <div className="grid grid-cols-12 gap-2 header bg-third_color text-black py-4 px-2 rounded-lg">
                    <div className="sm:col-span-4 col-span-5 ps-2 text-center">
                        <span>الإسم</span>
                    </div>
                    <div className="col-span-4  sm:col-span-5 sm:border-s-2 ps-2  text-center border-[#E0E0E0]r">
                        <span>نبذة مختصرة</span>
                    </div>
                    <div className="col-span-3  border-s-2 ps-2 border-[#E0E0E0] text-center  hidden sm:block">
                        <span>تحميل</span>
                    </div>
                </div>
            </div>

            <div className="my-5 font-bold text-sm">
                {governmentals?.map((governmental)=>{
                    return <GovernmentalItem
                    key={governmental._id}
                    name={governmental.name}
                    details={governmental.description}
                    nameImage={img1}
                    viewLink={governmental.link}
                />
                })}
            </div>
            <div className="my-6">
                <MoreButton title="عرض المزيد" />
            </div>
        </>

    );
}
