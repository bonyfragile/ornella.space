export default {
    name: 'dates',
    title: 'Dates',
    type: 'document',
    fields: [
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'information', title: 'Information', type: 'array', of: [{type: 'block'}]},
    ],
};