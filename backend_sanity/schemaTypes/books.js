export default {
    name: 'book',
    title: 'Book',
    type: 'document',
    fields: [        
        {
            name: 'title', 
            title: 'Title', 
            type: 'string',
            description: 'The title of the book.'
        },
        {
            name: 'slug', 
            title: 'Slug', 
            type: 'slug', options: {source: 'title',}, validation: (Rule) => Rule.required(),
            description: 'Click after you have typed the title.'
        },
        {
            name: 'shortsubtitle', 
            title: 'Subtitle for Index', 
            type: 'string',
            description: 'Book genre and year. This information will appear in the homepage under the title. Use all small caps.',
        },
        {
            name: 'extendedsubtitle', 
            title: 'Subtitle for Project Card', 
            type: 'string',
            description: 'Book genre, publisher, year and/or other. This information will appear in the project card.'
        },
        {
            name: 'externalLink', 
            title: 'External Link', 
            type: 'url',
            description: 'Accessible link to external source.'
        },
        {
            name: 'description', 
            title: 'Description', 
            type: 'array', of: [{type: 'block'}],
            description: 'Description of the book.'
        },
        {
            name: 'coverImage', 
            title: 'Cover Image', 
            type: 'image',
            description: 'Select one image. This image appears in the homepage.'
        },             
        {
            name: 'images', 
            title: 'Images', 
            type: 'array', of: [{type: 'image'}], options: {sortable: 'true'},
            description: 'Select multiple images. These images appear in the project card.'
        },
    ],
};