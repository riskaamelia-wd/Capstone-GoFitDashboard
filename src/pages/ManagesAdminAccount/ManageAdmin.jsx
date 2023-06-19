/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Cover from '../../elements/Card/Cover'
import CoverIcon from '../../assets/icons/Appreciation 1.svg'
import SearchIcon from "../../assets/icons/search.svg";
import AddIcon from '../../assets/icons/add-white.svg'
import { Button } from 'react-bootstrap'
import TagRole from '../../elements/Tag/TagRole';
import ResetPasswordIcon from '../../assets/icons/forward_media.svg'
import DeleteIcon from '../../assets/icons/delete.svg'
import ResetPasswordAdmin from '../../components/Form/ResetPasswordAdmin';

const ManageAdmin = () => {
    const [datas, setdatas] = useState([
        {
            name: 'admin',
            email: 'admin@domain.com',
            role: 'admin',
            profile_image: 'https://placeholder.com/400x400'
        },
        {
            name: 'manager',
            email: 'manager@domain.com',
            role: 'manager',
            profile_image: 'https://placeholder.com/400x400'
        },
        {
            name: 'auditor',
            email: 'auditor@domain.com',
            role: 'auditor',
            profile_image: 'https://placeholder.com/400x400'
        }
    ]);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [showAddAdmin, setShowAddAdmin] = useState(false);

    const handleAddAdmin = () => {
        setShowAddAdmin(!showAddAdmin);
        alert('Added')
    }

    const handleResetPassword = () => {
        setShowResetPassword(!showResetPassword);
        alert('Reset')
    }

    const handleDelete = () => {
        alert('Deleted')
    }
    return (
        <div className="container">
            <Cover 
                img={CoverIcon}
                text={'Manage Admin'}
                list1={'Home'}
            />
            <div className="shadow mt-3 px-5 py-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                        <h1 className="border-end pe-3">All Admin</h1>
                        <p>30 Total</p>
                        <p>2 Inactive</p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <div className="search-container">
                            <img src={SearchIcon} className='icon-search'/>
                            <input 
                                name={'inputSearch'}
                                id={'inputSearch'}
                                placeholder={'Search your name'}                
                                className = "search w-100 py-2"
                            />
                        </div>
                        <Button onClick={handleAddAdmin} variant='outline-none' className='text-white' style={{backgroundColor: 'var(--primary-500)'}}>
                            Add Admin
                            <img src={AddIcon} alt="" className='ps-2'/>
                        </Button>
                    </div>
                </div>
                <table className="table table-borderless">
                    <thead
                        style={{
                        borderTop: "2px solid var(--Neutral-White-900)",
                        borderBottom: "2px solid var(--Neutral-White-900)",
                        color: "var(--Neutral-White-900)",
                        }}
                    >
                        <tr style={{ color: "var(--Neutral-White-900)" }}>
                            <td style={{ width: '40px' }}>
                                <div
                                style={{
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--primary-100)',
                                    width: '24px',
                                    height: '24px',
                                    margin: 'auto',
                                }}
                                ></div>
                            </td>
                            <th scope="col">Name</th>
                            <th scope="col">Site Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.length > 0 ? (
                        datas.map((data) => {
                            return (
                            <tr key={data.id}>
                                <td style={{ width: '40px' }}>
                                    <div
                                    style={{
                                        borderRadius: '50%',
                                        backgroundColor: 'var(--primary-100)',
                                        width: '24px',
                                        height: '24px',
                                        margin: 'auto',
                                    }}
                                    ></div>
                                </td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <div className="me-3">
                                            <img src={data.profile_image} alt="Booking" className="rounded-circle" style={{ width: '40px', height: '40px' }} />
                                        </div>
                                        <div className='d-flex flex-column'>
                                            <span style={{fontWeight: 'bold', fontSize: '14px'}}>{data.name}</span>
                                            <span style={{color: 'var(--Neutral-White-900)' ,fontWeight: 'normal', fontSize: '14px'}}>{data.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <TagRole 
                                        role={data.role}
                                    />
                                </td>
                                <td>
                                    <div className="d-flex gap-3 justify-content-end">
                                        <Button variant='outline-none' onClick={handleResetPassword}>
                                            <img src={ResetPasswordIcon} alt="" style={{ width: '20px', height: '20px' }} className='pe-2'/>
                                            Reset Password
                                        </Button>
                                        <Button variant='outline-none' onClick={handleDelete}>
                                            <img src={DeleteIcon} alt="" style={{ width: '20px', height: '20px' }} className='pe-2'/>
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                            );
                        })
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">Tidak ada data admin</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageAdmin