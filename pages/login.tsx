import { NextPage } from 'next';
import Head from 'next/head';
import LoginView from '../src/components/view/Login';

const Login: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <LoginView></LoginView>
      </main>
    </div>
  );
};

export default Login;
