import React, {useState} from 'react'
import './LovelistForm.css'

export default function LovelistForm({addVerse}) {
    const [loveVerse, setLoveVerse] = useState('')
    const [formData, setFormData] = useState({verse: ""})

    // Handles the post process to Netlify so we can access their serverless functions
    const handleSubmit = (e) => {
        console.log("start handlePost", e.target)

        e.preventDefault()
        
        const form = e.target
        console.log("form", form);
        
        const formData = new FormData(form)
        addVerse(formData) 

        fetch("/", {
            method: "POST",
            body: formData,
        })
            .then(() => alert("Form submitted successfully!"))
            .catch((error) => alert("Error submitting form: " + error))
    }

    const handleChange = (e) => {
        setLoveVerse(e.target.value)
        setFormData({ ...formData, [e.target.name]: e.target.value })
        console.log("handleChange", formData, e.target.name, e.target.value);
        
      }


    const handleInvalid = (e) => {
        if (e.target.validity.patternMismatch) {
            e.target.setCustomValidity("You cannot use certain words like hate, anger, or jealousy.")
        } else e.target.setCustomValidity("")
    }
    
  return (
    <form 
        className="lovelistform"
        onSubmit={handleSubmit}
        name="lovelist"
        method="POST"
        data-netlify="true"
    >
        <input type="hidden" name="form-name" value="lovelist" />
        {/* <input type="hidden" value="lovelist" {...register('formId')}/> */}
        <label htmlFor="verse">
            <input 
                pattern='^(?!.*\b(hate|anger|jealous)\b).*'
                required
                id="verse"
                name="verse"
                value={loveVerse} 
                onChange={handleChange} 
                title="Chose your words kindly."
                oninvalid={handleInvalid}
                // placeholder='type something'
            />
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
