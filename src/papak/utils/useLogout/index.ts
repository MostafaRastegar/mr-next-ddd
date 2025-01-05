import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

export const useLogOut = (keys: string[]) => {
  const router = useRouter();
  return {
    logout() {
      keys.forEach((item) => cookies.remove(item));
      return router.push('/login');
    },
  };
};
