import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
createRoot(document.getElementById('root')).render(
  // <StrictMode> 
     <MantineProvider withGlobalStyles withNormalizeCSS>
       <Notifications position="top-right"/>
    <App />
    </MantineProvider>
  // </StrictMode>,
)
