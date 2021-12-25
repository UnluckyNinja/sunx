import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

export default async(request: VercelRequest, response: VercelResponse) => {
  const { userID, offset_dynamic_id = '0' } = request.query
  const res = await axios.get('https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history', {
    params: {
      host_uid: userID,
      offset_dynamic_id,
      need_top: 1,
      platform: 'web',
    },
  })
  response.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate=60')
  response.status(200).send(res.data)
}
