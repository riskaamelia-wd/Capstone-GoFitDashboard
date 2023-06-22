import { Card } from "react-bootstrap";
import height_img from "../../assets/icons/height.svg";
import weight_img from "../../assets/icons/monitor_weight.svg";
import goal_weight_img from "../../assets/icons/workspace_premium.svg";
import training_level_img from "../../assets/icons/elevation.svg";
import block from "../../assets/img/block.svg";
import edit from "../../assets/img/edit_square.svg";
import warning from "../../assets/img/warning.svg";
import "../CardCustomers/CardCustomer.css";
import TextFieldPassword from "../TextField/TextFieldPassword";
import TextField from "../TextField/TextField";
import ButtonComponent from "../Buttons/ButtonComponent";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useCallback } from "react";

const CardDetailCustomers = ({ customer, setData }) => {

    // Fetching API Get Data Customer dan class 
    const getData = useCallback(
        async () => {
            await axios
            .get("http://18.141.56.154:8000/admin/classes/tickets", {
                headers: {
                    Authorization: `Bearer ${token.token_jwt}`,
                },
            })
            .then((response) => {
                console.log(response.data.data);
                setData(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
            
        }, []
    )

    console.log(customer.user);
    const token = useSelector((state) => state.tokenAuth);
    const [hovered, setHovered] = useState(false);

    const [id, setId] = useState();

    const [EditData, setEditData] = useState({
        name: "",
        email: "",
        gender: "",
        weight: "",
        height: "",
        goal_weight: "",
        training_level: "",
    });

    // Function edit data customer
    const HandleEdit = (id) => {
        setEditData({
            name: customer.user.name,
            email: customer.user.email,
            gender: customer.user.gender,
            weight: customer.user.weight,
            height: customer.user.height,
            goal_weight: customer.user.goal_weight,
            training_level: customer.user.training_level,
        });
        setId(id);
    }

    // Function Put data customer ke API
    const handleSave = async () => {
        try {
            await axios.put(
                `http://18.141.56.154:8000/users/${id}`,
                {
                    name: EditData.name,
                    gender: EditData.gender,
                    weight: parseFloat(EditData.weight),
                    goal_weight: EditData.goal_weight,
                    height: EditData.height,
                    training_level: EditData.training_level
                },
                {
                    headers: {
                        Authorization: `Bearer ${token.token_jwt}`,
                    },
                }
            );
            alert("Data updated successfully");
            getData();
            setEditData(null);
        } catch (error) {
            console.log(error);
        }
    };

    //Function Delete data customer ke API
    const HandleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this data?")) {
            await axios
                .delete(`http://18.141.56.154:8000/admin/classes/tickets/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token.token_jwt}`,
                    },
                })
                .then(() => {
                    alert("Data deleted successfully");
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    //Function Upload Image ke API users
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);

        try {
            axios.post(
                `http://18.141.56.154:8000/users/profile/${customer.user.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token.token_jwt}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );            

            console.log("File uploaded successfully");
        } catch (error) {

            console.error("Error uploading file:", error);
        }
    };

    // function formatDate(dateString) {
    //     const date = new Date(dateString);
    //     const options = { month: 'long', day: 'numeric' };
    //     const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    //     return formattedDate;
    // }

    // function formatTime(dateString) {
    //     const date = new Date(dateString);
    //     const options = { hour: 'numeric', minute: 'numeric'};
    //     const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
    //     return formattedTime;
    // }

    return (

        <>
            {customer && (
                <Card
                    className={`card-detailCustomers w-100 ${hovered ? "hovered" : ""}`}
                    id="card-customer"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <div className="row">
                        <div className="col-lg-1 mt-2">
                            <img src={`http://18.141.56.154:8000/${customer.user.profile_picture}`} alt="Person" className="rounded-circle" />
                        </div>
                        <div className="col-lg-8 mt-3">
                            <div className="row">
                                <h4 className="name-customers">{customer.user.name}</h4>
                            </div>
                            <div className="row grid-inner-row">
                                <div className="col-3 tight-col">
                                    <img src={height_img} alt="height" />
                                    <span className="text-customer"> {customer.user.height}cm</span>
                                </div>
                                <div className="col-3 tight-col">
                                    <img src={weight_img} alt="weight" />
                                    <span className="text-customer"> {customer.user.weight}kg</span>
                                </div>
                                <div className="col-3 tight-col">
                                    <img src={goal_weight_img} alt="goal_weight" />
                                    <span className="text-customer"> {customer.user.goal_weight}kg</span>
                                </div>
                                <div className="col-4 tight-col">
                                    <img src={training_level_img} alt="training_level" />
                                    <span className="text-customer"> {customer.user.training_level}</span>
                                </div>
                            </div>
                        </div>
                        <div className={`col-lg-3 block-edit`}>
                            {hovered && (
                                <div className="block-edit-content">
                                    <div className="block-edit-inner">
                                        <div className="blockCustomer">
                                            <img
                                                onClick={() => HandleDelete(customer.id)}
                                                src={block}
                                                alt="block"
                                            />

                                        </div>
                                        <div className="editCustomer">
                                            <img
                                                src={edit}
                                                onClick={() => HandleEdit(customer.user.id)}
                                                alt="edit"
                                                data-bs-toggle="modal"
                                                data-bs-target="#ModalEditCustomer"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </Card>
            )}

            {/* Modal Form Edit Customers */}
            {EditData && (

                <div
                    key={customer.id}
                    className="modal fade"
                    id="ModalEditCustomer"
                    tabIndex={-1}
                    aria-hidden="true"
                >
                    <div className="modal-dialog form-edit-customer">
                        <h5 className="textChangeProfile">
                            Change Profile
                        </h5>
                        <div className="modal-content">
                            <div className="modal-body">
                                <form>
                                    <p style={{ textAlign: "center", fontWeight: "600", fontSize: "16px" }}>Change your profile picture from here</p>
                                    <div className="row" style={{ justifyContent: "right" }}>
                                        <div className="col-2">
                                            <img src={`http://18.141.56.154:8000/${customer.user.profile_picture}`} alt="Person" className="rounded-circle" />
                                        </div>
                                        <div className="col-8">
                                            <div style={{ display: "flex" }}>
                                                <input
                                                    type="file"
                                                    id="uploadInput"
                                                    style={{ display: "none" }}
                                                    onChange={handleFileUpload}
                                                />
                                                <ButtonComponent
                                                    type="button"
                                                    className="btnUploadCustomer"
                                                    buttonName="Upload"
                                                    onClick={() => {
                                                        document.getElementById("uploadInput").click();
                                                    }}
                                                />
                                                <ButtonComponent
                                                    type={"button"}
                                                    className={"btnResetImgCustomer"}
                                                    buttonName={"Reset"}
                                                />
                                            </div>
                                            <p style={{ fontSize: "10px", fontWeight: "400", color: "#6D6D6D", paddingTop: "3%" }}>Allowed JPG, GIF or PNG. Max size of 800K</p>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: "16px", fontWeight: "400", color: "#030303", paddingTop: "10px" }}>To change your password please confirm here</p>
                                    <TextFieldPassword
                                        defaultValue={customer.user.password}
                                        label='Current Password'
                                        name='password'
                                        id='password'
                                        classNameLabel={'label-customer'}

                                    />
                                    <p
                                        data-bs-toggle="modal"
                                        data-bs-target="#resetPwCustomer"
                                        style={{ fontWeight: "400", fontSize: "14px", textAlign: "right", color: "#DB4151" }}
                                    >
                                        Set to default password
                                    </p>
                                    <p style={{ fontSize: "16px", fontWeight: "400", color: "#030303" }}>To change your personal detail , edit and save from here</p>
                                    <div className="row">
                                        <div className="col-6">
                                            <TextField
                                                value={EditData.name}
                                                onChange={
                                                    (e) => {
                                                        setEditData((filledState) => ({
                                                            ...filledState,
                                                            name: e.target.value,
                                                        }));
                                                    }
                                                }
                                                classNameInput={'TextFieldInput'}
                                                label={'Name'}
                                                name={'name'}
                                                id={'name'}
                                                type={'text'}
                                                classNameLabel={'label-customer'}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <TextField
                                                placeholder={EditData.email}
                                                onChange={
                                                    (e) => {
                                                        setEditData((filledState) => ({
                                                            ...filledState,
                                                            email: e.target.value,
                                                        }));
                                                    }
                                                }
                                                classNameInput={'TextFieldInput'}
                                                label={'Email'}
                                                name={'email'}
                                                id={'email'}
                                                type={'text'}
                                                classNameLabel={'label-customer'}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-6">
                                            <TextField
                                                value={EditData.gender}
                                                onChange={
                                                    (e) => {
                                                        setEditData((filledState) => ({
                                                            ...filledState,
                                                            gender: e.target.value,
                                                        }));
                                                    }
                                                }
                                                classNameInput={'TextFieldInput'}
                                                label={'Gender'}
                                                name={'gender'}
                                                id={'gender'}
                                                type={'text'}
                                                classNameLabel={'label-customer'}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <TextField
                                                value={EditData.height}
                                                onChange={
                                                    (e) => {
                                                        setEditData((filledState) => ({
                                                            ...filledState,
                                                            height: e.target.value,
                                                        }));
                                                    }
                                                }
                                                classNameInput={'TextFieldInput'}
                                                label={'Height'}
                                                name={'height'}
                                                id={'height'}
                                                type={'text'}
                                                classNameLabel={'label-customer'}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-6">
                                            <TextField
                                                value={EditData.weight}
                                                onChange={
                                                    (e) => {
                                                        setEditData((filledState) => ({
                                                            ...filledState,
                                                            weight: e.target.value,
                                                        }));
                                                    }
                                                }
                                                classNameInput={'TextFieldInput'}
                                                label={'Weight'}
                                                name={'weight'}
                                                id={'weight'}
                                                type={'text'}
                                                classNameLabel={'label-customer'}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <TextField
                                                value={EditData.goal_weight}
                                                onChange={
                                                    (e) => {
                                                        setEditData((filledState) => ({
                                                            ...filledState,
                                                            goal_weight: e.target.value,
                                                        }));
                                                    }
                                                }
                                                classNameInput={'TextFieldInput'}
                                                label={'Goal weight'}
                                                name={'goal_weight'}
                                                id={'goal_weight'}
                                                type={'text'}
                                                classNameLabel={'label-customer'}
                                            />
                                        </div>
                                    </div>
                                    <TextField
                                        value={EditData.training_level}
                                        onChange={
                                            (e) => {
                                                setEditData((filledState) => ({
                                                    ...filledState,
                                                    training_level: e.target.value,
                                                }));
                                            }
                                        }
                                        classNameInput={'TextFieldInput'}
                                        label={'Training Level'}
                                        name={'training_level'}
                                        id={'training_level'}
                                        type={'text'}
                                        classNameLabel={'label-customer mt-3'}
                                    />
                                </form>
                            </div>
                            <div style={{ display: "flex", marginTop: "13%" }}>
                                <div style={{ marginLeft: "52%", marginRight: "5%" }}>
                                    <button
                                        className="btnSaveCustomer"
                                        type="button"
                                        onClick={handleSave}
                                        data-bs-dismiss="modal"
                                    >
                                        Save
                                    </button>
                                </div>
                                <button
                                    className="btnCancelCustomer"
                                    type="button"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>


                    </div>
                </div>
            )}

            {/* Modal reset password */}
            <>
                {/* Modal */}
                <div
                    className="modal fade"
                    id="resetPwCustomer"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog reset-password">
                        <div className="modal-content">
                            <div className="content-reset">
                                <img src={warning} alt="Warning" />
                                <p style={{ fontWeight: "400", fontSize: "16px", color: "#000000", paddingTop: "4%" }}>Are you sure you want to reset password?</p>
                            </div>

                            <div style={{ display: "flex", marginBottom: "7%", marginLeft: "13%" }}>
                                <div style={{ marginRight: "7%" }}>
                                    <ButtonComponent
                                        type={"button"}
                                        className={"btnNoReset"}
                                        buttonName={"No"}
                                        dataBsDismiss={"modal"}
                                    />

                                </div>
                                <ButtonComponent
                                    data-bs-dismiss="modal"
                                    type={"button"}
                                    className={"btnYesReset"}
                                    buttonName={"Yes"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>

        </>
    )
}

export default CardDetailCustomers