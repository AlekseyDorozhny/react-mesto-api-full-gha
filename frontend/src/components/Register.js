import React from "react";
import { NavLink } from 'react-router-dom';

function Register({onSubmit}) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({email, password});
  }

  return (
    <div className="auth__container">
      <form className="auth__form" name="loginForm"
      onSubmit={handleSubmit}>
        <h2 className="auth__heading">Регистрация</h2>
        <label className="auth__field">
          <input type="email"
          className="auth__input register__input_type_email" id="email-register-input"
          placeholder="Email"
          name="emailRegisterForm"
          required
          onChange={handleEmailChange}
          value={email}/>
          <span className="auth__error email-input-error"></span>
        </label>
        <label className="auth__field">
          <input type="password"
          className="auth__input register__input_type_password" id="password-register-input"
          placeholder="Пароль"
          name="passwordRegisterForm"
          required
          onChange={handlePasswordChange}
          value={password}/>
          <span className="login__error password-input-error"></span>
        </label>
        <button type="submit" className="auth__save-button login__save-button_area_login" aria-label="войти">Зарегистрироваться</button>
      </form>
      <NavLink to='/sign-in' className="auth__subtitle">Уже зарегистрированы? Войти</NavLink>
    </div>
)
}

export default Register;

