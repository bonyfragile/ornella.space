import { createClient } from '@sanity/client'

const client = createClient ({
    projectId: 'f588b6e1',
    dataset: 'production',
    apiVersion: '2025-01-05',
    useCdn: true
})

export default client