export default {
    name: 'lovelist',
    title: 'Lovelist',
    type: 'document',
    fields: [
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'text', title: 'Text', type: 'array', of: [{type: 'block'}]},
    ],
};