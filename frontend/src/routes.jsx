import Index from "./pages/Index/Index"
import CourseInfo from "./pages/CourseInfo/CourseInfo"
import Category from "./pages/Category/Category"
import ArticleInfo from "./pages/ArticleInfo/ArticleInfo"
import Courses from "./pages/Courses/Courses"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import Articles from "./pages/Articles/Articles"
import Contact from "./pages/Contact/Contact"
import AdminPanel from "./pages/AdminPanel"
import Users from "./pages/AdminPanel/Users/Users"
import CoursesAdmin from "./pages/AdminPanel/Courses/Courses"
import CategoryAdmin from "./pages/AdminPanel/category/CategoryAdmin"
import ContactsAdmin from "./pages/AdminPanel/contacts/ContactsAdmin"
import ArticlesAdmin from "./pages/AdminPanel/Articles/ArticlesAdmin"
import Sessions from "./pages/AdminPanel/sessions/Sessions"
import Menus from "./pages/AdminPanel/Menus/Menus"
import SubMenus from "./pages/AdminPanel/Menus/SubMenus"
import Comments from "./pages/AdminPanel/Comments/Comments"
import Discount from "./pages/AdminPanel/Discount/Discount"
import MainPage from "./pages/AdminPanel/MainPage/MainPage"
import Draft from "./pages/AdminPanel/Draft/Draft"
import IndexUser from "./pages/UserPanel/Index"
import IndexMainPage from "./pages/UserPanel/Index/Index"
import Orders from "./pages/UserPanel/Orders/Orders"
import SendTicket from "./pages/UserPanel/Tickets/SendTicket"
import UserCourses from "./pages/UserPanel/Courses/Courses"
import OrderInfo from "./pages/UserPanel/OrderInfo/OrderInfo"
import AllTickets from './pages/UserPanel/Tickets/AllTickets'
import AccountDetails from "./pages/UserPanel/AccountDetails/AccountDetails"

const routes = [
    { path: '/', element: <Index /> },
    { path: '/course-info/:courseName', element: <CourseInfo /> },
    { path: '/category-info/:categoryName', element: <Category /> },
    { path: '/article-info/:articleName', element: <ArticleInfo /> },
    { path: '/Courses', element: <Courses /> },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/articles', element: <Articles /> },
    { path: '/contact', element: <Contact /> },
    { path: '/admin', element: <AdminPanel />,
        children:[
            {path:'/admin', element:<MainPage/>},
            {path:'users',element:<Users/>},
            {path:'courses',element:<CoursesAdmin/>},
            {path:'categories',element:<CategoryAdmin/>},
            {path:'contacts',element:<ContactsAdmin/>},
            {path:'menus',element:<Menus/>},
            {path:'articles',element:<ArticlesAdmin/>},
            {path:'sessions',element:<Sessions/>},
            {path:'submenus',element:<SubMenus/>},
            {path:'comments',element:<Comments/>},
            {path:'offs',element:<Discount/>},
            {path:'articles/draft/:shortName',element:<Draft/>},
        ]
     },
     { path: '/user-p', element: <IndexUser/>,
        children:[
            {path:'/user-p', element:<IndexMainPage/>},
            {path:'orders', element:<Orders/>},
            {path:'tickets', element:<SendTicket/>},
            {path:'alltickets', element:<AllTickets/>},
            {path:'courses', element:<UserCourses/>},
            {path:'account-details', element:<AccountDetails/>},
            {path:'orders/order-detail/:id', element:<OrderInfo/>},
        ]
     },
]

export default routes
