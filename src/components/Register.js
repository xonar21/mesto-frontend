import React from 'react';
import { Link } from 'react-router-dom';
import {useValidationCheck} from '../hooks/useValidationCheck';

function Register(props) {
    const {
        values,
        handleChange,
        errors
      } = useValidationCheck({});

      function handleSubmit(evt) {
        evt.preventDefault();
        props.reg(values)
    }

    return (
    <div className='login'>
        <h1 className='login__title'>
            Регистрация    
        </h1>  
        <form 
        onSubmit={handleSubmit} 
        className='form' 
        noValidate>
            <label className="form__field">
                <input 
                className='form__input form__input_login' 
                onChange={handleChange} 
                value={values.email || ''} 
                minLength="10" 
                name='email' 
                type='email' 
                placeholder='Email'>
                </input>
                <span className="form__input-error form__input-error_name form__input-error_name-err" >{errors.email}</span>
            </label>
            <label className="form__field">
                <input 
                className='form__input form__input_login' 
                onChange={handleChange} 
                value={values.password || ''} 
                minLength="6" name='password' 
                type='password' 
                placeholder='Пароль'>
                </input>
                <span className="form__input-error form__input-error_subname form__input-error_subname-err">{errors.password}</span>
            </label>
            <button type='submit' className='form__button form__button_login'>Зарегистрироваться</button>
        </form>
        <Link to="/sign-in" className='login__text'>Уже зарегистрированы? Войти</Link>
    </div>
    )
    
}

export default Register