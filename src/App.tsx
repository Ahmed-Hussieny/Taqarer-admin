import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configStore } from './Store/store';
import { Suspense, lazy } from 'react';
import './App.css';

const Login = lazy(() => import('./Pages/Auth/Login'));
const ForgotPassword = lazy(() => import('./Pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./Pages/Auth/ResetPassword'));
const Layout = lazy(() => import('./Components/Layout/Layout'));
const Reports = lazy(() => import('./Pages/Reports/Reports'));
const AddReports = lazy(() => import('./Pages/Reports/AddReports'));
const AddReport = lazy(() => import('./Pages/Reports/AddReport'));
const UpdateReport = lazy(() => import('./Pages/Reports/UpdateReport'));
const Evidences = lazy(() => import('./Pages/Evidences/Evidences'));
const AddEvidences = lazy(() => import('./Pages/Evidences/AddEvidences'));
const AddEvidence = lazy(() => import('./Pages/Evidences/AddEvidence'));
const UpdateEvidence = lazy(() => import('./Pages/Evidences/UpdateEvidence'));
const Articles = lazy(() => import('./Pages/Article/Articles'));
const AddArticle = lazy(() => import('./Pages/Article/AddArticle'));
const ShowArticle = lazy(() => import('./Pages/Article/ShowArticle'));
const UpdateArticle = lazy(() => import('./Pages/Article/UpdateArticle'));
const Governmentals = lazy(() => import('./Pages/Governmentals/Governmentals'));
const AddGovernmentals = lazy(() => import('./Pages/Governmentals/AddGovernmentals'));
const UpdateGovernmental = lazy(() => import('./Pages/Governmentals/UpdateGovernmental'));
const AddGovernmental = lazy(() => import('./Pages/Governmentals/AddGovernmental'));
const SettingsPage = lazy(() => import('./Pages/Settings/Settings'));
const Statistics = lazy(() => import('./Pages/Statistics/Statistics'));
const SubscriberManagement = lazy(() => import('./Pages/SubscriberManagement/SubscriberManagement'));

const Loading = () => <div>Loading...</div>;

function App() {
  const router = createHashRouter([
    {
      path: '/',
      element: <Suspense fallback={<Loading />}><Login /></Suspense>,
    },
    {
      path: '/forgot-password',
      element: <Suspense fallback={<Loading />}><ForgotPassword /></Suspense>,
    },
    {
      path: '/reset-password/:token',
      element: <Suspense fallback={<Loading />}><ResetPassword /></Suspense>,
    },
    {
      path: '/Dashboard',
      element: <Suspense fallback={<Loading />}><Layout /></Suspense>,
      children: [
        { index: true, element: <Suspense fallback={<Loading />}><Reports /></Suspense> },
        { path: '/Dashboard/add-reports', element: <Suspense fallback={<Loading />}><AddReports /></Suspense> },
        { path: '/Dashboard/add-report', element: <Suspense fallback={<Loading />}><AddReport /></Suspense> },
        { path: '/Dashboard/edit-report/:reportId', element: <Suspense fallback={<Loading />}><UpdateReport /></Suspense> },
        { path: '/Dashboard/evidences', element: <Suspense fallback={<Loading />}><Evidences /></Suspense> },
        { path: '/Dashboard/add-evidences', element: <Suspense fallback={<Loading />}><AddEvidences /></Suspense> },
        { path: '/Dashboard/add-evidence', element: <Suspense fallback={<Loading />}><AddEvidence /></Suspense> },
        { path: '/Dashboard/edit-evidence/:reportId', element: <Suspense fallback={<Loading />}><UpdateEvidence /></Suspense> },
        { path: '/Dashboard/articls', element: <Suspense fallback={<Loading />}><Articles /></Suspense> },
        { path: '/Dashboard/add-article', element: <Suspense fallback={<Loading />}><AddArticle /></Suspense> },
        { path: '/Dashboard/edit-article/:articleId', element: <Suspense fallback={<Loading />}><UpdateArticle /></Suspense> },
        { path: '/Dashboard/ShowArticle/:articleId', element: <Suspense fallback={<Loading />}><ShowArticle /></Suspense> },
        { path: '/Dashboard/governmentals', element: <Suspense fallback={<Loading />}><Governmentals /></Suspense> },
        { path: '/Dashboard/add-governmentals', element: <Suspense fallback={<Loading />}><AddGovernmentals /></Suspense> },
        { path: '/Dashboard/edit-governmental/:governmentalId', element: <Suspense fallback={<Loading />}><UpdateGovernmental /></Suspense> },
        { path: '/Dashboard/add-governmental', element: <Suspense fallback={<Loading />}><AddGovernmental /></Suspense> },
        { path: '/Dashboard/settings', element: <Suspense fallback={<Loading />}><SettingsPage /></Suspense> },
        { path: '/Dashboard/statistics', element: <Suspense fallback={<Loading />}><Statistics /></Suspense> },
        { path: '/Dashboard/subscriber-management', element: <Suspense fallback={<Loading />}><SubscriberManagement /></Suspense> },
        { path: '/Dashboard/*', element: <div>Not Found</div> },
      ],
    },
  ]);

  return (
    <Provider store={configStore}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
