// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

type Data = {
    data: Array<{
        id: number,
        content: string,
        sender: "bot" | "user",
    }>
}

export default withApiAuthRequired(async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    try {
        // Get access token
        var options = {
            method: 'POST',
            url: `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: process.env.API_CLIENT_ID || "",
                client_secret: process.env.API_CLIENT_SECRET || "",
                audience: 'smarthealth'
            })
        };

        const { sp } = req.query;

        const { access_token: accessToken } = await axios.request(options).then(({ data }) => data);
        const { data } = await axios.request({
            method: req.method,
            url: process.env.API_URL +  (sp ? `/sp` : '') + '/chat',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            data: req.body,
        }).then(({ data }) => data);

        res.status(200).json(data)
    } catch (error: any) {
        console.error(error)
        res.status(error.status || 500).end(error.message)
    }
})
