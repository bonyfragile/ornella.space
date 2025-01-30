export default {
    name: 'lovelist',
    title: 'Lovelist',
    type: 'document',
    fields: [
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'text', title: 'Text', type: 'array', of: [{type: 'block'}]},
        {name: 'verses', title: 'Submitted Verses', type: 'array', of: [{type: 'string'}]},
        {name: 'banned', title: 'Banned Words', type: 'array', of: [{type: 'string'}]},
    ],
};