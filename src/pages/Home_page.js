import React from "react"
import Header from "../components/header"
import '../css/Home_page.css'

class Home_page extends React.Component{

    render() {
        return (<div>
            <Header title = "Главная страница" />
                <div class = "container">
                <blockquote class = "context"> 
                        <p>Ничто не мешает человеку завтра стать умнее, чем он был вчера</p>
                        <cite>(c) Капица С.П.</cite>
                </blockquote>
                <div class = "shaped"> </div>
                </div>
            </div>
        )
    }
}

export default Home_page