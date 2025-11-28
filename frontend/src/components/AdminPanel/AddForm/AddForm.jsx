import React, { useState } from 'react'
import './AddForm.css'
import Input from '../../input/Input'


export default function AddForm({items}) {


    const [title,setTitle] = useState('')
    const [price,setPrice] = useState('')
    const [status,setStatus] = useState('')
    const [link,setLink] = useState('')
    const [category,setCategory] = useState('')
    const [desc,setDesc] = useState('')
    const [photo,setPhoto] = useState('')



    const stateRecogonizer = (e,s) => {

    
        if(e.target.id === 'title'){
          setTitle(s)
        }else if(e.target.id === 'price'){
          setPrice(s)
        }else if(e.target.id === 'status'){
          setStatus(s)
        }else if(e.target.id === 'link'){
          setLink(s)
        }else if(e.target.id === 'category'){
          setCategory(s)
        }else if(e.target.id === 'desc'){
          setDesc(s)
        }
      }

      

      const addCourse = () => {
        if(items[0].name === 'title'){

          const formData = new FormData();

          formData.append('name' , title)
          formData.append('description' , desc)
          formData.append('shortName' , link)
          formData.append('categoryID' , '6345cbd132c10de974957632')
          formData.append('price' , price)
          formData.append('status' , selectedLanguage)
          formData.append('cover' , photo)


          let localStorageData = JSON.parse(localStorage.getItem('user'))


            fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/courses`,{
                method: 'POST',
                headers: {
                Authorization: `Bearer ${localStorageData.token}`,
                },
                body: formData, 
            }).then(res => console.log(res))
        }
      }

  return (
    <div className="add-new-user">
        <h1>افزودن</h1>
        <div className="input-container-add">
            {
                items.map((i) => (
                    <div className="input-add">
                        <label className="input-title">
                            {i.label}
                        </label>
                        <Input
                         type="text" 
                         placeholder={`لطفا ${i.label} را وارد کنید...`}
                         className='inp'
                         element='input'
                         id={i.name}
                         onState={stateRecogonizer}
                         />
                    </div>
                ))
            }
            <input  type="file"  onChange={(e) => {
              setPhoto(e.target.files[0])
              }}/>
        </div>
          <button className="add-user-btn" onClick={() => addCourse()}>افزودن</button>
        </div>
  )
}
