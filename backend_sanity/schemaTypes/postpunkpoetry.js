export default {
    name: 'postpunkpoetry',
    title: 'Post Punk Poetry',
    type: 'document',
    fields: [
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'genre', title: 'Genre', type: 'string'},               
        {name: 'year', title: 'Year', type: 'number'},
        {name: 'externalLink', title: 'External Link', type: 'url'},
        {name: 'description', title: 'Description', type: 'array', of: [{type: 'block'}]},
        {name: 'coverImage', title: 'Cover Image', type: 'image'},        
    ],
};