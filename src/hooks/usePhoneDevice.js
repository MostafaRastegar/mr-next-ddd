import { useEffect, useState } from 'react';

const usePhoneDevice = () => {
  const [isPhoneDevice, setIsPhoneDevice] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/.test(
      userAgent,
    );

    setIsPhoneDevice(isMobile);
  }, []);

  return isPhoneDevice;
};

export default usePhoneDevice;
