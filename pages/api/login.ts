// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../data/userPassData.json'

export default function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body

  if (req.method === "POST") {
    try {
      // @ts-ignore
      if (data[username].password === password)
        res.status(200).json({ success: true })
      else {
        res.status(401).json({ success: false })
      }
    } catch {
      res.status(401).json({ success: false })
    }
  }
}
