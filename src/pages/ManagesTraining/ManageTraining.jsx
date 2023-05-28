import Cover from "../../elements/Card/Cover";
import imgCover from '../../assets/icons/Appreciation 1.svg'
import RadialBar from "../../components//Chart/RadialBar";
import Recomended from "../../components/Recomended/Recomended";
import { useNavigate } from "react-router-dom";
import Bar from "../../components/Chart/Bar";

const ManageTraining = () => {
    const navigate = useNavigate()
    const seriesBeginner = [95]
    const seriesIntermediate = [70]
    const seriesAdvanced = [73]

    const seriesGym =[90]
    const seriesHome = [256]
    const seriesOuside = [54]


    return(
        <div className="container-fluid">
            <Cover
                img={imgCover}
                list1={'Home'}
                text={'Training'}
            />
            <div className="d-flex flex-row justify-content-around mt-5 mb-5">
                <div onClick={() => navigate('/levelDetail')}>
                    <RadialBar
                    colorBackground={'#FFEFCC'}
                    colorText={'#FF7F00'}
                    series={seriesBeginner}
                    text={'Beginner'}
                    />
                </div>
                <div onClick={() => navigate('/levelDetail')}>
                    <RadialBar
                        colorBackground={'#CCCCFF'}
                        colorText={'#3F3FFF'}
                        series={seriesIntermediate}
                        text={'Intermediate'}
                    />
                </div>
                <div onClick={() => navigate('/levelDetail')}>
                    <RadialBar
                        colorBackground={'#98F2FE'}
                        colorText={'#00ACFC'}
                        text={"Advanced"}
                        series={seriesAdvanced}
                    />
                </div>
            </div>
            <div className="row d-flex justify-content-around ms-5 me-4">
                <div className="col-6 shadow p-3">
                    <p className="fs-2 fw-bold">Best Training</p>
                    <div>
                        <Bar
                            series={seriesHome}
                            text={'Home Workout'}
                            className={'p-0 m-0'}
                            colorBar={'#FFB200'}
                            colorBackgroundBar={'#FFF5CC'}
                        />
                    </div>
                    <div>
                        <Bar
                            series={seriesGym}
                            text={'Gym Workout'}
                            colorBackgroundBar={'#DAD7FE'}
                            colorBar={'#4339F2'}
                        />
                    </div>
                    <div>
                        <Bar
                            series={seriesOuside}
                            text={'Outside Workout'}
                            colorBackgroundBar={'#CCF8FE'}
                            colorBar={'#02A0FC'}
                        />
                    </div>
                    
                </div>
                <div className="col-5">
                    <Recomended/>
                </div>
            </div>
        </div>
    )
}

export default ManageTraining