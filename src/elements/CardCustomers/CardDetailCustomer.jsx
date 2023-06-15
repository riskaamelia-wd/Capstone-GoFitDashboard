import { Card } from "react-bootstrap";
import height_img from "../../assets/icons/height.svg";
import weight_img from "../../assets/icons/monitor_weight.svg";
import goal_weight_img from "../../assets/icons/workspace_premium.svg";
import training_level_img from "../../assets/icons/elevation.svg";
import block from "../../assets/img/block.svg";
import edit from "../../assets/img/edit_square.svg";
import "../CardCustomers/CardCustomer.css";
import ButtonEditDelete from "../Buttons/ButtonEditDelete";
import TextFieldPassword from "../TextField/TextFieldPassword";
import TextField from "../TextField/TextField";

const CardDetailCustomers = ({ customer, onClickBlockCustomer, onClickEditCustomer }) => {
    console.log(customer);
    return (
        <>
            {customer && (
                <Card className="card-customers w-100" id="card-customer">
                    <div className="row">
                        <div className="col-lg-1">
                            <img src={customer.image} alt="Person" className="rounded-circle" />
                        </div>
                        <div className="col-lg-8">
                            <div className="row">
                                <h4 className="name-customers">{customer.name}</h4>
                            </div>
                            <div className="row grid-inner-row">
                                <div className="col-3 tight-col">
                                    <img src={height_img} alt="height" />
                                    <span className="text-customer"> {customer.height}cm</span>
                                </div>
                                <div className="col-3 tight-col">
                                    <img src={weight_img} alt="weight" />
                                    <span className="text-customer"> {customer.weight}kg</span>
                                </div>
                                <div className="col-3 tight-col">
                                    <img src={goal_weight_img} alt="goal_weight" />
                                    <span className="text-customer"> {customer.goal_weight}kg</span>
                                </div>
                                <div className="col-4 tight-col">
                                    <img src={training_level_img} alt="training_level" />
                                    <span className="text-customer"> {customer.training_level}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 block-edit">
                            <div className="blockCustomer">
                                <img src={block} onClick={onClickBlockCustomer} alt="block" />
                            </div>
                            <div className="editCustomer">
                                <img
                                    src={edit}
                                    onClick={onClickEditCustomer}
                                    alt="edit"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal" />
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            {/* Form Edit Customers */}
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog form-edit-customer">
                    <h5 className="textChangeProfile" id="exampleModalLabel">
                        Change Profile
                    </h5>
                    <div className="modal-content">
                        <div className="modal-body">
                            <form>
                                <p style={{ textAlign: "center", fontWeight: "600", fontSize: "16px" }}>Change your profile picture from here</p>
                                <div className="row">
                                    <div className="col-2">
                                        <img src={customer.image} alt="Person" className="rounded-circle" />
                                    </div>
                                    <div className="col-8">
                                        button
                                        <p style={{ fontSize: "10px", fontWeight: "400", color: "#6D6D6D" }}>Allowed JPG, GIF or PNG. Max size of 800K</p>
                                    </div>
                                </div>
                                <p style={{ fontSize: "16px", fontWeight: "400", color: "#030303", paddingTop: "10px" }}>To change your password please confirm here</p>
                                <TextFieldPassword
                                    label='Current Password'
                                    placeholder='******'
                                    name='password'
                                    id='password'
                                    classNameLabel={'label-customer'}
                                // value={passwordInput}
                                // onChange={handlePasswordChange}
                                />
                                <p style={{ fontWeight: "400", fontSize: "14px", textAlign: "right", color: "#DB4151" }}>Set to default password</p>
                                <p style={{ fontSize: "16px", fontWeight: "400", color: "#030303" }}>To change your personal detail , edit and save from here</p>
                                <div className="row">
                                    <div className="col-6">
                                        <TextField
                                            classNameInput={'TextFieldInput'}
                                            placeholder={'John'}
                                            label={'Your Name'}
                                            name={'name'}
                                            id={'name'}
                                            type={'text'}
                                            // onChange={handleInput}
                                            // value={data?.name}
                                            classNameLabel={'label-customer'}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <TextField
                                            classNameInput={'TextFieldInput'}
                                            placeholder={'John_'}
                                            label={'Username'}
                                            name={'username'}
                                            id={'username'}
                                            type={'text'}
                                            // onChange={handleInput}
                                            // value={data?.name}
                                            classNameLabel={'label-customer'}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <TextField
                                            classNameInput={'TextFieldInput'}
                                            placeholder={'John@gm***'}
                                            label={'Email'}
                                            name={'email'}
                                            id={'email'}
                                            type={'text'}
                                            // onChange={handleInput}
                                            // value={data?.name}
                                            classNameLabel={'label-customer'}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <TextField
                                            classNameInput={'TextFieldInput'}
                                            placeholder={'087388***'}
                                            label={'Phone'}
                                            name={'phone'}
                                            id={'phone'}
                                            type={'text'}
                                            // onChange={handleInput}
                                            // value={data?.name}
                                            classNameLabel={'label-customer'}
                                        />
                                    </div>
                                </div>
                                <TextField
                                    classNameInput={'TextFieldInput'}
                                    placeholder={'Jl.Budi Utomo'}
                                    label={'Address'}
                                    name={'address'}
                                    id={'address'}
                                    type={'text'}
                                    // onChange={handleInput}
                                    // value={data?.name}
                                    classNameLabel={'label-customer mt-3'}
                                />
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <TextField
                                            classNameInput={'TextFieldInput'}
                                            placeholder={'Female'}
                                            label={'Gender'}
                                            name={'gender'}
                                            id={'gender'}
                                            type={'text'}
                                            // onChange={handleInput}
                                            // value={data?.name}
                                            classNameLabel={'label-customer'}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <TextField
                                            classNameInput={'TextFieldInput'}
                                            placeholder={'173 cm'}
                                            label={'Height'}
                                            name={'height'}
                                            id={'height'}
                                            type={'text'}
                                            // onChange={handleInput}
                                            // value={data?.name}
                                            classNameLabel={'label-customer'}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <TextField
                                            classNameInput={'TextFieldInput'}
                                            placeholder={'73 kg'}
                                            label={'Weight'}
                                            name={'weight'}
                                            id={'weight'}
                                            type={'text'}
                                            // onChange={handleInput}
                                            // value={data?.name}
                                            classNameLabel={'label-customer'}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <TextField
                                            classNameInput={'TextFieldInput'}
                                            placeholder={'65 kg'}
                                            label={'Goal weight'}
                                            name={'goal_height'}
                                            id={'goal_height'}
                                            type={'text'}
                                            // onChange={handleInput}
                                            // value={data?.name}
                                            classNameLabel={'label-customer'}
                                        />
                                    </div>
                                </div>
                                <TextField
                                    classNameInput={'TextFieldInput'}
                                    placeholder={'Beginner'}
                                    label={'Training Level'}
                                    name={'training_level'}
                                    id={'training_level'}
                                    type={'text'}
                                    // onChange={handleInput}
                                    // value={data?.name}
                                    classNameLabel={'label-customer mt-3'}
                                />
                            </form>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                    <button type="button" className="btn btn-primary">
                        Save changes
                    </button>

                </div>
            </div>

        </>
    )
}

export default CardDetailCustomers