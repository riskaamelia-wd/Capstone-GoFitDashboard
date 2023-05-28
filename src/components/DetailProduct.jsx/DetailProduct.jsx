
import pencil from '../../assets/icons/pencil.svg'
import trash from '../../assets/icons/trash_red.svg'

const DetailProduct = ({img, text, date, time, codeZoom}) => {
    return(
        <div 
            className='d-flex flex-row justify-content-between align-items-center p-2'
            style={{
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '16px'
            }}>
                <div className='d-flex flex-row ms-2'>
                    <img src={img} width={'78vw'} className='rounded' alt="" />
                    <div className='ms-3' style={{fontSize:'12px', color:'#919191'}}>
                        <p className='p-0 m-0 fw-semibold' style={{fontSize:'11px', color:'#6D6D6D'}}>{text}</p>
                        <p className='p-0 m-0'>{date}</p>
                        <p className='p-0 m-0'>{time}</p>
                        <p className='p-0 m-0'>{codeZoom}</p>
                    </div>
                </div>
            <div className='me-2'>
                {/* <div style={{borderRadius:'5px', border:'5px solid #E9ECEF', width:'fit-content'}}> */}
                    <img src={pencil} className='me-4' style={{borderRadius:'10px', border:'5px solid #E9ECEF'}} alt="" />
                {/* </div> */}
                    <img src={trash} style={{borderRadius:'10px', border:'5px solid #E9ECEF'}} alt="" />
            </div>
        </div>
    )
}

export default DetailProduct