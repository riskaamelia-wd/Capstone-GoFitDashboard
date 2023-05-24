import './TextField.css'

const Textarea = ({name, id, value, onChange, count}) => {
    return(
        <div className='divTextarea' style={{width:'100%'}}>
            <textarea 
                name={name} 
                id={id}
                onChange={onChange}
                className='form-control borderInput'
                value={value}
                placeholder={'The best weapon against viruses is your immunity. This low-impact cardio exercise help bolster up your immune system.'}
                style={{height:'121px'}}
                maxLength={200}
            >
            </textarea>
            <span className='d-flex justify-content-end'>{count}</span>
        </div>
    )
}
export default Textarea


/*
-- how to use --

const [textarea, setTextarea] = useState('')
const handleTextarea = (e) => {
  setTextarea(e.target.value)
}
let textareaCount = textarea.length

<Textarea
    name='textarea'
    id='textarea'
    value={textarea}
    onChange={handleTextarea}
    count={`${textareaCount} / 200 word`}
/>
*/