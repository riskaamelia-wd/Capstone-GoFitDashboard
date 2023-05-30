import Cover from "../../elements/Card/Cover"
import imgCover from '../../assets/icons/Appreciation 1.svg'
import InputSearch from "../../elements/InputSearch/InputSearch"
import "../ManagesCustomers/ManageCustomers.css"
import { Col, Row } from "react-bootstrap"
import { useState } from "react"
import CardCustomers from "../../components/CardCustomers/CardCustomers"
//Belum Selesai
const ManageCustomers = () => {

    const [customers, setCustomers] = useState([
        {
            id: 1,
            image: "https://source.unsplash.com/random/?profile",
            name: "Mr. Jack",
            height : 170,
            weight : 70,
            goal_weight : 65,
            training_level : "Beginner"
        },
        {
            id: 2,
            image: "https://source.unsplash.com/random/?profile",
            name: "Mr. Johns",
            height : 170,
            weight : 70,
            goal_weight : 65,
            training_level : "Intermediate"
        }
    ])

    return (
        <>
            <div className="container manage-customer">
                <Cover
                    text={'Manage Customers'}
                    list1={'Home'}
                    img={imgCover}
                />
                <Row className="content">
                    <Col md={5} className="px-3 py-3 all-customers">
                        <h2 className='text-customers'>Customers</h2>
                        <div className="py-3">
                            <InputSearch
                                id="search-customers"
                                placeholder="Search customers"
                                width={380}
                                height={32}
                            />
                        </div>
                        {
                            customers.length > 0 ? (
                                customers.map((customer) => {
                                    return (
                                        <CardCustomers 
                                            key={customer.id}
                                            image={customer.image}
                                            name={customer.name}
                                            height={customer.height}
                                            weight={customer.weight}
                                            goal_weight={customer.goal_weight}
                                            training_level={customer.training_level}
                                        />
                                    )
                                })
                            ) : 
                            (
                                <div>Data Kosong</div>
                            )
                        }
                    </Col>
                    <Col md={7} className="px-4 py-3 detail-customers">
                        <h2 className='text-customers'>Details</h2>
                    </Col>
                </Row>
            </div>

        </>
    )
}

export default ManageCustomers