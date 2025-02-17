import plus2 from '../../assets/Icons/DashBoard/plus2.svg'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Store/store';
import { changeActiveNav, changeCurrentPath } from '../../Store/user.slice';
import { useEffect, useState } from 'react';
import ArticleItem from './ArticleItem';
import { handleGetAllArticles } from '../../Store/article.slice';
import { Article } from '../../Interfaces/article';
import { useSelector } from 'react-redux';

export default function Articles() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { articles, numberOfPages } = useSelector((state: { articles: { articles: Article[], numberOfPages: number } }) => state.articles);


  const fetchData = async ({
    page = 1,
    title = ''
  }: { page?: number, title?: string }) => {
    await dispatch(handleGetAllArticles({ page, title }));
  };
  const handleKeyUp = (event: React.ChangeEvent<HTMLInputElement>) => {
    fetchData({ title: (event.target as HTMLInputElement).value });
  };

  const changeCurrentPage = (page: number) => {
    setCurrentPage(page);
    fetchData({ page });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData({ page: 1 });
    dispatch(changeCurrentPath('رفع المقالات'));
    dispatch(changeActiveNav(3));
  }, []);

  return (
    <div>
      {/* Items per page selector */}
      <div className='grid md:grid-cols-3 grid-cols-1 mb-4 gap-2'>
        {/* Left Section - Search & Pagination */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-lg">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-lg font-medium text-black whitespace-nowrap">المقالات</span>

          </div>
        </div>

        {/* Right Section - Filters & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 gap-3 rounded-lg">
          <div className="flex col-span- items-center md:justify-start w-auto justify-center">
            <form className="flex-1">
              <div className="relative shadow-lg rounded-lg">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                  <svg className="w-5 h-5 text-main_color" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="ps-10 w-full text-sm text-main_color placeholder:text-main_color border border-gray-300 rounded-lg bg-[#F7F8F9] py-2.5"
                  placeholder="البحث عن مقالة"
                  onChange={handleKeyUp}
                />
              </div>
            </form>
          </div>
          <div className="flex col-span- items-center md:justify-end pb-3 sm:pb-4 justify-center gap-2">
            <button
              onClick={() => navigate('/Dashboard/add-article')}
              className="text-white md:w-auto md:px-9 w-full text-sm flex justify-center items-center gap-1 rounded-lg py-2 hover:bg-green-600 bg-[#3D9635] transition-colors"
              title="اضافة مقالة"
            >
              <img src={plus2} alt='plus2' className="w-4 h-4" />
              <span className=' sm:inline pe-2'>اضافة مقالة</span>
            </button>
          </div>
        </div>
      </div>
      {/* <EvidencesTable /> */}
      <div className='grid gap-5 md:grid-cols-2 grid-cols-1'>
        {articles?.map((article: Article) => {
          return <ArticleItem key={article._id} article={article} />;
        })}
      </div>
      <div className="flex justify-center items-center mt-8 mb-4" dir="rtl">
        {/* Next Button (left side in RTL) */}

        <button
          onClick={() => changeCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-[#BBC3CF]  text-black hover:bg-gray-100 rounded-s-lg disabled:opacity-50"
          aria-label="الصفحة السابقة"
        >
          &lt; {/* Right-pointing arrow for "Previous" in RTL */}
        </button>
        {/* Page Numbers (descending order) */}
        {[...Array(numberOfPages)].map((_, index) => {
          return (
            <button
              key={index + 1}
              onClick={() => changeCurrentPage(index + 1)}
              className={`px-3 py-1 flex items-center justify-center ${currentPage === index + 1
                  ? 'bg-[#BBC3CF]  text-black border'
                  : 'text-black bg-[#F7F8F9] border border-1/2 border-slate-300'
                }`}
              aria-label={`الصفحة ${index + 1}`}
            >
              <span>{index + 1}</span>
            </button>
          );
        })}

        {/* Previous Button (right side in RTL) */}
        <button
          onClick={() => changeCurrentPage(Math.min(numberOfPages, currentPage + 1))}
          disabled={currentPage === numberOfPages}
          className="px-3 py-1 bg-[#BBC3CF]  text-black hover:bg-gray-100 rounded-l-lg disabled:opacity-50"
          aria-label="الصفحة التالية"
        >
          &gt; {/* Left-pointing arrow for "Next" in RTL */}
        </button>
      </div>
    </div>
  )
}
