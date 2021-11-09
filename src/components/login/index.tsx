import { useEffect } from 'react';
import handler from '../../../pages/api/hello';

const Longin = () => {
  useEffect(() => {
    getLogin;
  }, []);

  const getLogin = async () => {
    const result = await handler();
  };

  return <p>login</p>;
};

export default Longin;
