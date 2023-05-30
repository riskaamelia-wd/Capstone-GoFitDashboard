import { Card } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import height_img from "../../assets/icons/height.svg";
import weight_img from "../../assets/icons/monitor_weight.svg";
import goal_weight_img from "../../assets/icons/workspace_premium.svg";
import training_level_img from "../../assets/icons/elevation.svg";
import "../CardCustomers/CardCustomer.css";

const CardCustomers = ({ image, name, height, weight, goal_weight, training_level }) => {
    function toggleBackgroundColor(element) {
        if (element) {
          element.classList.toggle('active');
        }
      }
       
    return (
        <>
            <Card className="card-customers" id="card-customer" onClick={toggleBackgroundColor(this)}>
                <Row>
                    <Col md={2}>
                        <img src={image} alt="Person" className="rounded-circle" />
                    </Col>

                    <Col md={10}>
                        <Row>
                            <h4 className="name-customers">{name}</h4>
                        </Row>
                        <Row className="grid-inner-row">
                            <Col md={3}  className="tight-col">
                                <img src={height_img} alt="height" />
                                <span className="text-customer"> {height}cm</span>
                            </Col>
                            <Col md={3}  className="tight-col">
                                <img src={weight_img} alt="weight" />
                                <span className="text-customer"> {weight}kg</span>                          
                            </Col>
                            <Col md={3}  className="tight-col">
                                <img src={goal_weight_img} alt="goal_weight" />
                                <span className="text-customer"> {goal_weight}kg</span>
                            </Col>
                            <Col md={5} className="tight-col">
                                <img src={training_level_img} alt="training_level" />
                                <span className="text-customer"> {training_level}</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default CardCustomers