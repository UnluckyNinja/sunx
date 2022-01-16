import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async(request: VercelRequest, response: VercelResponse) => {
  const { oid } = request.query
  response.redirect(`/api/bilibili/comment/${oid}/0`)
}
