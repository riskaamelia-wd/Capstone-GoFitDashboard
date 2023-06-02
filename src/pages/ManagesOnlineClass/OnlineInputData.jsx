import Cover from "../../elements/Card/Cover"
import imgCover from '../../assets/icons/Appreciation 1.svg'
import AddOnlineClass from "../../components/Form/AddOnlineClass"
import { Col,Row } from "react-bootstrap"
import { useState } from "react"
import Bar from "../../components/Chart/Bar"

const OnlineInputData = ({}) => {
    const [bar, setBar] = useState([
        {
            id:1,
            text:'Daily',
            series:[890],
            colorBar:'#7AD3FF'
        },
        {
            id:2,
            text:'Weekly',
            series:[890],
            colorBar:'#FF9364'
        },
        {
            id:3,
            text:'Monthly',
            series:[710],
            colorBar:'#B09FFF'
        }
    ])

    return(
        <div className="container-fluid" style={{backgroundColor:'#F6F6F6'}}>
            <Cover
                text={'Manage Online Class'}
                list1={'Class Data'}
                list3={'Input Data'}
                img={imgCover}
            />
            <Row className="justify-content-around d-flex ">
                <Col md={6}>
                    <AddOnlineClass/>
                </Col>
                <Col md={6}>
                        {
                            bar.length > 0 ?(
                                bar.map((bar,id ) => {
                                    return(
                                        <Bar
                                            key={id}
                                            series={bar.series}
                                            text={bar.text}
                                            className={'p-0 m-0'}
                                            colorBar={bar.colorBar}
                                            colorBackgroundBar={'#bebdbd'}
                                        />
                                    )
                                })
                            ) : 
                            (
                                <p>Tidak ada Chart</p>
                            )
                        }
                    </Col>
            </Row>
        </div>
    )
}

export default OnlineInputData