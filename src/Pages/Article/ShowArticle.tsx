import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../Store/store';
import { changeActiveNav, changeCurrentPath } from '../../Store/user.slice';
import { handleGetArticle } from '../../Store/article.slice';
import 'react-quill/dist/quill.snow.css';
import linkIcon from '../../assets/Icons/DashBoard/Frame 1261153292.svg';

const ShowArticle: React.FC = () => {
  const { articleId } = useParams();
  const dispatch = useAppDispatch();
  const [articleData, setArticleData] = useState<{ image?: string; title: string; description: string; link:string, content: string } | null>(null);

  const fetchArticle = async () => {
    if (articleId) {
      const response = await dispatch(handleGetArticle(articleId));
      const article = response.payload.article;
      if (article) {
        setArticleData({
          image: article.image,
          title: article.title,
          description: article.description,
          content: article.content,
          link: article.link
        });
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchArticle();
    dispatch(changeCurrentPath('عرض المقالة'));
    dispatch(changeActiveNav(3));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {articleData && (
        <>
          {articleData.image && (
            <img src={articleData.image} alt="Article" className="w-ful h-64 object-cover m-auto rounded-md mb-4" />
          )}
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{articleData.title}</h1>
          <p className="text-gray-600 mb-4">{articleData.description}</p>
          <div className="prose max-w-full" dangerouslySetInnerHTML={{ __html: articleData.content }} />
          <button className="bg-main_color flex items-center text-white px-4 py-2 rounded-lg mt-4" onClick={() => {
            window.open(articleData.link, '_blank');
          }}>
          <img src={linkIcon} alt='linkIcon'/>
          قراءة التقرير
          
          </button>
        </>
      )}
    </div>
  );
};

export default ShowArticle;
