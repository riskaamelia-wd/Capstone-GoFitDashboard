import Cover from "../../elements/Card/Cover";
import imgCover from '../../assets/icons/Appreciation 1.svg'
import ColumnChart from "../../components/ColumnChart/ColumnChart";
import './ManagesTraining.css'
import Textarea from "../../elements/TextField/Textarea";
import { useState } from "react";
import AddLess from "../../components/AddLess/AddLess";
import check from '../../assets/icons/check_success.svg'
import trash from '../../assets/icons/delete_danger.svg'
import PopUp from "../../components/PopUp/PopUp";

const WorkoutDetail = () => {
    const [textarea, setTextarea] = useState('')
    const handleTextarea = (e) => {
    setTextarea(e.target.value)
    }
    let textareaCount = textarea.length
    return(
        <div className="container-fluid">
            <Cover
                img={imgCover}
                text={'Training'}
                list1={'Home'}
                list2={'Advanced'}
                list3={'Arm'}
            />
            <ColumnChart/> 
            <div className="workoutDetailData row d-flex justify-content-around">
                <div className="col-6">
                    <p className="fw-semibold">Introduction</p>
                    <Textarea
                        name='textarea'
                        id='textarea'
                        value={textarea}
                        onChange={handleTextarea}
                        count={`${textareaCount} / 200 word`}
                    />
                    </div>
                    <div className="col-5">
                        <p className="fw-semibold col-12">Info</p>
                        <div className="row">
                            <div className="col-5">
                                <p>How long will it take?</p>
                                <AddLess
                                    qty={'1'}
                                />
                            </div>
                            <div className="col-4">
                                <p>How much workouts?</p>
                                <AddLess
                                    qty={'0'}
                                />
                            </div>
                            <div className="col-2 mt-4">
                                <img src={check} className="me-5 mt-4" alt="" />
                                <img className="mt-4" src={trash} alt="" />
                        </div>
                    </div>
                </div>
                <div className="col-11 mt-5">
                    <table className="table">
                        <thead>
                            <tr>
                                <th><input type="checkbox"/></th>
                                <th>Name</th>
                                <th>Click</th>
                                <th>Previous</th>
                                <th>Next</th>
                                <th>Skip Rest</th>
                                <th>Video</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="checkbox"/></td>
                                <td>Arm Circles</td>
                                <td>1.002.34</td>
                                <td>123.002.34</td>
                                <td>13.002.34</td>
                                <td>52.000</td>
                                <td><PopUp className={'link-underline'} text={'Edit'}/></td>
                            </tr>
                            <tr>
                                <td><input type="checkbox"/></td>
                                <td>Arm Circles</td>
                                <td>1.002.34</td>
                                <td>123.002.34</td>
                                <td>13.002.34</td>
                                <td>52.000</td>
                                <td><PopUp className={'link-underline'} text={'Edit'}/></td>
                            </tr>
                            <tr>
                                <td><input type="checkbox"/></td>
                                <td>Arm Circles</td>
                                <td>1.002.34</td>
                                <td>123.002.34</td>
                                <td>13.002.34</td>
                                <td>52.000</td>
                                <td><PopUp className={'link-underline'} text={'Edit'}/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>   
        </div>
    )
}

export default WorkoutDetail