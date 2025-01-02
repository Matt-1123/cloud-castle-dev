import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import outputs from "../../../amplify_outputs.json";
import Home from '../../pages/Home'

Amplify.configure(outputs);

export default function Register() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <Home />
          <main>
            <h1>Hello {user?.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        </>
      )}
    </Authenticator>
  );
}