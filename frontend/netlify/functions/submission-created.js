import client from '../sanityClient'

exports.handler = async function (event, context, callback) {

    try {
        // Parse the form data (if it's coming as JSON)
        const { payload } = JSON.parse(event.body);
        console.log("PAYLOAD", payload);

        // const contact = {
        //     _type: 'lovelist',
        //     verse: payload.data.verse,
        //     }
        //     const result = await client.create(contact).catch((err) => console.log(err))
            
        const newString = payload.data.verse
        const documentId = '62c8f92c-187a-441c-ba31-53ffaffff9df'
        await client
            .patch(documentId) // Target the document by ID
            // .setIfMissing({ arrayField: [] }) // Ensure the array exists
            .append('verses', [newString]) // Append the new string to the array
            .commit() // Commit the changes
            .then((updatedDocument) => {
            console.log('Updated document:', updatedDocument);
            })
            .catch((error) => {
            console.error('Error updating document:', error);
            });

        // Return a success response
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Form submission successful!" }),
        }
    } catch (error) {
        // Log the error for debugging
        console.error("Error occurred:", error);

        // Return a failure response
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
        // // Pulling out the payload from the body
        // const { payload } = JSON.parse(event.body)
    
        // console.log("PAYLOAD",payload)
        
}

    // callback(null, {
    //   statusCode: 200,
    //   body: JSON.stringify({ message: "Form submission successful!" })
    // })
  