import React, { useState } from 'react';
import viewIcon from '../../assets/Icons/Articles/View.svg';
import editIcon from '../../assets/Icons/Articles/Edit_duotone_line.svg';
import deleteIcon from '../../assets/Icons/Articles/trash.svg';
import { Article } from '../../Interfaces/article';
import { useAppDispatch } from '../../Store/store';
import { handleDeleteArticle } from '../../Store/article.slice';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function ArticleItem({ article }: { article: Article }) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control modal visibility

    const deleteArticle = async () => {
        const data = await dispatch(handleDeleteArticle(article._id));
        if (data.payload.success) {
            toast.success('تم حذف المقال بنجاح');
        } else {
            toast.error(data.payload.message);
        }
        setShowDeleteModal(false); // Close the modal after deletion
    };

    return (
        <div className="bg-white rounded-lg shadow-lg">
            {/* Article Content */}
            <Toaster
            position="top-center"
            reverseOrder={false}
            />
            <div className="grid md:grid-cols-5 grid-cols-1">
                <div className="p-3 flex items-center justify-center">
                    <img
                        src={typeof article.image === 'string' ? article.image : URL.createObjectURL(article.image)}
                        alt="Article"
                        className="h-20 object-cover rounded-lg"
                    />
                </div>
                <div className="bg-opacity-10 p-3 rounded-lg md:col-span-4 col-span-1">
                    <h4 className="font-bold">{article.title}</h4>
                    <p className="text-[#3B3B3B] mt-3">{article.description}</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-3 grid-cols-1">
                <button
                    onClick={() => navigate(`/Dashboard/ShowArticle/${article._id}`)}
                    className="flex items-center justify-center px-4 py-2"
                >
                    <div className="bg-[#EAF7E8] w-full h-10 rounded-lg flex items-center justify-center gap-2">
                        <img src={viewIcon} alt="viewIcon" />
                        <p className="text-sm">اطلاع</p>
                    </div>
                </button>
                <button
                    onClick={() => navigate(`/Dashboard/edit-article/${article._id}`)}
                    className="flex items-center justify-center px-4 py-2"
                >
                    <div className="bg-[#F7F8F9] w-full h-10 rounded-lg flex items-center justify-center gap-2">
                        <img src={editIcon} alt="editIcon" />
                        <p className="text-sm">تعديل</p>
                    </div>
                </button>
                <button
                    onClick={() => setShowDeleteModal(true)} // Open the delete confirmation modal
                    className="flex items-center justify-center px-4 py-2"
                >
                    <div className="bg-[#FFF1F1] w-full h-10 rounded-lg flex items-center justify-center gap-2">
                        <img src={deleteIcon} alt="deleteIcon" />
                        <p className="text-sm">حذف</p>
                    </div>
                </button>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">تأكيد الحذف</h2>
                        <p className="mb-6">هل أنت متأكد أنك تريد حذف هذا المقال؟</p>
                        <div className="grid grid-cols-2 gap-2 space-x-4">
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                                onClick={() => setShowDeleteModal(false)} // Close the modal
                            >
                                إلغاء
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={deleteArticle} // Confirm deletion
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