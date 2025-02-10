import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import {Home , Login ,Signup,AddPost,EditPost ,NotificationForm,Notifications,Post ,NotificationPage} from './pages'
import {Protected} from './components'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/login",
            element: (
                <Protected authentication={false}>
                    <Login />
                </Protected>
            ),
        },
        {
            path: "/signup",
            element: (
                <Protected authentication={false}>
                    <Signup />
                </Protected>
            ),
        },
        {
            path: "/add-post",
            element: (
                <Protected authentication>
                    {" "}
                    <AddPost />
                </Protected>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <Protected authentication>
                    {" "}
                    <EditPost />
                </Protected>
            ),
        },
        {
            path: "/notifications",
            element: (
                <Protected authentication>
                    {" "}
                    <Notifications />
                </Protected>
            ),
        },
        {
            path: "/notifications/:id",
            element: (
                <Protected authentication>
                    {" "}
                    <NotificationPage />
                </Protected>
            ),
        },
        {
            path: "/post/:id",
            element: <Post />,
        },
    ],
},
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
    <Provider store={store} >
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
