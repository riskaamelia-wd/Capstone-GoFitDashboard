import pencil from '../../assets/icons/pencil.svg'
import trash from '../../assets/icons/trash_red.svg'
import ClassLocation from '../Form/ClassLocation'
import AddOnlineClass from '../Form/OnlineClass'

const DetailProduct = ({img, text, date, timeSession, category, onClickDelete, onClickEdit, onClickUpdate}) => {
    return(
        <div 
            className='bg-white d-flex flex-row justify-content-between align-items-center p-2'
            style={{
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '16px'
            }}>
                <div className='d-flex flex-row ms-2'>
                    {img && <img src={img} width={'78vw'} height={'78vh'} className='rounded' alt="" />}
                    <div className='ms-3' style={{fontSize:'12px', color:'#919191'}}>
                        <p className='p-0 m-0 fw-semibold' style={{fontSize:'11px', color:'#6D6D6D'}}>{text}</p>
                        <p className='p-0 m-0'>{date}</p>
                        <p className='p-0 m-0'>{timeSession}</p>
                        <p className='p-0 m-0'>{category}</p>
                    </div>
                </div>
            <div className='me-2'>
                {onClickEdit && 
              <img src={pencil} className='ms-3' onClick={onClickEdit} style={{borderRadius:'10px', border:'5px solid #E9ECEF',}}alt="" />
                }
                {
                    onClickUpdate && 
                    <ClassLocation
                        className={'btn btn-link p-0'}
                        btnModalImg={pencil}
                        style={{borderRadius:'10px', border:'5px solid #E9ECEF',}}
                        classNameImg={'ms-0'}
                        onClick={onClickUpdate}
                    />
                }
                    <img src={trash} className='ms-3' onClick={onClickDelete} style={{borderRadius:'10px', border:'5px solid #E9ECEF'}} alt="" />
            </div>
        </div>
    )
}

export default DetailProduct