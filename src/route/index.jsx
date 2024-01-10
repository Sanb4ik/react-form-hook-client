import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import CreatePage from '../pages/create/create.jsx';
import Edit from '../pages/edit/edit.jsx';

export const router = createBrowserRouter([
  {
    path: 'projects',
    element: <App />,
  },
  {
    path: 'projects/edit/:id',
    element: <Edit />,
  },
  {
    path: 'create',
    element: <CreatePage />,
  },
]);
