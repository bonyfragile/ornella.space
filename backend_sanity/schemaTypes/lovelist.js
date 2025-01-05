export default {
    name: 'lovelist',
    title: 'Lovelist',
    type: 'document',
    fields: [
        {name: 'text', title: 'Text', type: 'array', of: [{type: 'block'}]},
    ],
};