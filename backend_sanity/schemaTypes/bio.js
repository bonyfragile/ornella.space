export default {
    name: 'bio',
    title: 'Bio',
    type: 'document',
    fields: [
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'description', title: 'Description', type: 'array', of: [{type: 'block'}]},
        {name: 'photo', title: 'Photo', type: 'image'},
    ],
};