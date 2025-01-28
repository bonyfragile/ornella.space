import client from '../sanityClient'

exports.handler = async function (event, context, callback) {
    // Pulling out the payload from the body
    const { payload } = JSON.parse(event.body)
   
    console.log("PAYLOAD",payload)

    // Checking which form has been submitted
    // const isLovelistForm = payload.data.formId === 'lovelist'

    // // Build the document JSON and submit it to SANITY
    // if (isLovelistForm) {
    //     const contact = {
    //     _type: 'lovelist',
    //     text: payload.data.verse,
    //     }
    //     const result = await client.create(contact).catch((err) => console.log(err))
        
    //     const newString = payload.data.verse
    //     const resultOpt = client
    //         .patch(documentId) // Target the document by ID
    //         // .setIfMissing({ arrayField: [] }) // Ensure the array exists
    //         .append('verses', [newString]) // Append the new string to the array
    //         .commit() // Commit the changes
    //         .then((updatedDocument) => {
    //         console.log('Updated document:', updatedDocument);
    //         })
    //         .catch((error) => {
    //         console.error('Error updating document:', error);
    //     });
    // }

    callback(null, {
      statusCode: 200,
    })
  }