import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

export default async (request: VercelRequest, response: VercelResponse) => {
  const { oid, page } = request.query
  // const info = (await axios.get(`/api/bilibili/post/${postID}`)).data
  // let oid
  // if (info.data.card.desc.type === 2) {
  //   oid = info.data.card.desc.rid_str
  // } else { 
  //   oid = postID
  // }

  const res = await axios.get('https://api.bilibili.com/x/v2/reply/main', {
    params: {
      next: page,
      oid: oid,
      type: oid.length >= 10 ? 17 : 11, // 11 for image post, 17 for text only and repost
      mode: 3, // 1 hot + latest, 2 only latest, 3 only hot
      plat: 1,
      _: Date.now(),
    },
  })
  response.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate=60')
  response.status(200).send(res.data)
}
