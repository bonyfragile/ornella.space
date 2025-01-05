import { createClient } from '@sanity/client'

export const client = createClient ({
    projectID: 'f588b6e1',
    dataset: 'production',
    useCdn: true
})