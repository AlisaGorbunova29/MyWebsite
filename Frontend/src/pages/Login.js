import React from "react"
import Header from "../components/header"
import { useState } from "react";
import { ApiService } from "../services/ApiService";
import '../css/Login.css'

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isRegistrFrom, setIsReginstrForm] = useState(false);
  const [error, setError] = useState(false);

  const onAuth = async (event) => {
    event.preventDefault();
    setError(false);

    window.localStorage.removeItem("access");
    window.localStorage.removeItem("refresh");


    const {access, refresh} = await ApiService(`token/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: login, password }),
    });

    if (access === undefined) {
      setError(true);
      setLogin("");
      setPassword("");
    } else {
      window.localStorage.setItem('access', access);
      window.localStorage.setItem('refresh', refresh);
      window.location.href= '/home';
    }
  };

  const onRegistr = async (event) => {
    setError(false);
    const formData = new FormData();
    formData.append("username", login);
    formData.append("password", password);
    formData.append("avatar", avatar);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);

    await ApiService(`user/`, {
      method: "POST",
      body: formData,
    });

    await onAuth(event);

  }

  const handleChangeAvatar = (event) => {
    setAvatar(event.target.files[0]);
  };



  return (
    <div>
      <Header title = "Авторизация" />
      <div className="login">
        <form onSubmit={(event) => event.preventDefault()} className="login_form">
          {error && !isRegistrFrom && <label className="error">Неправильно введён логин или пароль. Попробуйте ещё раз.</label>}
          {isRegistrFrom && <div>
              <label>Имя: </label>
              <input 
                  value={first_name} 
                  onChange={(event) => setFirst_name(event.target.value)}/>
          </div>}
          {isRegistrFrom && <div>
              <label>Фамилия: </label>
              <input 
                  value={last_name} 
                  onChange={(event) => setLast_name(event.target.value)}/>
          </div>}
          <div>
              <label>Логин: </label>
              <input 
                  value={login} 
                  onChange={(event) => setLogin(event.target.value)}/>
          </div>
          <div>
              <label>Пароль: </label>
              <input 
                  type="password"
                  value={password} 
                  onChange={(event) => setPassword(event.target.value)}/>
          </div>
          {isRegistrFrom && <div>
              <label>Аватарка: </label>
              <input type="file" onChange={handleChangeAvatar}/>
          </div>}
          
            <div>
              <button onClick={isRegistrFrom ? () => setIsReginstrForm(false) : onAuth}>Авторизация</button>
            </div>
            <div>
              <button onClick={isRegistrFrom ? onRegistr : () => {setIsReginstrForm(true); setError(false)}}>Зарегистрироваться</button>
            </div>
          
        </form>
      </div>
    </div>
  );
};

export default Login;