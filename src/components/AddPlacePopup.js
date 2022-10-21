import React from 'react';
import PopupWithForm from './PopupWithForm';
import {useValidationCheck} from '../hooks/useValidationCheck';

function AddPlacePopup(props) {
const cardsNameRef = React.useRef("");
const cardsUrlRef = React.useRef("");

const {
    values,
    handleChange,
    resetForm,
    errors,
    isValid
  } = useValidationCheck({});
  

function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateCards({
        name: cardsNameRef.current.value,
        link: cardsUrlRef.current.value,
    })  
}


React.useEffect(() => {
    if (props.isOpen) {
        resetForm();
    } 
  }, [props.isOpen, resetForm]);

return(
<PopupWithForm
    display = {'pop-up__noneDisplay'}
    isDisabled={!isValid}
    saveValue = {props.saveValue}
    onSubmit = {handleSubmit}
    onClose = {props.onClose}
    isOpen = {props.isOpen}
    title = 'Новое место'
    buttonName = 'Сохранить'
    name = 'add'
    >
        <label className="form__field">
            <input value={values.title || ''} onChange={handleChange}  ref={cardsNameRef} className={errors.title ? 'form__input form__input_add_name form__input_type_error' : 'form__input form__input_add_name'}id="form__input-error_add" minLength="2" maxLength="30" type="text"  name="title" placeholder="Название" required/>
            <span className="form__input-error form__input-error_add form__input-error_add-err" >{errors.title}</span>
        </label>
        <label className="form__field">
            <input value={values.link || ''} onChange={handleChange} ref={cardsUrlRef} className={errors.link ? 'form__input form__input_add_name form__input_type_error' : 'form__input form__input_add_name'} id="form__input-error_url" type="URL" name="link" placeholder="Ссылка на картинку" required/>
            <span className="form__input-error form__input-error_url form__input-error_url-err" >{errors.link}</span>
        </label> 
</PopupWithForm>
)
};

export default AddPlacePopup;