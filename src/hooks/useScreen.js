import { useState, useEffect } from 'react';

function getScreenDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useScreen() {
  const [ScreenDimensions, setScreenDimensions] = useState(getScreenDimensions());

  useEffect(() => {
    function handleResize() {
      setScreenDimensions(getScreenDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return ScreenDimensions;
}

export default useScreen;