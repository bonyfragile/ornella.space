export default {
    name: 'book',
    title: 'Book',
    type: 'document',
    fields: [
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'genre', title: 'Genre', type: 'string'},
        {name: 'publisher', title: 'Publisher', type: 'string'},       
        {name: 'year', title: 'Year', type: 'number'},
        {name: 'externalLink', title: 'External Link', type: 'url'},
        {name: 'description', title: 'Description', type: 'text'},
        {name: 'coverImage', title: 'Cover Image', type: 'image'},             
        {name: 'images', title: 'Images', type: 'array', of: [{type: 'image'}], options: {sortable: 'true'}},
    ],
};