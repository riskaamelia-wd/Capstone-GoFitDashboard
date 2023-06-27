/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import IconBack from '../../assets/icons/arrow_back.svg';
import IconDownload from '../../assets/icons/download.svg';
import { Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

const DetailTransaction = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = useSelector((state) => state.tokenAuth.token_jwt);
    const [transaction, setTransaction] = useState();
    const [fetchStatus, setFetchStatus] = useState(true);
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios
        .get(`http://18.141.56.154:8000/admin/transactions/${id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            const res = response.data.data;
            setTransaction(res);
            if (res.product === 'class') {
            fetchClasses(res.product_id);
            } else {
            fetchMembership(res.product_id);
            }
            setFetchStatus(false);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [fetchStatus, setFetchStatus]);

    const fetchMembership = (id) => {
        axios
        .get(`http://18.141.56.154:8000/admin/memberships/${id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            setProduct(response.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const fetchClasses = (id) => {
        axios
        .get(`http://18.141.56.154:8000/admin/classes/tickets/${id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            setProduct(response.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const handleBack = () => {
        navigate('/transaction');
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedDate;
    }

    function formatTime(dateString) {
        const date = new Date(dateString);
        const options = { hour: 'numeric', minute: 'numeric' };
        const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedTime;
    }

    const generatePdf = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Transaction Detail', 105, 20, { align: 'center' });

        doc.setFontSize(12);
        doc.text(`ID Payment`, 20, 40, { align: 'left' });
        doc.text(`: ${transaction.transaction_code}`, 80, 40, { align: 'left' });
        doc.text(`Date`, 20, 50, { align: 'left' });
        doc.text(`: ${transaction.metadata.updated_at}`, 80, 50, { align: 'left' });
        doc.text(`Amount`, 20, 60, { align: 'left' });
        doc.text(`: ${transaction.amount}`, 80, 60, { align: 'left' });
        doc.text(`Payment method`, 20, 70, { align: 'left' });
        doc.text(`: ${transaction.payment_method.name}`, 80, 70, { align: 'left' });
        doc.text(`Status`, 20, 80, { align: 'left' });
        doc.text(`: ${transaction.status}`, 80, 80, { align: 'left' });
        doc.text(`Product`, 20, 90, { align: 'left' });
        doc.text(`: ${transaction.product}`, 80, 90, { align: 'left' });
        doc.text(`Customer`, 20, 100, { align: 'left' });
        doc.text(`: ${product.user?.name}`, 80, 100, { align: 'left' });

        doc.save(`transaction_report_${transaction.transaction_code}.pdf`);
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
                        product?.user != null &&
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