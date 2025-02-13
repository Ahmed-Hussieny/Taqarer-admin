import { useState } from 'react';
import { FiMenu, FiX, FiBell} from 'react-icons/fi';
import { Outlet } from 'react-router-dom';
import logo from '../../assets/Images/Vector.png'
import icon1 from '../../assets/Icons/DashBoard/icon1.png'
import icon2 from '../../assets/Icons/DashBoard/icon2.png'
import icon3 from '../../assets/Icons/DashBoard/icon3.png'
const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="relative p-4 md:hidden z-30 text-gray-600 right-0"
        title="Open Sidebar"
        aria-label="Open Sidebar"
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 w-64 bg-[#CBE1C7]  shadow-lg transform transition-transform duration-300 ease-in-out z-40
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
            <div className='flex justify-center relative py-1 mb-5'>
                <img  src={logo} alt='logo'/>
            </div>
            
            <ul className="space-y-2">
              <NavItem icon={icon1} text="رفع التقارير" />
              <NavItem icon={icon2} text="رفع الادلة المعرفية" />
              <NavItem icon={icon3} text="رفع المقالات" />
              <NavItem icon={icon2} text="قائمة الجهات الحكومية" />
              <NavItem icon={icon3} text="إحصائيات المنصة" />
            </ul>

            <ul className="space-y-2 absolute bottom-10">
              <NavItem icon={icon1} text="الاعدادات" />
              <NavItem icon={icon2} text="تسجيل الخروج" />
            </ul>
          </nav>
        </div>
      </aside>

      {/* Notification Panel */}
      <div
        className={`fixed inset-y-0 left-0 w-80 bg-[#CBE1C7] shadow-lg transform transition-transform duration-300 ease-in-out z-40
          ${isNoticeOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-right">الإشعارات</h2>
            <button
              onClick={() => setIsNoticeOpen(false)}
              className="text-gray-600"
              title="Close Notifications"
              aria-label="Close Notifications"
            >
              <FiX size={24} />
            </button>
          </div>
          <div className="space-y-4">
            <NotificationItem text="رسالة جديدة Received" time="منذ ساعتين" />
            <NotificationItem text="تحديث النظام متاح" time="منذ 4 ساعات" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="md:mr-64 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-right">لوحة التحكم</h1>
          <button
            onClick={() => setIsNoticeOpen(true)}
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg"
            title="Open Notifications"
            aria-label="Open Notifications"
          >
            <FiBell size={24} />
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow text-right">
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
}

const NavItem = ({ icon, text }: NavItemProps) => (
  <li>
    <a
      href="#"
      className="flex items-center p-3 text-black hover:bg-gray-100 rounded-lg"
    >
      <img className='ml-3' src={icon} alt={icon}/>
      <span className="text-right">{text}</span>
    </a>
  </li>
);

// NotificationItem component
interface NotificationItemProps {
  text: string;
  time: string;
}

const NotificationItem = ({ text, time }: NotificationItemProps) => (
  <div className="p-3 bg-gray-50 rounded-lg text-right">
    <p className="text-gray-600">{text}</p>
    <p className="text-sm text-gray-400">{time}</p>
  </div>
);

export default Layout;