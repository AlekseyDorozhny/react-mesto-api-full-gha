import React from "react";

function Login({onSubmit}) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  React.useEffect(() => {
    setEmail('')
    setPassword('')
 }, [])

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({email, password})
  }


  return (
    <div className="auth__container">
        <form className="auth__form" name="loginForm" method="post"
        onSubmit={handleSubmit}>
          <h2 className="auth__heading">Вход</h2>
          <label className="auth__field">
            <input type="email"
            className="auth__input login__input_type_email"
            id="email-login-input"
            placeholder="Email"
            name="emailLoginForm"
            required
            onChange={handleEmailChange}
            value={email}/>
            <span className="auth__error email-input-error"></span>
          </label>
          <label className="auth__field">
            <input type="password"
            className="auth__input login__input_type_password" id="password-login-input"
            placeholder="Пароль"
            name="passwordLoginForm"
            required
            onChange={handlePasswordChange}
            value={password}/>
            <span className="login__error password-input-error"></span>
          </label>
          <button type="submit" className="auth__save-button login__save-button_area_login" aria-label="войти">Войти</button>
        </form>
      </div>
)
}

export default Login;
