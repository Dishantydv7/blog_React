import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Protector from './components/AuthLayout.jsx'
import Login from './components/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Posts.jsx'
import Home from './pages/Home.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: (
          <Protector authentication={false}>
            <Login />
          </Protector>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protector authentication={false}>
            <Signup />
          </Protector>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <Protector authentication>
            {" "}
            <AllPost />
          </Protector>
        ),
      },
      {
        path: "/add-post",
        element: (
          <Protector authentication>
            {" "}
            <AddPost />
          </Protector>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protector authentication>
            {" "}
            <EditPost />
          </Protector>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
