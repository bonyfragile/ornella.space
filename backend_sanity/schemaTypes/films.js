export default {
    name: 'film',
    title: 'Film',
    type: 'document',
    fields: [
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title',}, validation: (Rule) => Rule.required(),},
        {name: 'genre', title: 'Genre', type: 'string'},
        {name: 'duration', title: 'Duration', type: 'string'},
        {name: 'country', title: 'Country', type: 'string'},
        {name: 'year', title: 'Year', type: 'number'},
        {name: 'externalLink', title: 'External Link', type: 'url'},
        {name: 'description', title: 'Description', type: 'array', of: [{type: 'block'}]},
        {name: 'coverImage', title: 'Cover Image', type: 'image'},             
        {name: 'images', title: 'Images', type: 'array', of: [{type: 'image'}], options: {sortable: 'true'}},
    ],
};