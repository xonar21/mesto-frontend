import React from 'react';
import {useValidationCheck} from '../hooks/useValidationCheck';

function Login(props) {
    const {
        values,
        handleChange,
        errors
      } = useValidationCheck({});

    function handleSubmit(evt) {
        evt.preventDefault();
        props.auth(values)
    }
    

    return (
    <div className='login'>
        <h1 className='login__title'>
                Вход    
        </h1>
        <form 
        onSubmit={handleSubmit} 
        className='form' 
        noValidate>
            
            <label className="form__field">
                <input 
                onChange={handleChange} 
                value={values.email || ''} 
                name='email' minLength="10"  
                className='form__input form__input_login' 
                type='email' 
                required placeholder='Email'>
                </input>
                <span className="form__input-error form__input-error_name form__input-error_name-err" >{errors.email}</span>
            </label> 
            <label className="form__field">
                <input 
                onChange={handleChange} 
                value={values.password || ''} 
                name='password' 
                minLength="6" 
                className='form__input form__input_login' 
                type='password' required placeholder='Пароль'>
                </input>
                <span className="form__input-error form__input-error_subname form__input-error_subname-err">{errors.password}</span>
            </label>
            
            <button 
            type='submit' 
            className='form__button form__button_login'>Войти
            </button>
        </form>
    </div>
    )
    
}

export default Login