import { Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export default function CrudLogo() {
  const imageUrl = '/logo.png';

  return (
    <Link to={'/'}>
      <Image src={imageUrl} height={80} className="w-40 mb-10" />
    </Link>
  );
}
