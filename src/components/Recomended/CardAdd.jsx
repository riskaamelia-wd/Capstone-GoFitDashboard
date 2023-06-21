import { Dropdown } from "react-bootstrap"
import ButtonComponent from "../../elements/Buttons/ButtonComponent"
import './Recomended.css'
import { useState } from "react"

export const Select = ({onSelect, classNameLabel, label,  name,  options, className}) => {
    return (
        <>    
            {label && <label htmlFor={name} className={classNameLabel}>
                {label}
            </label>}     
            <select 
                id={name}  
                // disabled={value.length === 1}
                className={className}
                name={name} 
                onChange={onSelect}
            >
                {
                    options?.map(option => (
                        <option 
                            key={option.value}
                            value={option.value}
                            >
                                {option.text}
                            </option>
                    ))
                }
            </select>

        </>
    )
}

const CardAdd = ({handleSubmit, handleSave, HandleClose, handleChange, workoutList, levelList, valueLevel, valueWorkout, nameLevel, nameWorkout}) => {

   

   
    

    return(
        <div className="cardAdd">
            <form 
                className="d-flex flex-column" 
                style={{width:'100%'}}
                onSubmit={handleSubmit}
            >
                < Select 
                    name={nameLevel}
                    value = {valueLevel}
                    options= {levelList}
                    onSelect={handleChange}
                />
                {/* <select>
                    <option selected disabled  hidden>Choose Level</option>
                    <option defaultValue={'Beginner'}>Beginner</option>
                    <option defaultValue={'Intermediate'}>Intermediate</option>
                    <option defaultValue={'Advanced'}>Advanced</option>
                </select> */}
                < Select 
                    name={nameWorkout}
                    value = {valueWorkout}
                    options= {workoutList}
                    onSelect={handleChange}
                />
                <div className="d-flex flex-row justify-content-around mt-3">
                    <ButtonComponent
                        buttonName={'Close'}
                        onClick={HandleClose}
                        className={'btnCancel'}
                    />
                    <ButtonComponent
                        buttonName={'Save'}
                        type={'submit'}
                        onClick={handleSave}
                        className={'btnSave'}
                    />
                </div>
            </form>

        </div>
    )
}

export default CardAdd