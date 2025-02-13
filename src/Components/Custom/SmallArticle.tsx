import { useNavigate } from "react-router-dom";
import CustomSmButton from "./CustomSmButton"

export default function SmallArticle({ title, content, img }: {
    title: string,
    content: string,
    img: string
}) {
    const navigate = useNavigate();
    const truncatedContent = content.split(" ").slice(0, 45).join(" ") + (content.split(" ").length > 20 ? "..." : "");

    return (
        <div className="grid grid-cols-1 my-5 md:grid-cols-[3fr_9fr] bg-[#EAF7E8] px-4 py-6 rounded-lg transition-all hover:shadow-xl">
            <img src={img} alt={title} className="w-full h-56 object-cover rounded-lg mb-4 md:mb-0" />
            <div className="p-4 flex flex-col justify-between">
                <h1 className="font-semibold text-xl text-gray-800">{title}</h1>
                <p className="text-gray-600 my-4 line-clamp-3">{truncatedContent}</p>
                <CustomSmButton title="المزيد" func={() => navigate('/Article')} />
            </div>
        </div>
    )
}
