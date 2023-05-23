import Cover from "../../elements/Card/Cover";
import imgCover from '../../assets/icons/Appreciation 1.svg'
import RadialBar from "../../components/RadialBarCard.jsx/RadialBar";
import Recomended from "../../components/Recomended/Recomended";

const ManageTraining = () => {
    return(
        <div className="container-fluid">
            <Cover
                img={imgCover}
                list1={'Home'}
                text={'Training'}
            />
            <div className="d-flex flex-row justify-content-around">
                <RadialBar/>
                <RadialBar/>
                <RadialBar/>
            </div>
            <div>
                <div className="col-5">
                    <Recomended/>
                </div>
            </div>
        </div>
    )
}

export default ManageTraining