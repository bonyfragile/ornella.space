import client from '../sanityClient'

exports.handler = async function (event, context, callback) {

  try {
    // Log the request to see the incoming data
    console.log("Event Body:", event.body);

    // Parse the form data (if it's coming as JSON)
    const data = JSON.parse(event.body);

    // Example: Log the parsed data
    console.log("Parsed Data:", data);

    // Return a success response
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Form submission successful!" }),
    };
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

    // // Checking which form has been submitted
    // // const isLovelistForm = payload.data.formId === 'lovelist'

    // // // Build the document JSON and submit it to SANITY
    // // if (isLovelistForm) {
    // //     const contact = {
    // //     _type: 'lovelist',
    // //     text: payload.data.verse,
    // //     }
    // //     const result = await client.create(contact).catch((err) => console.log(err))
        
    // //     const newString = payload.data.verse
    // //     const resultOpt = client
    // //         .patch(documentId) // Target the document by ID
    // //         // .setIfMissing({ arrayField: [] }) // Ensure the array exists
    // //         .append('verses', [newString]) // Append the new string to the array
    // //         .commit() // Commit the changes
    // //         .then((updatedDocument) => {
    // //         console.log('Updated document:', updatedDocument);
    // //         })
    // //         .catch((error) => {
    // //         console.error('Error updating document:', error);
    // //     });
    // // }

    // callback(null, {
    //   statusCode: 200,
    //   body: JSON.stringify({ message: "Form submission successful!" })
    // })
  }