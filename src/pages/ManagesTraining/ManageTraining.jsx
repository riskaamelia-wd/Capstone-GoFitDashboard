import Cover from "../../elements/Card/Cover";
import imgCover from '../../assets/icons/Appreciation 1.svg'
import RadialBar from "../../components/RadialBarCard.jsx/RadialBar";
import Recomended from "../../components/Recomended/Recomended";
import { useNavigate } from "react-router-dom";

const ManageTraining = () => {
    const navigate = useNavigate()


    return(
        <div className="container-fluid">
            <Cover
                img={imgCover}
                list1={'Home'}
                text={'Training'}
            />
            <div className="d-flex flex-row justify-content-around mt-5 mb-5">
                <div onClick={() => navigate('/levelDetail')}>
                    <RadialBar/>
                </div>
                <div onClick={() => navigate('/levelDetail')}>
                    <RadialBar/>
                </div>
                <div onClick={() => navigate('/levelDetail')}>
                    <RadialBar/>
                </div>
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