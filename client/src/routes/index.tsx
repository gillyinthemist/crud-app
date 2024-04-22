import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import CrudLogo from '../components/logo';

export default function IndexPage() {
  // RENDER:
  return (
    <>
      <div className="flex bg-blue-950 text-white flex-col min-h-screen min-w-screen justify-center items-center p-10 gap-10">
        <CrudLogo />
        <p className="text-3xl mb-10">Employee management system</p>
        <Link to={'/dashboard'}>
          <Button className="text-white text-xl p-5" variant="bordered">
            Sign in
          </Button>
        </Link>
      </div>
      <p className="text-xl text-white sticky bottom-5 text-center">
        Brought to you by AG
      </p>
    </>
  );
}
