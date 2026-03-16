import { createClient } from 'contentful'
import { createClient as createManagementClient } from 'contentful-management'

// DELIVERY CLIENT (READ)

export const deliveryClient = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN,
})

// MANAGEMENT CLIENT (WRITE)

export const getManagementClient = () =>
  createManagementClient({
    accessToken: import.meta.env.VITE_CONTENTFUL_MANAGEMENT_TOKEN,
  })