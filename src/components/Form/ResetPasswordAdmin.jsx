/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {useState} from "react";
import TextFieldPassword from "../../elements/TextField/TextFieldPassword";
import axios from "axios";
import { useSelector } from "react-redux";

const ResetPasswordAdmin = ({id, onClick,classNameImg,style, className, btnModalText, btnModalImg}) => {
    const [error, setError] = useState('')
    const token = useSelector((state) => state.tokenAuth.token_jwt)

    const [data, setData] = useState({
        currentPass:'',
        newPass:'',
        confirmPass:''
    })

    const handleInput = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const cekPassword = (currentPass) => {
        axios.get(`http://18.141.56.154:8000/users/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            if (response.data.data.password === currentPass) {
                setNewPassword(data.newPass)
            } else {
                setError('Your current password is wrong, please try again')
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const setNewPassword = (newPassword) => {
        console.log(newPassword);
        axios.put(`http://18.141.56.154:8000/users/${id}`, {
            "password": newPassword
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            setError('')
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        cekPassword(data.currentPass)
    }
    
    return(
        <>
            <button 
                onClick={onClick}
                type="button" 
                className={className? className : "btn btn-link text-decoration-none text-secondary fs-6" }
                width='fit-content'
                style={style}  
                data-bs-toggle="modal" 
                data-bs-target="#resetPasswordAdmin"
            >
                <img src={btnModalImg} 
                className={classNameImg?classNameImg:"ms-4 pe-2"} 
                alt="" 
                style={{ width: '20px', height: '20px' }}/>
                {btnModalText}

            </button>
            <div 
                className="modal fade" 
                id="resetPasswordAdmin" 
                tabIndex="-1" 
                aria-labelledby="exampleModalLabel" 
                aria-hidden="true"
            >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-body">
                    <h1 style={{fontSize:'36px'}}>Reset Your Password</h1>
                    <p>To reset your password please confirm here</p>
                    <form onSubmit={handleSubmit}>
                        <TextFieldPassword
                            placeholder={"******"}
                            label="Current Password"
                            id={"currentPass"}
                            name={"currentPass"}
                            value={data.currentPass}
                            onChange={handleInput}
                            classNameLabel={"mb-2 text-secondary"}
                        />
                        <p className="text-danger m-0">{error}</p>
                        <TextFieldPassword
                            placeholder={"******"}
                            label="New Password"
                            id={"newPass"}
                            name={"newPass"}
                            value={data?.newPass}
                            onChange={handleInput}
                            classNameLabel={"mb-2 mt-2 text-secondary"}
                        />
                        <TextFieldPassword
                            placeholder={"******"}
                            label="Confirm Password"
                            id={"confirmPass"}
                            name={"confirmPass"}
                            value={data?.confirmPass}
                            onChange={handleInput}
                            classNameLabel={"mb-2 mt-2 text-secondary"}
                        />
                        {data.confirmPass && (data.newPass !== data.confirmPass) ? (
                            <span className="mt-3 text-danger">
                            New password and confirm password does not match
                            </span>
                        ) : (
                            <></>
                        )}
                        <div className="d-flex justify-content-end">
                            <button 
                                data-bs-dismiss="modal" 
                                onClick={handleSubmit} 
                                type={"submit"}
                                className={" btn btn-save mt-4 me-4 pe-4 ps-4"}
                                disabled={
                                    !data.currentPass || (data.newPass !== data.confirmPass) || !data.newPass
                                }
                            >
                                save
                            </button>
                            <button 
                                data-bs-dismiss="modal" 
                                onClick={onclick} 
                                type={"submit"}
                                className={" btn btn-cancel mt-4 ps-4 pe-4"}
                            >
                                Cancel
                            </button> 
                        </div>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default ResetPasswordAdmin