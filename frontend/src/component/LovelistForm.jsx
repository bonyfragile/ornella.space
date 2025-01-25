import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import './LovelistForm.css'

export default function LovelistForm({addVerse}) {
    const [loveVerse, setLoveVerse] = useState('')
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    

  return (
    <form 
        className="lovelist"
        onSubmit={handleSubmit(addVerse)}
        name="lovelistform"
        method="POST"
        action="/lovelist/"
        data-netlify="true"
        netlify-honeypot="got-ya"
    >
        {/* <input type="hidden" name="lovelist" value="lovelist" /> */}
        <input
            type="hidden"
            name="formId"
            value="lovelist"
            // ref={register()}
        />
        <label htmlFor="verse">
            {/* <p>Love Verse</p> */}
            <input 
                id="verse"
                {...register('verse', { 
                    required: true, 
                    pattern: {value: /^(?!.*\b(ass|asshole|fuck|boob|penis|dick|pussy|retarded|faggot)\b).*$/}
                })} 
                value={loveVerse} 
                onChange={(e) => setLoveVerse(e.target.value)} 
            />
            {errors.verse && <p className='error'>Be kind.</p>}
        </label>

        <label
            htmlFor="got-ya"
            style={{
            position: 'absolute',
            overflow: 'hidden',
            clip: 'rect(0 0 0 0)',
            height: '1px',
            width: '1px',
            margin: '-1px',
            padding: '0',
            border: '0',
            }}
        >
            Don’t fill this out if you're human:
            <input tabIndex="-1" name="got-ya" ref={register()} />
        </label>
        <div><button className="filter-button" type="submit">Submit</button></div>

        {/* <label>Love Verse</label>
        <input type="text" value={loveVerse} onChange={(e) => setLoveVerse(e.target.value)} />
        <input type="submit" value="add verse" /> */}
    </form>
  )
}
