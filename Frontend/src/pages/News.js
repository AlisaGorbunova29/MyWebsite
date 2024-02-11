import React from "react"
import Header from "../components/header"
import { useState, useEffect } from "react";
import { ApiService } from "../services/ApiService";

const News = () => {
  const [newsline, setNewsLine] = useState([]);
  const [message, setMessage] = useState("");
  const [change, setChange] = useState(0);

  const isAuth = Boolean(window.localStorage.getItem("access"));
  
  useEffect(() => {
    (async () => {
      if (isAuth) {
        const values = await ApiService(`news/`);
        setNewsLine(values);
      }
    })();
  },[change]);

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isAuth) {
        const user = await ApiService(`user/current`);
        const user_first_name = user.first_name;
        const user_last_name = user.last_name;

        const data = {
            message,
            user_first_name,
            user_last_name,
        };
  
        await ApiService(`news/`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
  
        setMessage("");
        setChange(change + 1)
    }
    
  };

  return (
    <div>
      <Header title = "Новости" />
      <form>
        <label>Сообщение:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSubmit}>Добавить</button>
      </form>
      <ul>
        {newsline.map((news) => (
          <li key={news.user_first_name}>
            {news.user_first_name} {news.user_last_name}: {news.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;