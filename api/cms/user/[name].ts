import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

export default async(request: VercelRequest, response: VercelResponse) => {
  const { name } = request.query
  const res = await axios.get(`https://api.storyblok.com/v2/cdn/stories/user/${name}`, {
    params: {
      cv: Date.now(),
      version: 'published',
      token: process.env.STORYBLOK_TOKEN,
    },
  })
  response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=600')
  response.status(200).send(res.data)
}
