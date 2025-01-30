import { createClient } from '@sanity/client'
import 'dotenv/config'

const client = createClient ({
    projectId: 'f588b6e1',
    dataset: 'production',
    apiVersion: '2025-01-14',
    useCdn: false,
    token: import.meta.env.VITE_SANITY_API_TOKEN,
})

export default client