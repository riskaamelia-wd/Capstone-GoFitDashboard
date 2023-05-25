import Cover from "../../elements/Card/Cover"
import imgCover from '../../assets/icons/Appreciation 1.svg'
import TextField from "../../elements/TextField/TextField"
import ButtonComponent from "../../elements/Buttons/ButtonComponent"
import './OnlineClass.css'
import ColumnChartWithDataLabel from "../../components/ColumnChart/ColumnChartWithDataLabel"

const DataClass = () => {
    return(
        <div className="container-fluid" style={{backgroundColor:'#F6F6F6'}}>
            <Cover
                text={'Manage Online Class'}
                list1={'Home'}
                list3={'New Class'}
                img={imgCover}
            />
            <div className="justify-content-around d-flex">
                <div className="col-5 mt-5">
                    <label className="mt-3 fs-4 labelTextField">Booking Type</label>
                    <select className="form-select">
                        <option selected>Booking</option>
                        <option value={'Daily'}>Daily</option>
                        <option value={'Weekly'}>Weekly</option>
                        <option value={'Monthly'}>Monthly</option>
                    </select>
                    <TextField
                        // type={''}
                        label={'Booking Type'}
                        classNameLabel={'mt-3 fs-4 labelTextField'}
                    />
                    <TextField
                        type={'date'}
                        label={'Periode of Booking'}
                        classNameLabel={'mt-3 fs-4 labelTextField'}
                    />
                    <TextField
                        // type={''}
                        label={'Time Session'}
                        classNameLabel={'mt-3 fs-4 labelTextField'}
                    />
                    <TextField
                        // type={''}
                        label={'Zoom Code'}
                        classNameLabel={'mt-3 fs-4 labelTextField'}
                    />
                    <p className="fs-4 text-danger mt-3 mb-1 fw-semibold">Status</p>
                    <div className="d-flex flex-row gap-4">
                        <div className="form-check">
                            <input 
                                type="radio"
                                className="form-check-input"
                                name="booked"
                                id="booked"
                        />
                        <label 
                            className="form-check-label"
                            for="booked"
                        >
                            Booked
                        </label>
                        </div>
                        <div className="form-check">
                            <input 
                                type="radio"
                                className="form-check-input"
                                name="bookedCancelled"
                                id="bookedCancelled"
                        />
                        <label 
                            className="form-check-label"
                            for="bookedCancelled"
                            >
                                Booked Cancelled
                            </label>
                        </div>
                    </div>
                    {/* <div style={{backgroundColor:'var(--primary-500)', width:'fit-content'}}> */}
                        <ButtonComponent
                        type={"button"}
                        className={"btn-edit ps-5 pe-5 mt-5"}
                        buttonName={"Edit"}
                        />
                    {/* </div> */}
                </div>
                <div className="col-5 mt-5">
                        <ColumnChartWithDataLabel
                            text={'Daily'}
                        />
                        <ColumnChartWithDataLabel
                            text={'Weekly'}
                        />
                        <ColumnChartWithDataLabel
                            text={'Monthly'}
                        />

                </div>
            </div>
        </div>
    )
}

export default DataClass