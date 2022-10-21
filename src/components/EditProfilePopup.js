import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../context/CurrentUserContext';
import {useValidationCheck} from '../hooks/useValidationCheck';

function EditProfilePopup(props) {
const currentUser = React.useContext(CurrentUserContext);

const {
    values,
    handleChange,
    resetForm,
    errors,
    isValid
  } = useValidationCheck({});

React.useEffect(() => {
    if (props.isOpen) {
        resetForm({
            name: currentUser.name,
            subname: currentUser.about,
          });
    } 
  }, [currentUser, props.isOpen, resetForm]);


function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser(values);
}

return (
    <PopupWithForm
        display = {'pop-up__noneDisplay'}
        isDisabled={!isValid}
        saveValue = {props.saveValue}
        onSubmit={handleSubmit}
        onClose = {props.onClose}
        isOpen = {props.isOpen}
        title = 'Редактировать профиль'
        buttonName = 'Сохранить'
        name = 'profile'
    >
        <label className="form__field">
            <input onChange={handleChange} value={values.name || ''} className={errors.name ? 'form__input form__input_profile_name form__input_type_error' : 'form__input form__input_profile_name'} id="form__input-error_name" minLength="2" maxLength="40" type="text"  name="name" placeholder={"Введите имя"} required/>
            <span className="form__input-error form__input-error_name form__input-error_name-err" >{errors.name}</span>
        </label>
        <label className="form__field">
            <input onChange={handleChange} value={values.subname || ''} className={errors.subname ? 'form__input form__input_profile_subname form__input_type_error' : 'form__input form__input_profile_subname'} id="form__input-error_subname" minLength="2" maxLength="200" type="text" name="subname" placeholder="Введите описание" required/>
            <span className="form__input-error form__input-error_subname form__input-error_subname-err">{errors.subname}</span>
        </label>   
    </PopupWithForm>
)
    
}

export default EditProfilePopup;