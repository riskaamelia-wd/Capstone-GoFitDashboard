import Cover from "../../elements/Card/Cover"
import imgCover from '../../assets/icons/Appreciation 1.svg'
import InputSearch from "../../elements/InputSearch/InputSearch"
import "../ManagesCustomers/ManageCustomers.css"
import { useState } from "react"
import CardCustomers from "../../elements/CardCustomers/CardCustomers"
import CardDetailCustomers from "../../elements/CardCustomers/CardDetailCustomer"

//Belum Selesai
const ManageCustomers = () => {

    const [isVisible, setIsVisible] = useState(false)

    const [customers, setCustomers] = useState([
        {
            id: 1,
            image: "https://source.unsplash.com/random/?profile",
            name: "Mr. Jack",
            height: 170,
            weight: 70,
            goal_weight: 65,
            training_level: "Beginner"
        },
        {
            id: 2,
            image: "https://source.unsplash.com/random/?profile",
            name: "Mr. Johns",
            height: 170,
            weight: 70,
            goal_weight: 65,
            training_level: "Intermediate"
        },
        
    ])

    const [selectedCustomerId, setSelectedCustomerId] = useState(null);

    const getSelectedCustomer = () => {
        return customers.find(customer => customer.id === selectedCustomerId);
      };
      

    return (
        <>
            <div className="container manage-customer">
                <Cover
                    text={'Manage Customers'}
                    list1={'Home'}
                    img={imgCover}
                />

                <div className="row p-3 all-customers">
                    <div className={isVisible ? "col-4" : "col-12"}>
                        <div className="col-12">
                            <h2 className='text-customers'>Customers</h2>
                        </div>
                        <div className="col-12 py-3">
                            <InputSearch
                                id="search-customers"
                                placeholder="Search customers"
                            />
                        </div>
                       
                        <div className="col-12">
                            {
                                customers.length > 0 ? (
                                    customers.map((customer) => {
                                        return (
                                            <CardCustomers
                                                onClick={(e) => { setSelectedCustomerId(customer.id); setIsVisible(true); }}
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
                        </div>
                    </div>

                    {isVisible ? <>
                        <div className="col-lg-8">
                            <h2 className='text-customers'>Details</h2>
                            <CardDetailCustomers 
                                customer={getSelectedCustomer()}
                            />
                        </div>
                    </> : <>  </>
                    }

                </div>

            </div>

        </>
    )
}

export default ManageCustomers