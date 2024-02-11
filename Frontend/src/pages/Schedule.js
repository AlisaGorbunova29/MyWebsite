import React, { useState, useEffect } from 'react';
import { ApiService } from '../services/ApiService';

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
                const updatedSchedule = Array.from({ length: 8 }, () => Array(6).fill(' '));
                new_schedule.forEach(item => {
                    updatedSchedule[item.class_number - 1][['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'].indexOf(item.day_of_week)] = item.subject;
                });
                setSchedule(updatedSchedule);
            }
        })();
    }, [change]);

    return (
        <div>
            <form>
                <div>
                    <label>День недели: </label>
                    <input 
                        value={day_of_week} 
                        onChange={(event) => setDayOfWeek(event.target.value)}
                    />
                </div>
                <div>
                    <label>Номер пары: </label>
                    <input
                        value={class_number} 
                        onChange={(event) => setClassNumber(event.target.value)}
                    />
                </div>
                <div>
                    <label>Предмет: </label>
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
                            <td>{index + 1}</td>
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
