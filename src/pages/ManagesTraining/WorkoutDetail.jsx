import Cover from "../../elements/Card/Cover";
import imgCover from '../../assets/icons/Appreciation 1.svg'
import ColumnChart from "../../components/ColumnChart/ColumnChart";

const WorkoutDetail = () => {
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
        </div>
    )
}

export default WorkoutDetail