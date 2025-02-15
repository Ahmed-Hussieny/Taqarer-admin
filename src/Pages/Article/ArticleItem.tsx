import viewIcon from '../../assets/Icons/Articles/View.svg';
import editIcon from '../../assets/Icons/Articles/Edit_duotone_line.svg';
import deleteIcon from '../../assets/Icons/Articles/trash.svg';
import { Article } from '../../Interfaces/article';
import { useAppDispatch } from '../../Store/store';
import { handleDeleteArticle } from '../../Store/article.slice';
import { useNavigate } from 'react-router-dom';

export default function ArticleItem({article}: {article: Article}) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const deleteArticle = async () => {
        const data = await dispatch(handleDeleteArticle(article._id));
        console.log(data);
    };
    
    return (
        <div className="bg-white rounded-lg shadow-lg ">
            <div className="grid md:grid-cols-5 grid-cols-1">
                <div className='p-3 flex items-center justify-center'>
                    <img src={typeof article.image === 'string' ? article.image : URL.createObjectURL(article.image)} alt="Article" className="h-20  object-cover rounded-lg" />
                </div>
                <div className="bg-opacity-10 p-3 rounded-lg md:col-span-4 col-span-1">
                    <h4 className='font-bold'>{article.title}</h4>
                    <p className='text-[#3B3B3B] mt-3'>
                    {article.description}
                    </p>
                </div>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 ">
                <button onClick={()=>navigate(`/Dashboard/ShowArticle/${article._id}`)} className='flex items-center justify-center px-4 py-2 '>
                    <div className='bg-[#EAF7E8] w-full h-10 rounded-lg flex items-center justify-center gap-2'>
                        <img src={viewIcon} alt='viewIcon' />
                        <p className='text-sm'>اطلاع</p>
                    </div>
                </button>
                <button onClick={()=>navigate(`/Dashboard/edit-article/${article._id}`)} className='flex items-center justify-center px-4 py-2 '>
                    <div className='bg-[#F7F8F9] w-full h-10 rounded-lg flex items-center justify-center gap-2'>
                        <img src={editIcon} alt='editIcon' />
                        <p className='text-sm'>تعديل</p>
                    </div>
                </button>
                <button className='flex items-center justify-center px-4 py-2 '>
                    <div onClick={deleteArticle} className='bg-[#FFF1F1] w-full h-10 rounded-lg flex items-center justify-center gap-2'>
                        <img src={deleteIcon} alt='deleteIcon' />
                        <p className='text-sm'>حذف</p>
                    </div>
                </button>

            </div>
        </div>
    )
}
