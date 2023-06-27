import Card from './Card'
import receipt from '../../assets/icons/receipt_long.svg'
import img from '../../assets/img/abs.svg'
import cancel from '../../assets/icons/cancel.svg'
import task from '../../assets/icons/task_alt.svg'
import { Col, Row, Table } from 'react-bootstrap'
import Status from './Status'
import useAxios from '../../api/useAxios'
import { adminApi } from '../../api/Api'
import {useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import Loading from '../../components/Loading'
import moment from 'moment'
import PaginationInvoices from './paginationInvoices'
import axios from 'axios'

const Invoices = () => {
    const [data, setData] = useState([]);
    const token = useSelector((state) => state.tokenAuth.token_jwt);
    const[isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [dataShown, setDataShown] = useState(0)
    const [dataTotal, setDataTotal] = useState(0)
    const [paid, setPaid] = useState(0)
    const [unpaid, setUnpaid] = useState(0)
    const [sortingKey, setSortingKey] = useState('id');
    const [sortingOrder, setSortingOrder] = useState('asc');
    const [isClicked, setIsClicked] = useState(false);
    const[allData, setAllData] =useState('')
    const handleClick = () => {
      setIsClicked(!isClicked);
    };

    const SortSvg = ({text, sortedAsc, sortedDesc, fillAsc, fillDesc}) => {
        return(
            <div className='d-flex justify-content-between'>
                {text}
                <div className='d-flex mt-2 flex-column'>
                   <svg
                        onClick={sortedAsc}
                        width="8" 
                        height="7"
                        viewBox="0 0 8 7" 
                        fill={fillAsc? fillAsc : '#C6C6C6' }
                        xmlns="http://www.w3.org/2000/svg" 
                        className='btn-sort'
                    >
                        <path d="M0.583275 6.33333C0.423553 6.33333 0.302025 6.26215 0.218691 6.11979C0.135358 5.97743 0.13883 5.83681 0.229108 5.69792L3.64578 0.229167C3.72911 0.0972222 3.84716 0.03125 3.99994 0.03125C4.15272 0.03125 4.27078 0.0972222 4.35411 0.229167L7.77078 5.69792C7.86105 5.83681 7.86453 5.97743 7.78119 6.11979C7.69786 6.26215 7.57633 6.33333 7.41661 6.33333H0.583275Z" />
                    </svg>
                    <svg 
                        onClick={sortedDesc}
                        width="8" 
                        height="7" 
                        viewBox="0 0 8 7" 
                        fill={fillDesc? fillDesc : '#C6C6C6'}
                        xmlns="http://www.w3.org/2000/svg" 
                        className='rotated-svg btn-sort'
                    >
                        <path d="M0.583275 6.33333C0.423553 6.33333 0.302025 6.26215 0.218691 6.11979C0.135358 5.97743 0.13883 5.83681 0.229108 5.69792L3.64578 0.229167C3.72911 0.0972222 3.84716 0.03125 3.99994 0.03125C4.15272 0.03125 4.27078 0.0972222 4.35411 0.229167L7.77078 5.69792C7.86105 5.83681 7.86453 5.97743 7.78119 6.11979C7.69786 6.26215 7.57633 6.33333 7.41661 6.33333H0.583275Z"/>
                    </svg>
                </div>
            </div>
        )
    }
    
    // const { response, isLoading, error, fetchData } = useAxios({
    //     api: adminApi,
    //     method: "get",
    //     url: "/admin/transactions",
    //     body: JSON.stringify({}),
    //     header: JSON.stringify({
    //         Authorization: `Bearer ${token}`,
    //     }),
    // });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://18.141.56.154:8000/admin/transactions", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const { data_shown, total_data } = response.data.pagination;

                const pageSize = data_shown;
                const totalPages = Math.ceil(total_data / pageSize);
                let allData = [];
                let filteredUnpaidLength = 0
                let filteredPaidLength = 0

                for (let page = 1; page <= totalPages; page++) {
                    const pageResponse = await axios.get(
                        `http://18.141.56.154:8000/admin/transactions?page=${page}&data_shown=${data_shown}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const responseData = pageResponse.data.data;
                    allData = allData.concat(responseData);
                    const filteredUnpaid = allData?.filter(item => item.status === 'pending');
                    const filteredCanceled = allData?.filter(item => item.status === 'canceled');
                    filteredUnpaidLength = filteredUnpaid.length + filteredCanceled.length
                    
                    const filteredPaid = allData?.filter(item => item.status === 'completed');
                    filteredPaidLength = filteredPaid.length
                    
                }
                setAllData(allData);
                setUnpaid(filteredUnpaidLength)
                setPaid(filteredPaidLength)
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [token])

    const fetchData = async (currentPage) => {
        setIsLoading(true);
        await axios
          .get(`http://18.141.56.154:8000/admin/transactions?page=${currentPage}`, 
          {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
          .then((response) => {
            const { data } = response.data;
            const { data_shown, total_data } = response.data.pagination;
            setDataShown(data_shown)
            setDataTotal(total_data)
            setData(data);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } 

    const handleSort = (key) => {
        if (key === sortingKey) {
          setSortingOrder(sortingOrder === 'asc' ? 'desc' : 'asc');
        } else {
          setSortingKey(key);
          setSortingOrder('asc');
        }
      };

      const sortedData = [...data].sort((a, b) => {
        let valueA, valueB;
    
        if (sortingKey === 'id') {
          valueA = a.id;
          valueB = b.id;
        } else if (sortingKey === 'date') {
          valueA = new Date(a.metadata.created_at);
          valueB = new Date(b.metadata.created_at);
        } else if (sortingKey === 'name') {
          valueA = a.product;
          valueB = b.product;
        }
    
        if (valueA < valueB) {
          return sortingOrder === 'asc' ? -1 : 1;
        } else if (valueA > valueB) {
          return sortingOrder === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
      
    const handleNextInvoices = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    const handlePrevInvoices = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };
      
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (data.length > 10) {
          handleNextInvoices();
        }
    }, [data, handleNextInvoices]);
    return(
        <div>
            <p className='fw-bold fs-2 mt-3 ms-3'>Invoices</p>
            <Row>
                <Col md={4} lg={3}>
                    <Card
                        number={unpaid + paid}
                        text={'Total Invoices'}
                        img={receipt}
                    />
                </Col>
                
                <Col md={4} lg={3}>
                    <Card
                        number={paid}
                        text={'Paid Invoices'}
                        img={task}
                    />
                </Col>
                
                <Col md={4} lg={3}>
                    <Card
                        number={unpaid}
                        text={'Unpaid Invoices'}
                        img={cancel}
                    />
                </Col>
            </Row>
            <p className='p-0 mt-4 fs-5'>Payment History</p>
            <Table>
                <thead className='border-bottom border-bottom-1 border-dark'>
                    <tr >
                        <th ><SortSvg 
                            text={'ID Invoice'}
                            sortedAsc={()=>{
                                handleSort('id');
                                handleClick()
                            }}
                            fillDesc={!isClicked ? '#C6C6C6' : 'black'}
                            fillAsc={isClicked ? '#C6C6C6' : 'black'}
                            sortedDesc={()=>{
                                handleSort('id')
                                handleClick()
                            }}
                            /></th>
                        <th><SortSvg 
                            text={'Date'} 
                            sortedAsc={()=>handleSort('date')}
                            sortedDesc={()=>handleSort('date')}
                        /></th>
                        {/* <th><SortSvg text={'Recipient'}/></th> */}
                        {/* <th><SortSvg text={'Email'}/></th> */}
                        <th><SortSvg text={'Service Type'}/></th>
                        <th><SortSvg text={'Status'}/></th>
                        <th></th>
                    </tr>
                </thead>
                {
                    isLoading?
                    <Loading/>
                    :
                    sortedData?.length > 0 ? (
                        sortedData?.map((item) => {
                            return(
                                <tbody>
                                    <tr key={item.id} className='border-bottom border-bottom-1'>
                                        <td>#{String(item.id).padStart(10, '0')}</td>
                                        <td>{moment (item.metadata.updated_at).format('MMMM DD, YYYY')} <br />{ moment(item.metadata.updated_at).format('hh:mm A')}</td>
                                        {/* <td>
                                            <img 
                                                width={'40px'}  
                                                height={'40px'} 
                                                src={img}   
                                                className='rounded-circle me-lg-3 me-2' 
                                                alt="" 
                                            /> 
                                            John Smith    
                                        </td> */}
                                        {/* <td>johnsmith123@gmail.com</td> */}
                                        <td>{item.product}</td>
                                        <td><Status status={item.status}/></td>
                                        <td><i className="bi bi-three-dots-vertical"></i></td>
                                    </tr>
                                </tbody>
                            )
                        })
                    ) :
                    (
                        <tr><td>Data Available</td></tr>
                    )
                }
            </Table>
            <PaginationInvoices 
                page={currentPage}
                totalItem={dataTotal}
                item={dataShown}
                disabledPreInvoices={currentPage == 1}
                handlePrevInvoices={handlePrevInvoices}
                disabledNextInvoices={dataShown < 10}
                handleNextInvoices={handleNextInvoices}
            />
        </div>
    )
}

export default Invoices