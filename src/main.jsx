import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Equipments from './components/Equipments.jsx';
import Checkpoints from './components/Checkpoints.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Equipments/>,
  },
  {
    path: "/checkpoints/:id",
    element: <Checkpoints/>,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
