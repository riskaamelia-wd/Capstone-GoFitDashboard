/* eslint-disable no-unused-vars */
// import React from 'react'
import { useEffect, useState } from 'react';
import TableTransaction from '../../components/TabelTransaction/TableTransaction';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ManageTransaction = () => {
    const [invoices, setInvoices] = useState([]);
    const token = useSelector((state) => state.tokenAuth.token_jwt)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalData, setTotalData] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(10)

    useEffect(() => {
        axios.get(`http://18.141.56.154:8000/admin/transactions?page=${page}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            setInvoices(response.data.data)
            setTotalPages(Math.ceil(response.data.pagination.total_data / itemPerPage))
            setTotalData(response.data.pagination.total_data)
        })
        .catch((err) => {
            console.log(err);
        })
    },[token, page])

    return (
        <div className='p-5' style={{backgroundColor: 'var(--Neutral-White-100)'}}>
            <h2 className="mb-3">Transactions History</h2>
            <TableTransaction 
                invoices={invoices}
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                totalData={totalData}
            />
        </div>
    )
}

export default ManageTransaction