import React from 'react';
import PopupWithForm from './PopupWithForm';
import {useValidationCheck} from '../hooks/useValidationCheck';

function EditAvatarPopup(props) {
const avatarRef = React.useRef("");

const {
    values,
    handleChange,
    resetForm,
    errors,
    isValid
  } = useValidationCheck({});

function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
        avatar: avatarRef.current.value,
    })  
}

React.useEffect(() => {
    if (props.isOpen) {
        resetForm();
    } 
  }, [props.isOpen, resetForm]);

return (
<PopupWithForm
    display = {'pop-up__noneDisplay'}
    isDisabled={!isValid}
    saveValue = {props.saveValue}
    onClose = {props.onClose}
    isOpen = {props.isOpen}
    onSubmit = {handleSubmit}
    title = 'Обновить аватар'
    buttonName = 'Сохранить'
    name = 'avatar'
    >
        <label className="form__field">
            <input 
            onChange={handleChange} 
            value={values.link || ''} 
            ref={avatarRef} 
            className={errors.link ? 'form__input form__input_add_url form__input_type_error' : 'form__input form__input_add_url'} 
            id="form__input-error_delete" 
            type="URL" 
            name="link" 
            placeholder="Ссылка на картинку" 
            required/>
            <span className="form__input-error form__input-error_url form__input-error_url-err" >{errors.link}</span>
        </label>
</PopupWithForm>
)
}

export default EditAvatarPopup;