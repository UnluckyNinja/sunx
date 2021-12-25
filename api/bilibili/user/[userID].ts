import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

export default async(request: VercelRequest, response: VercelResponse) => {
  const { userID } = request.query
  const res = await axios.get('https://api.bilibili.com/x/space/acc/info', {
    params: {
      mid: userID,
    },
  })
  response.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate=60')
  response.status(200).send(res.data)
}
