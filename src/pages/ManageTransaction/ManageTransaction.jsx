/* eslint-disable no-unused-vars */
// import React from 'react'
import { useEffect, useState } from 'react';
import TableTransaction from '../../components/TabelTransaction/TableTransaction';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ManageTransaction = () => {
    const [invoices, setInvoices] = useState([]);
    const token = useSelector((state) => state.tokenAuth.token_jwt)

    useEffect(() => {
        axios.get('http://18.141.56.154:8000/admin/transactions',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response);
            setInvoices(response.data.data)
        })
        .catch((err) => {
            console.log(err);
        })
    },[token])

    return (
        <div className='p-5' style={{backgroundColor: 'var(--Neutral-White-100)'}}>
            <h2 className="mb-3">Transactions History</h2>
            <TableTransaction 
                invoices={invoices}
            />
        </div>
    )
}

export default ManageTransaction