import { useNavigate } from "react-router-dom"
import CustomSmButton from "./CustomSmButton"

export default function MainArticle({ title, content, img }: {
    title: string,
    content: string,
    img: string
}) {
    const navigate = useNavigate();
    return (
        <div>
            <img src={img} className="w-full" alt={title} />
            <div className="p-4">
                <h1 className="font-bold text-lg ">{title}</h1>
                <p>{content}</p>
            </div>
            <CustomSmButton title="المزيد" func={() => navigate('/Article')} />
        </div>
    )
}
