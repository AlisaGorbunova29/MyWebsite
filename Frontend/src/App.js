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
        window.location.reload();
    }
    return (
        <div>
            <div class="header">
                <div class="header-right">
                    <Link to ="/" class = "header_link">Главная страница</Link>
                    {isAuth && <Link to ="/deadlines" class = "header_link">Дедлайны</Link>}
                    {isAuth && <Link to ="/schedule" class = "header_link">Расписание</Link>}
                    {isAuth && <Link to ="/news" class = "header_link">Новости</Link>}
                    {isAuth ? <button onClick = {onLogout}>Выйти</button> : <Link to ="/login" class = "header_link">Войти</Link>}
                </div>
            </div>

            <Routes>
                <Route path="/" element={<Home_page/>}/>
                {isAuth && <Route path="/deadlines" element={<Deadlines/>}/>}
                {isAuth && <Route path="/schedule" element={<Schedule/>}/>}
                {isAuth && <Route path="/news" element={<News/>}/>}
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
    )
}

export default App
