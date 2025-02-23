import { NEXT_PUBLIC_CMS } from '@/services/helpers'
import {
  createDirectus,
  authentication,
  rest,
} from '@directus/sdk'

export const directus = createDirectus(`${NEXT_PUBLIC_CMS}`)
  .with(authentication('cookie', { credentials: 'include' }))
  .with(rest())