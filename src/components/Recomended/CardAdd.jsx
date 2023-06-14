import ButtonComponent from "../../elements/Buttons/ButtonComponent"
import './Recomended.css'

const CardAdd = () => {
    return(
        <div className="cardAdd">
            <div className="d-flex flex-column" style={{width:'100%'}}>
                <select>
                    <option disabled selected hidden>Choose Level</option>
                    <option value="">hahai</option>
                    <option value="">dds</option>
                </select>
                <select>
                    <option>Choose Work Out</option>
                </select>
            </div>
            <div className="d-flex flex-row justify-content-around mt-3">
                <ButtonComponent
                    buttonName={'Close'}
                    className={'btn-cancel'}
                />
                <ButtonComponent
                    buttonName={'Save'}
                    className={'btn-save'}
                />
            </div>
        </div>
    )
}

export default CardAdd