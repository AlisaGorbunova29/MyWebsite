import React, { useState, useEffect } from 'react';
import { ApiService } from '../services/ApiService';
import Header from "../components/header"
import '../css/Schedule.css'

const Schedule = () => {
    const initialSchedule = Array.from({ length: 8 }, () => Array(6).fill(' '));
    const [schedule, setSchedule] = useState(initialSchedule);
    const [day_of_week, setDayOfWeek] = useState("");
    const [class_number, setClassNumber] = useState("");
    const [subject, setSubject] = useState("");
    const [change, setChange] = useState(0);

    const isAuth = Boolean(window.localStorage.getItem('access'));

    const ChangeSchedule = async (event) => {
        event.preventDefault();

        const data = {
            day_of_week,
            class_number,
            subject,
          };
      
          await ApiService(`schedule/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
      
        setSubject("");
        setDayOfWeek("");
        setClassNumber("");
        setChange(change + 1);
    }

    useEffect(() => {
        (async () => {
            if (isAuth) {
                const user = await ApiService('user/current');
                const new_schedule = user.schedule_set;
                const updatedSchedule = Array.from({ length: 8 }, () => Array(5).fill(' '));
                new_schedule.forEach(item => {
                    updatedSchedule[item.class_number - 1][['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'].indexOf(item.day_of_week)] = item.subject;
                });
                setSchedule(updatedSchedule);
            }
        })();
    }, [change]);

    const getTimeForClass = (classNumber) => {
        switch(classNumber) {
            case 1:
                return "1| 9:00 - 10:25";
            case 2:
                return "2| 10:45 - 12:10";
            case 3:
                return "3| 12:20 - 13:45";
            case 4:
                return "4| 13:55 - 15:20";
            case 5:
                return "5| 15:30 - 16:55";
            case 6:
                return "6| 17:05 - 18:30";
            case 7:
                return "7| 18:35 - 20:00";
            case 8:
                return "8| 20:05 - 21:30";
            default:
                return "";
        }
    };

    return (
        <div>
            <Header title = "Расписание" />
            <form className="schedule_form">
                Добавить предмет:
                <div>
                    <label>День недели: </label>
                    <select
                        value={day_of_week} 
                        onChange={(event) => setDayOfWeek(event.target.value)}
                    >
                        <option value="">Выберите день недели</option>
                        <option value="Понедельник">Понедельник</option>
                        <option value="Вторник">Вторник</option>
                        <option value="Среда">Среда</option>
                        <option value="Четверг">Четверг</option>
                        <option value="Пятница">Пятница</option>
                    </select>
                
                    <label className="schedule_form_label">Номер пары: </label>
                    <select
                        value={class_number} 
                        onChange={(event) => setClassNumber(event.target.value)}
                    >
                        <option value="">Выберите пару</option>
                        <option value="1">{getTimeForClass(1)}</option>
                        <option value="2">{getTimeForClass(2)}</option>
                        <option value="3">{getTimeForClass(3)}</option>
                        <option value="4">{getTimeForClass(4)}</option>
                        <option value="5">{getTimeForClass(5)}</option>
                        <option value="6">{getTimeForClass(6)}</option>
                        <option value="7">{getTimeForClass(7)}</option>
                        <option value="8">{getTimeForClass(8)}</option>
                    </select>
                
                    <label className="schedule_form_label">Предмет: </label>
                    <input
                        value={subject} 
                        onChange={(event) => setSubject(event.target.value)}
                    />
                </div>
                <div>
                    <button onClick={ChangeSchedule}>Добавить</button>
                </div>
            </form>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Понедельник</th>
                        <th>Вторник</th>
                        <th>Среда</th>
                        <th>Четверг</th>
                        <th>Пятница</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((row, index) => (
                        <tr key={index}>
                            <td>{getTimeForClass(index + 1)}</td>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Schedule;
