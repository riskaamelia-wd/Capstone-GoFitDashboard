import { useState } from "react";

function TextFieldPassword({
  placeholder,
  label,
  id,
  name,
  value,
  onChange,
  classNameLabel,
}) {
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <>
      <label htmlFor={label} className={classNameLabel}>
        {label}
      </label>
      <div className="input-group rounded borderPassword col-12">
        <input
          type={passwordType}
          onChange={onChange}
          value={value}
          name={name}
          id={id}
          className="form-control pointer"
          placeholder={placeholder}
        />
        <div className="input-group-btn">
          <button className="btn pointer" onClick={togglePassword}>
            {passwordType === "password" ? (
              <i className="bi bi-eye-slash"></i>
            ) : (
              <i className="bi bi-eye"></i>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
export default TextFieldPassword;

/*
penggunaan

    - JSX -

const [passwordInput, setPasswordInput] = useState("");
const handlePasswordChange =(evnt)=>{
    setPasswordInput(evnt.target.value);
}


<TextFieldPassword
    label='password'
    placeholder='password'
    name='password'
    id='password'
    value={passwordInput}
    onChange={handlePasswordChange}
    />
*/
