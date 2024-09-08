import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './main/App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import MainProjectView from './main/content/projectsFolder/mainProjectView.tsx'
import ConnectDots from './main/content/projectsFolder/connectDots/connectDotsPage.tsx';
import CollectionScreen from './main/content/collectionScreen.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404 not found</div>
  }, 
  {
    path: '/collection',
    element: <CollectionScreen />
  },
  {
    path: '/projects', 
    element: <MainProjectView />
  },
  {
    path: '/connectDots',
    element: <ConnectDots />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
