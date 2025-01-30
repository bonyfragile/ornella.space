import React, {useState} from 'react'
import './LovelistForm.css'

export default function LovelistForm({addVerse, banned}) {
    const [loveVerse, setLoveVerse] = useState('')
    
    const handleChange = (e) => {
        const input = e.target
        setLoveVerse(input.value)        
        // if (input.validity.valid) input.setCustomValidity("") // Clear any custom validity messages
    }

    // Handles the post process to Netlify so we can access their serverless functions
    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        addVerse(formData) 
        setLoveVerse('')

        fetch("/", {
            method: "POST",
            body: formData,
        })
            .then(() => alert("Form submitted successfully!"))
            .catch((error) => alert("Error submitting form: " + error))
    }

    const handleInvalid = (e) => {
        if (e.target.validity.patternMismatch) {
            e.target.setCustomValidity("Chose your words kindly.")
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
        <label htmlFor="verse">
            <input 
                type="text"
                id="verse"
                name="verse"
                value={loveVerse} 
                required
                // pattern='^(?!.*\b(asshole|anger)\b).*'
                pattern={`^(?!.*\\b(${banned ? banned.join("|") : ""})\\b).*`}
                title="Chose your words kindly."
                onChange={handleChange} 
                onInvalid={handleInvalid}
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
