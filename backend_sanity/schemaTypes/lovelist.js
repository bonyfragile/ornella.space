export default {
    name: 'lovelist',
    title: 'Lovelist',
    type: 'document',
    fields: [
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'verses', title: 'Submitted Verses', type: 'array', of: [{type: 'string'}]},
        {name: 'banned', title: 'Banned Words', type: 'array', of: [{type: 'string'}]},
    ],
};