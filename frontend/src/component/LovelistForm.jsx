import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import './LovelistForm.css'

export default function LovelistForm({addVerse}) {
    const [loveVerse, setLoveVerse] = useState('')
    const { register, handleSubmit, reset } = useForm()
    // const { register, handleSubmit, formState: { errors }, reset } = useForm()

    // Transforms the form data from the React Hook Form output to a format Netlify can read
    const encode = (data) => {
        return Object.keys(data)
            .map(
                (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
            )
            .join("&")
    }

    // Handles the post process to Netlify so we can access their serverless functions
    const handlePost = (formData, event) => {
        addVerse() 
        fetch(`/`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "lovelist": "lovelist", ...formData }),
        })
        .then((response) => {
            // navigate("/lovelist/")
            reset()
            console.log("RESPONSE", response)
        })
        .catch((error) => {
            console.log(error)
        })
        event.preventDefault()
    }
    
    

  return (
    <form 
        className="lovelistform"
        onSubmit={handleSubmit(handlePost)}
        name="lovelist"
        method="POST"
        // action="/lovelist/"
        data-netlify="true"
        // netlify-honeypot="got-ya"
    >
        <input type="hidden" name="form-name" value="lovelist" />
        {/* <input type="hidden" value="lovelist" {...register('formId')}/> */}
        <label htmlFor="verse">
            <input 
                {...register('verse', { 
                    required: true, 
                    pattern: {value: /^(?!.*\b(ass|asshole|fuck|boob|penis|dick|pussy|retarded|faggot)\b).*$/}
                })} 
                id="verse"
                name="verse"
                value={loveVerse} 
                onChange={(e) => setLoveVerse(e.target.value)} 
            />
            {/* {errors.verse && <p className='error'>Be kind.</p>} */}
        </label>

        <button className="filter-button" type="submit">Submit</button>

        {/* <label
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
            Don't fill this out if you're human:
            <input tabIndex="-1" {...register("got-ya")} />
        </label> */}

    </form>
  )
}
