import React, {useState} from "react";
import Button from 'react-bootstrap/Button'
import {Modal} from 'react-bootstrap'
import TextField from "../../elements/TextField/TextField";
import brokenImage from '../../assets/icons/broken_image.svg'
import './PopUp.css'

export default function PopUp({body,name, text, id, onChangeInput, valueInput, imgBtn, btnText, onClick,className, classNameBtn}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [image, setImage] = useState()
  const [imageFile, setImageFile] = useState()

  const handleImg = (event) => {
    // setImage({[e.target.name] : e.target.files[0]})
    // console.log(image);
    // if (event.target.files && event.target.files[0]) {
    //     setImage({image: URL.createObjectURL(event.target.files[0])});
    //   }
    if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          setImageFile(e.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    }
    if (event.target.name === "image"){
          setImage({[event.target.name] : URL.createObjectURL(event.target.files[0]).image})
      }
      console.log(image);
  }
    return(
        <>
            <Button 

                variant={className}
                onClick={handleShow}>
                <img src={imgBtn} alt="" />
                {text}
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title>New parts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {/* {body} */}
                <div className=" mb-4 box">
                    <label  
                        style={{
                            cursor:'pointer',
                            backgroundImage:`url(${brokenImage})`,
                            backgroundRepeat:'no-repeat',
                            height:'fit-content',
                            width:'100%',
                            backgroundPosition:'center'
                        }}>
                        <input 
                            type="file" 
                            onChange={handleImg} 
                            style={{
                                width:'100%', 
                                display:'none'
                            }} 
                            // value={image}
                            
                            name="image"
                        />
                        <img 
                            // width={'100%'} 
                            src={imageFile} 
                            height={'200px'}
                            style={{width:'fit-content'}} 
                            
                        alt="" />
                    </label>
                </div>
                    <TextField
                        placeholder={'Input title'}
                        type={'text'}
                        name={name}
                        id={id}
                        onChange={onChangeInput}
                        value={valueInput}
                    />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant={classNameBtn} onClick={onClick}>Create</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}