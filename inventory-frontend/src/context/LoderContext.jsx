import  { createContext, useContext, useState } from 'react';
import { registerLoader } from '../utils/globalLoader';
import { Loader, Center } from '@mantine/core';
const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

useEffect(() => {
    // Register show/hide globally
    registerLoader({ show: showLoader, hide: hideLoader });
    console.log("loader",loading)
  }, []);

  return (
    <LoaderContext.Provider value={{ loading }}>
      {loading && (
      
        <Center
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255,255,255,0.6)',
          }}
        >
          <Loader size="xl" />
        </Center>
      )}
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);