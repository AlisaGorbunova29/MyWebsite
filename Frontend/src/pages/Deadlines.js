import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { ApiService } from "../services/ApiService";
import '../css/Deadline.css'

const Deadlines = () => {
  const [deadlines, setDeadlines] = useState([]);
  const [subject, setSubject] = useState("");
  const [deadline_date, setDeadline_date] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [change, setChange] = useState(0);
  const [showDeadlines, setShowDeadlines] = useState([]);

  const handleFilter = () => {
    setShowDeadlines(filterDeadlines());
  };

  const isAuth = Boolean(window.localStorage.getItem("access"));

  useEffect(() => {
    (async () => {
      if (isAuth) {
        const user = await ApiService(`user/current`);
        setDeadlines(user.deadline_set);
      }
    })();
  }, [change]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      subject,
      deadline_date,
    };

    await ApiService(`deadlines/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setSubject("");
    setDeadline_date("");
    setChange(change + 1);
  };

  const filterDeadlines = () => {
    return deadlines.filter((deadline) => {
      if (fromDate && toDate) {
        return (
          new Date(deadline.deadline_date) >= new Date(fromDate) &&
          new Date(deadline.deadline_date) <= new Date(toDate)
        );
      }
      return true;
    });
  };

  return (
    <>
      <Header title="Мои дедлайны" />
      <div className="deadline_form">
        <div className="left-column">
          <form className="form">
            <div>
              Дедлайны:
            </div>
            <div>
              <label htmlFor="fromDate">С:</label>
              <input
                type="date"
                id="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />

              <label htmlFor="toDate">По:</label>
              <input
                type="date"
                id="toDate"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            
            <div>
              <button type="button" id="show-button" onClick={handleFilter}>
                Показать
              </button>
            </div>
          </form>
        </div>
        <div className="right-column">
          <form className="form">
            <div>
              Добавить дедлайн:
            </div> 

            <div>
              <label htmlFor="subject">Предмет:</label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            
              <label htmlFor="deadline">Дедлайн:</label>
              <input
                type="date"
                id="deadline_date"
                value={deadline_date}
                onChange={(e) => setDeadline_date(e.target.value)}
              />
            </div>

            <div>
              <button type="submit" id="creat-button" onClick={handleSubmit}>
                Добавить
              </button>
            </div>
          
          </form>
        </div>
      </div>

        <ul>
          {showDeadlines.map((deadline) => (
            <li key={deadline.subject} className="text_deadline">
              {deadline.subject} - {deadline.deadline_date}
            </li>
          ))}
        </ul>
    </>
  );
};

export default Deadlines;
