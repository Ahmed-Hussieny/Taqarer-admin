import { useState, FormEvent, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useAppDispatch } from '../../Store/store';
import { changeActiveNav, changeCurrentPath, HandleUpdateLoggedInPassword, HandleUpdateLoggedInUser } from '../../Store/user.slice';

interface UserProfile {
    username: string;
  email: string;
  avatar?: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const SettingsPage = () => {
  // Profile state
  const [profile, setProfile] = useState<UserProfile>({
    username: '',
    email: '',
    avatar: ''
  });
  
  // Password state
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Loading states
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  // Handle profile update
  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingProfile(true);
    
    try {
    //   await axios.put('/api/update-profile', profile);
    const data = await dispatch(HandleUpdateLoggedInUser({
        username: profile.username,
        email: profile.email
    }))
    if(data.payload.success){
        toast.success('تم تحديث الملف الشخصي بنجاح!');
    }else{
        toast.error(data.payload.message);
    }
      
    } catch {
      toast.error('فشل في تحديث الملف. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoadingProfile(false);
    }
  };

  // Handle password update
  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingPassword(true);
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('كلمات المرور الجديدة غير متطابقة');
      setLoadingPassword(false);
      return;
    }

    try {
      const data = await dispatch(HandleUpdateLoggedInPassword({
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }))
      if(data.payload.success){
        toast.success('تم تحديث كلمة المرور بنجاح!');
      }else{
        toast.error(data.payload.message);
        return
      }
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch {
      toast.error('فشل في تحديث كلمة المرور. يرجى التحقق من كلمة المرور الحالية.');
    } finally {
      setLoadingPassword(false);
    }
  };

  const dispatch = useAppDispatch();
    useEffect(()=>{
      dispatch(changeCurrentPath('الاعدادات'));
      dispatch(changeActiveNav(8));
    },[]);

  return (
    <div className=" " dir="rtl">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="max-w-2xl mx-auto px-4 space-y-8">
        {/* Profile Update Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">إعدادات الملف الشخصي</h2>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 text-right">الاسم</label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => setProfile({...profile, username: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right"
                required
                placeholder="أدخل اسمك"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 text-right">البريد الإلكتروني</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right"
                required
                title="البريد الإلكتروني"
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>

            <button
              type="submit"
              disabled={loadingProfile}
              className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-main_color hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loadingProfile ? 'جاري الحفظ...' : 'حفظ التعديلات'}
            </button>
          </form>
        </div>

        {/* Password Update Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">تغيير كلمة المرور</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 text-right">كلمة المرور الحالية</label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right"
                required
                title="كلمة المرور الحالية"
                placeholder="أدخل كلمة المرور الحالية"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 text-right">كلمة المرور الجديدة</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right"
                required
                title="كلمة المرور الجديدة"
                placeholder="أدخل كلمة المرور الجديدة"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 text-right">تأكيد كلمة المرور الجديدة</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right"
                required
                title="تأكيد كلمة المرور الجديدة"
                placeholder="أدخل تأكيد كلمة المرور الجديدة"
              />
            </div>

            <button
              type="submit"
              disabled={loadingPassword}
              className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-main_color hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loadingPassword ? 'جاري التحديث...' : 'تغيير كلمة المرور'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;