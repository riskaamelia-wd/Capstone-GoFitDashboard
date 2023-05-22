import powerSetting from '../../assets/icons/power_settings_new.svg'
import "./Card.css"

const CardLogout = ({img, text}) => {
    return(
        <>
            <div className='p-2 rounded d-flex flex-row  align-items-center btnLogout'>
                <img src={img} alt={text} style={{width:'5vw', borderRadius:'50%'}} />
                <div className='ps-3 pe-3'>
                    <p className='m-0 fs-5 fw-semibold' style={{color:'var(--primary-900)'}}>{text}</p>
                    <p className='m-0'>Admin</p>
                </div>
                <img width={'12%'} src={powerSetting} alt="" />
            </div>
        </>
    )
}
export default CardLogout