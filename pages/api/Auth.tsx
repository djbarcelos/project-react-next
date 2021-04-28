import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database';

interface IResponseConnect {
  desciption: string;
  status: boolean;
  data?: string;
}

interface IResponseError {
  desciption: string;
  error: {
    code: number;
    message: string;
  };
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseConnect>
): Promise<void> => {
  const {
    method,
    body: { user, password },
  } = req;

  if (method === 'POST') {
    try {
      const { db } = await connect();
      const arryUsers = await db.collection('users').find().toArray();

      const auth = arryUsers.findIndex((elemen) => {
        return user === elemen.username;
      });

      if (auth !== -1)
        res.status(200).json({
          desciption: 'Response',
          status: true,
          data: arryUsers[auth],
        });
      else
        res.status(400).json({
          desciption: 'login fail.',
          status: false,
        });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        desciption: 'Response login',
        status: false,
      });
    }
  }
};
