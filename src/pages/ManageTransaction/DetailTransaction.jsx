/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import IconBack from '../../assets/icons/arrow_back.svg'
import IconDownload from '../../assets/icons/download.svg'
import { Table } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Document, PDFDownloadLink, PDFViewer, Page, Text, View } from '@react-pdf/renderer'

const DetailTransaction = () => {

    const navigate = useNavigate()
    const { id } = useParams();
    const token = useSelector((state) => state.tokenAuth.token_jwt)
    const [transaction, setTransaction] = useState()
    const [fetchStatus, setFetchStatus] = useState(true)
    const [product, setProduct] = useState({})

    useEffect(() => {
        axios.get(`http://18.141.56.154:8000/admin/transactions/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            // console.log(response.data);
            const res = response.data.data
            setTransaction(res)
            if(res.product === 'class'){
                fetchClasses(res.product_id)
            }else{
                fetchMembership(res.product_id)
            }
            setFetchStatus(false)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [fetchStatus, setFetchStatus]);

    const fetchMembership = (id) => {
        axios.get(`http://18.141.56.154:8000/admin/memberships/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            setProduct(response.data.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const fetchClasses = (id) => {
        axios.get(`http://18.141.56.154:8000/admin/classes/tickets/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            setProduct(response.data.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleBack = () => {
        navigate('/transaction')
    }

    //untuk convert date dari bentuk dd/mm/yyyy ke mount date
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'long', day: 'numeric', year: 'numeric'};
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedDate;
    }

    //untuk convert waktu dari 24 jam ke AM/PM
    function formatTime(dateString) {
        const date = new Date(dateString);
        const options = { hour: 'numeric', minute: 'numeric'};
        const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedTime;
    }

    const generatePdf = () => {
        const MyDocument = () => (
            <Document>
                <Page size="A4">
                <View>
                    <Text>Section #1</Text>
                </View>
                <View>
                    <Text>Section #2</Text>
                </View>
                </Page>
            </Document>
        );
        
        return (
            <PDFViewer>
                <MyDocument />
            </PDFViewer>
        );
    };

    return (
        <div className='p-3' style={{backgroundColor: 'var(--Neutral-White-100)'}}>
            <div className='bg-white d-flex justify-content-start align-items-center gap-5 px-5 py-3 rounded-3 my-2'>
                <img src={IconBack} alt="back" onClick={handleBack} className='cursor-pointer' style={{ cursor: 'pointer' }} />
                <div>
                    <h4>Transaction detail</h4>
                    <p style={{color: 'var(--info-800)'}}>/ Personal transactions details</p>
                </div>
            </div>
            <div className="bg-white px-5 py-3 rounded-3 my-2">
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                        <span style={{color: 'var(--Neutral-White-700)', fontSize: '13px'}}>ID payment</span>
                        <h4 style={{fontSize: '28px'}}>{transaction?.transaction_code}</h4>
                    </div>
                    <button onClick={generatePdf} className='px-3 py-2 rounded-3 text-white border-light' style={{backgroundColor: 'var(--primary-500)'}}>
                        <span><img src={IconDownload} alt="" className='me-2'/></span>
                        Download Report
                    </button>
                </div>
                <Table className='my-3' borderless>
                    <thead>
                        <tr style={{color: 'var(--Neutral-White-700)', fontSize: '14px', fontWeight: 'normal'}}>
                            <td>Type order</td>
                            <td>Payment method</td>
                            <td>Invoice date</td>
                            <td>Date paid</td>
                            <td>Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transaction?
                            (<tr style={{fontWeight: 'bold'}}>
                                {
                                    transaction.product === 'class' ? 
                                    // <td>{product.class_package?.period} - {product.class_package?.class.name}</td>:
                                    // <td>{product.plane?.name}</td>
                                    <td>Class</td>:
                                    <td>Membership</td>
                                }
                                {
                                    transaction.status === "completed" ?
                                    <td>{transaction.payment_method.name}</td>:
                                    <td className='ps-5'> - </td>
                                }
                                <td>{formatDate(transaction.metadata.created_at)} at {formatTime(transaction.metadata.created_at)}</td>
                                {
                                    transaction.status === "completed" ? 
                                    <td>{formatDate(transaction.metadata.updated_at)} at {formatTime(transaction.metadata.updated_at)}</td>:
                                    <td style={{color: 'var(--Danger-700)'}}>Unpaid</td>
                                }
                                <td style={{color: transaction.status === 'completed' ? 'var(--info-700)': 'var(--Danger-700)'}}>{transaction.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} <span style={{fontSize: '10px'}}>{transaction.status === 'completed' ? 'paid': 'unpaid'}</span></td>
                            </tr>):
                            <tr>Loading</tr>
                        }
                    </tbody>
                </Table>
                <h6>Customers</h6>
                <div className='d-flex justify-content-start align-items-center gap-3'>
                    {
                        product.user?.id != undefined &&
                        <>
                            <img src={`http://18.141.56.154:8000/assets/img/profile/user${product.user?.id}.jpg`} alt="avatar" className="rounded-circle" style={{ width: '80px', height: '80px' }}/>
                            <div>
                                <span className="d-block" style={{fontSize: '20px', fontWeight: 'bold'}}>{product.user?.name}</span>
                                {/* <span className="d-block" style={{color: 'var(--Neutral-White-900)',fontSize: '14px'}}>(+62) 812 9590 3189</span> */}
                                <span className="d-block" style={{color: 'var(--Neutral-White-900)',fontSize: '14px'}}>{product.user?.email}</span>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default DetailTransaction