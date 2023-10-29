import React from "react"
import Home_page from "./pages/Home_page"
import Deadlines from "./pages/Deadlines"
import Schedule from "./pages/Schedule"
import Rating from "./pages/Rating"
import {Routes, Route, Link} from "react-router-dom"

class App extends React.Component{
    render() {
        return (
            <div>
                <div class="header">

                    <div class="header-right">
                    <Link to ="/" class = "header_link">Главная страница</Link>
                    <Link to ="/deadlines" class = "header_link">Дедлайны</Link>
                    <Link to ="/schedule" class = "header_link">Расписание</Link>
                    <Link to ="/rating" class = "header_link">Успеваемость</Link>
                    </div>
                </div>

                <Routes>
                    <Route path="/" element={<Home_page/>}/>
                    <Route path="/deadlines" element={<Deadlines/>}/>
                    <Route path="/schedule" element={<Schedule/>}/>
                    <Route path="/rating" element={<Rating/>}/>
                </Routes>
            </div>
        )
    }
}

export default App
