
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { configStore } from './Store/store';
import Layout from './Components/Layout/Layout';
import Reports from './Pages/Reports/Reports';
import AddReports from './Pages/Reports/AddReports';
import AddReport from './Pages/Reports/AddReport';
import AddArticle from './Pages/Article/AddArticle';

// Lazy loading components
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element:<Layout />,
      children: [
        {
          path: '/',
          element: <Reports />,
        },
        {
          path: '/add-reports',
          element: <AddReports />,
        },
        {
          path: '/add-report',
          element: <AddReport />,
        },
        {
          path:"/add-article",
          element: <AddArticle />
        }
      ]
    }
  ]);

  return (
    <Provider store={configStore}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
