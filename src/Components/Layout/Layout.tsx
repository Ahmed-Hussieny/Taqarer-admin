import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../../assets/Images/Vector.png';
import icon1 from '../../assets/Icons/DashBoard/icon1.png';
import icon2 from '../../assets/Icons/DashBoard/icon2.png';
import icon3 from '../../assets/Icons/DashBoard/icon3.png';
import icon4 from '../../assets/Icons/DashBoard/Setting_fill.svg';
import icon5 from '../../assets/Icons/DashBoard/Sign_out_squre_fill.svg';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../Store/store';
import { changeActiveNav } from '../../Store/user.slice';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentPath, activeNumber } = useSelector((state: { user: { currentPath: string; activeNumber: number } }) => state.user);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const changeNav = (num: number, e?: React.MouseEvent) => {
    e?.preventDefault(); // Prevent default navigation for <a> tags
    if (num === 1) navigate('/Dashboard');
    else if (num === 2) navigate('/Dashboard/evidences');
    else if (num === 3) navigate('/Dashboard/articls');
    else if (num === 4) navigate('/Dashboard/governmentals');
    else if (num === 5) navigate('/Dashboard/statistics');
    else if (num === 6) navigate('/Dashboard/subscriber-management');
    else if (num === 7) navigate('/Dashboard/Subscribtion');
    else if (num === 8) navigate('/Dashboard/settings');
    dispatch(changeActiveNav(num));
  };

  const logOut = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    if (localStorage.getItem('authToken') === null) {
      navigate('/');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 w-64 bg-[#CBE1C7] shadow-lg transform transition-transform duration-300 ease-in-out z-40
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0`}
      >
        <div className="p-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden mb-4 text-gray-600 float-left"
            title="Close Sidebar"
            aria-label="Close Sidebar"
          >
            <FiX size={24} />
          </button>

          <nav>
            <div className="flex justify-center relative py-1 mb-5">
              <img src={logo} alt="logo" />
            </div>

            <ul className="space-y-1">
              <NavItem icon={icon1} text="رفع التقارير" href="/#/Dashboard" index={1} activeNumber={activeNumber} onClick={(e) => changeNav(1, e)} />
              <NavItem icon={icon2} text="رفع الادلة المعرفية" href="/#/Dashboard/evidences" index={2} activeNumber={activeNumber} onClick={(e) => changeNav(2, e)} />
              <NavItem icon={icon3} text="رفع المقالات" href="/#/Dashboard/articls" index={3} activeNumber={activeNumber} onClick={(e) => changeNav(3, e)} />
              <NavItem icon={icon2} text="قائمة الجهات الحكومية" href="/#/Dashboard/governmentals" index={4} activeNumber={activeNumber} onClick={(e) => changeNav(4, e)} />
              <NavItem icon={icon3} text="إحصائيات المنصة" href="/#/Dashboard/statistics" index={5} activeNumber={activeNumber} onClick={(e) => changeNav(5, e)} />
              <NavItem icon={icon3} text="إدارة المشتركين" href="/#/Dashboard/subscriber-management" index={6} activeNumber={activeNumber} onClick={(e) => changeNav(6, e)} />
              <NavItem icon={icon3} text="الاشتركات" href="/#/Dashboard/Subscribtion" index={7} activeNumber={activeNumber} onClick={(e) => changeNav(7, e)} />
            </ul>

            <ul className="space-y-1 absolute bottom-3">
              <NavItem icon={icon4} text="الاعدادات" href="/Dashboard/settings" index={8} activeNumber={activeNumber} onClick={(e) => changeNav(8, e)} />
              <NavItem icon={icon5} text="تسجيل الخروج" onClick={logOut} index={9} activeNumber={activeNumber} />
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:mr-64 p-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="relative p-4 md:hidden z-30 text-gray-600 right-0"
            title="Open Sidebar"
            aria-label="Open Sidebar"
          >
            <FiMenu size={24} />
          </button>
          <h1 className="text-2xl font-medium text-right">{currentPath}</h1>
        </div>

        <div className="p-6 rounded-ladow border-t-2 text-right">
          <Outlet />
        </div>
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-30"
        />
      )}
    </div>
  );
};

// NavItem component
interface NavItemProps {
  icon: string;
  text: string;
  href?: string;
  index: number;
  activeNumber: number;
  onClick?: (e: React.MouseEvent) => void;
}

const NavItem = ({ icon, text, href, index, activeNumber, onClick }: NavItemProps) => (
  <li>
    <a
      href={href}
      onClick={onClick}
      className={`flex items-center p-3 text-black hover:bg-gray-100 rounded-lg ${
        index === activeNumber ? 'bg-[#3D963533]' : ''
      }`}
    >
      <img className="ml-3" src={icon} alt={icon} />
      <span className="text-right">{text}</span>
    </a>
  </li>
);

export default Layout;