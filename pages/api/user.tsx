import { ObjectID } from 'bson';
import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database';

interface IUser {
  name: string;
  username: string;
  email: string;
}

interface IResponseSucess {
  desciption: string;
  sucess: {
    code: number;
    message: string;
    data: any;
  };
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
  res: NextApiResponse<IResponseSucess | IResponseError>
): Promise<void> => {
  const { method } = req;

  switch (method) {
    //  METHOD GETALL
    case 'GET':
      try {
        const { db } = await connect();

        const response = await db.collection('users').find().toArray();

        res.status(201).json({
          desciption: 'Response GET',
          sucess: { code: 201, message: 'ok.', data: response },
        });
      } catch (error) {
        res.status(400).json({
          desciption: 'Response',
          error: { code: 400, message: 'Error request.' + error },
        });
      }
      break;
    //   METHOD POST
    case 'POST':
      try {
        const { db } = await connect();
        const { name, username, email }: IUser = req.body;

        const response = await db.collection('users').insertOne({
          name,
          username,
          email,
        });

        res.status(201).json({
          desciption: 'Response POST',
          sucess: { code: 201, message: 'ok.', data: response.ops },
        });
      } catch (error) {
        res.status(400).json({
          desciption: 'Response POST',
          error: { code: 400, message: 'Error request.' },
        });
      }
      break;
    case 'PUT':
      try {
        const { db } = await connect();
        const { id } = req.query;
        const { name, username, email }: IUser = req.body;

        const data = await db.collection('users').updateOne(
          { _id: new ObjectID(`${id}`) },
          {
            $set: {
              name,
              username,
              email,
            },
          },
          {
            // upsert: true,
          }
        );

        res.status(201).json({
          desciption: 'Response PUT',
          sucess: { code: 201, message: 'ok.', data: {} },
        });
      } catch (error) {
        res.status(400).json({
          desciption: 'Response PUT',
          error: { code: 400, message: 'Error request.' },
        });
      }
      break;
    case 'DELETE':
      try {
        const { db } = await connect();

        const { id } = req.query;

        await db.collection('users').deleteOne({ _id: new ObjectID(`${id}`) });

        res.status(201).json({
          desciption: 'Response DELETE',
          sucess: { code: 201, message: 'ok.', data: {} },
        });
      } catch (error) {
        res.status(400).json({
          desciption: 'Response DELETE',
          error: { code: 400, message: 'Error request.' },
        });
      }
      break;
    default:
      res.status(500).json({
        desciption: 'Response',
        error: { code: 500, message: 'Internal Server Error.' },
      });
  }
};
