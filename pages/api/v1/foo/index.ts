import { NextApiRequest, NextApiResponse } from 'next'
import fetch from '../../../../fetch'

export default async (
  _req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const url = 'https://api.github.com/emojis'

  const headers = {
    //'key': 'value'',
  }

  try {
    const response: Response = await fetch(url, { headers })
    if (response.headers) {
      addHeaders(res, response.headers)
    }
    res.status(response.status).json(await response.json())
  } catch (e) {
    if (e.response) {
      if (e.response.headers) {
        addHeaders(res, e.response.headers)
      }
      res.status(e.response.status).send(e.response.body)
    } else {
      res.status(500).send({
        message: e.message,
        error: e,
      })
    }
  }
}

const allowedHeaders = [
  'access-control-allow-methods',
  'access-control-allow-origin',
  'access-control-allow-headers',
  'access-control-allow-credentials',
  'cache-control',
  'content-type',
  'content-length',
]

function addHeaders(res: NextApiResponse, headers: Headers) {
  headers.forEach((value, key) => {
    if (Object.prototype.hasOwnProperty.call(headers, key)) {
      if (allowedHeaders.indexOf(key) !== -1) {
        res.setHeader(key, value)
      }
    }
  })
}
