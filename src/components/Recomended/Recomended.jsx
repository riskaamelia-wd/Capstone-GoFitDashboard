import ListRecomended from "../../elements/Card/ListRecomended"
import img from '../../assets/img/close-up-treadmill-console-with-settings 1.svg'
import add from '../../assets/icons/add.svg'
import './Recomended.css'

const Recomended = ({}) => {
    return(
        <div className="recomended p-4">
            <div className="d-flex flex-row justify-content-between">
                <p className="fs-2 fw-semibold">Recomended</p>
                <img src={add} width={'15vw'} className="me-2" alt="" />
            </div>
            <ListRecomended
                img={img}
                text={'Full Burning Fitness'}
            />
            <ListRecomended
                img={img}
                text={'Full Burning Fitness'}
            />
        </div>
    )
}
export default Recomended