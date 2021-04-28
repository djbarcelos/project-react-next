import { NextPage } from 'next';
import Head from 'next/head';
import NewUser from '../../src/components/view/Login/newUser';

const Criar: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <NewUser></NewUser>
      </main>
    </div>
  );
};

export default Criar;
