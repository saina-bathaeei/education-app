import React,{useReducer} from 'react'
import classNames from 'classnames';
import './input.css'


const inputReducer = (state,action) => {
    switch (action.type) {
        case 'CHANGE' : {
            return {
                ...state,
                value: action.value,
                isValid: action.isValid,
                id: action.id
            }
        }
        default : {
            return state
        }
    }
}


export default function Input(props) {

    const classes = classNames(props.className, {
        active: 'active'
      });


    const [mainInput,dispatch] = useReducer(inputReducer,{
        value: '',
        isValid: false,
        id: '',
    })

    const onChangeHandler = (event) => {
        dispatch({
            type:'CHANGE',
            value: event.target.value,
            isValid: validations(),
            id: event.target.id
        })

        if(mainInput.isValid){
            //event.target
        }

        validations()
    }

    const validations = () => {

        let str = mainInput.value
        const array = [...str];
        
        let emailPattent = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/g
        let passwordPattent = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{10}$/;
        let photoPattent = /\/images\/courses\/.*/

        let isToggle = false
        
        if(mainInput.id === 'username'){
            if(array.length > 9){
                isToggle = true
            }
        }else if(mainInput.id === 'email') {
            let emailValid = emailPattent.test(str)

            if (emailValid){
                isToggle = true
            }

        }else if(mainInput.id === 'pass') {
            isToggle = true
        }else if(mainInput.id === 'phone'){
            if (array.length > 11){
                isToggle = true
            }
        }else if (mainInput.id === 'title'){
            if(array.length > 4){
                isToggle = true
            }
        }else if (mainInput.id === 'price' || mainInput.id === 'status' || mainInput.id === 'link' || mainInput.id === 'category' || mainInput.id === 'desc'){
            isToggle = true
        }else if (mainInput.id === 'photo'){

            let photoValid = photoPattent.test(str)

            if(photoValid){
                isToggle = true
            }
        }

        return isToggle
    }

    const stateReco = (event, s) => {
        props.onState(event,s)
    }

    const setValtext = (e) => {
        props.onChange(e)
    }

    const element = props.element === 'input' ? (
        <input
        type={props.type}
        placeholder={props.placeholder}
        className={`${props.className} ${ mainInput.isValid ? 'active' : 'notactive'}`}
        element={props.element}
        value={mainInput.value}
        onChange={(event) => onChangeHandler(event)}
        id={props.id}
        onKeyUp={(event) => stateReco(event,mainInput.value)}
        />
    ) : (
        <textarea
        placeholder={props.placeholder}
        className={props.className}
        element={props.element}
        onChange={(event) => setValtext(event)}
        />
    )

  return <>{element}</>
}
'/images/courses/fareelancer.png'