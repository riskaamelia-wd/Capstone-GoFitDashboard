import ListRecomended from "../../elements/Card/ListRecomended"
import img from '../../assets/img/close-up-treadmill-console-with-settings 1.svg'
import add from '../../assets/icons/add.svg'
import './Recomended.css'
import CardAdd from "./CardAdd"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRecomended, deleteRecomended } from "../../redux/Slice/recomendedSlice"
import { v4 as uuidv4 } from 'uuid';

const Recomended = ({}) => {

    const dispatch = useDispatch()
    const dataCard = useSelector((state) => state.recomended)

    const [show, setShow] =useState(false)
    const handleShow=() => {
        setShow(prevShow => !prevShow)
    }

    const [data, setData] = useState({
        id:uuidv4(),
        level:'',
        workout:''
    })

    const levelList = [
        {value:'----', text:'Choose Level'},
        {value:"Beginner", text: "Beginner"},
        {value:"Intermediate", text: "Intermediate"},
        {value:"Advanced", text: "Advanced"},   
    ];

    const workoutList = [
        {value:'----', text:'Choose Work Out'},
        {value:"Abs", text: "Abs"},
        {value:"Arm", text: "Arm"},
        {value:"Leg", text: "Leg"},   
    ];

    const reset = () => {
        setData({
            id:uuidv4(),
            level:'',
            workout:''
        })
    }

    const handleChange=(e)=>{
        e.preventDefault()
        const {name, value} = e.target
        setData({
            ...data,
            [name] : value,
        })
        console.log(data);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(window.confirm('Are you sure you want to submit?')){
            dispatch(addRecomended(data))
            alert('added')
        }
        setShow(false)
        reset()

    }

    const handleDelete= (id) => {
        if(window.confirm('Are you sure you want to delete?'))
        console.log(id);
        dispatch(deleteRecomended(id))
        console.log('Data deleted successfully');
    }



    return(
        <div className="shadow p-4">
            <div className="d-flex flex-row justify-content-between">
                <p className="fs-2 fw-bold">Recomended</p>
                <button 
                    onClick={handleShow}
                    className="btnHover border-0 me-2"
                >
                    <img src={add} width={'15vw'} className="" alt="" />
                </button>
            </div>
                {show? 
                    <div className="z-0 position-absolute" style={{right:'10vw'}}
                    >
                        <CardAdd
                            valueLevel={data.level}
                            levelList={levelList}
                            workoutList={workoutList}
                            valueWorkout={data.workout}
                            handleChange={handleChange}
                            nameLevel={'level'}
                            nameWorkout={'workout'}
                            handleSubmit={handleSubmit}
                        /> 
                    </div>
                : ''}
                
            {
                dataCard.length > 0 ? (
                    dataCard?.map((data, id) => {
                        return(
                            <ListRecomended
                                key={id}
                                onDelete={() => handleDelete(data.id)}
                                textTag={data.level}
                                img={img}
                                text={data.workout}
                            />
                        )
                    })
                ) : (
                    <p className="text-center">No Data</p>
                )
            }
        </div>
    )
}
export default Recomended