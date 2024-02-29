import React from "react"
import Header from "../components/header"
import '../css/Home_page.css'
import {useState, useEffect} from "react"
import { ApiService } from "../services/ApiService"

const Home_page = () => {
    const [user, setUser] = useState("")

    const isAuth = Boolean(window.localStorage.getItem('access'));

    useEffect(() => {
        (async () => {
          if (isAuth) {
            const date = await ApiService(`user/current`);
            setUser(date);
          }
        })();
      }, []);

        return (<div>
            <Header title = "Главная страница" />
                <div class = "container">
                    <blockquote class = "context"> 
                        <p>Ничто не мешает человеку завтра стать умнее, чем он был вчера</p>
                        <cite>(c) Капица С.П.</cite>
                    </blockquote>
                    <div class = "shaped">
                        <img src={`http://127.0.0.1:8000//${user.avatar}`} className = "image"/>
                    </div>
                </div>
            </div>
        )
}

export default Home_page