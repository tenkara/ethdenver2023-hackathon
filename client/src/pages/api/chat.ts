// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

type Data = {
    data: Array<{
        id: number,
        content: string,
        sender: "bot" | "user",
    }>
}

const handler = (async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    try {
        const { data } = await axios.request({
            method: req.method,
            url: process.env.API_URL + '/chat',
            data: req.body,
        }).then(({ data }) => data);

        res.status(200).json(data)
    } catch (error: any) {
        console.error(error)
        res.status(error.status || 500).end(error.message)
    }
})

export default handler;
