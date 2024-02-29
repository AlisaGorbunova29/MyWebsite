import React from "react"
import Home_page from "./pages/Home_page"
import Deadlines from "./pages/Deadlines"
import Schedule from "./pages/Schedule"
import News from "./pages/News"
import Login from "./pages/Login"
import {Routes, Route, Link} from "react-router-dom"

function App(){
    const isAuth = Boolean(window.localStorage.getItem('access'))

    const onLogout = () => {
        window.localStorage.removeItem('access');
        window.localStorage.removeItem('refresh');
        window.location.href = "/";
    }
    return (
        <div>
            <div class="header">
                <div>
                    {isAuth ? <Link to="/" onClick = {onLogout} class = "header_link">Выйти</Link> : <Link to ="/" class = "header_link">Войти</Link>}    
                    {isAuth && <Link to ="/home" class = "header_link">Главная страница</Link>}
                    {isAuth && <Link to ="/deadlines" class = "header_link">Дедлайны</Link>}
                    {isAuth && <Link to ="/schedule" class = "header_link">Расписание</Link>}
                    {isAuth && <Link to ="/news" class = "header_link">Новости</Link>}
                    
                </div>
            </div>

            <Routes>
                {isAuth && <Route path="/home" element={<Home_page/>}/>}
                {isAuth && <Route path="/deadlines" element={<Deadlines/>}/>}
                {isAuth && <Route path="/schedule" element={<Schedule/>}/>}
                {isAuth && <Route path="/news" element={<News/>}/>}
                <Route path="/" element={<Login/>}/>
            </Routes>
        </div>
    )
}

export default App
