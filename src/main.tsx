import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/Store.tsx'
import { ToggleCartProvider } from './context/ToggleCartContext.tsx'
import { ModalProvider } from './context/ModalContext.tsx'
import App from './App.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ToggleCartProvider>
        <ModalProvider>
          <App/>
        </ModalProvider>
      </ToggleCartProvider>
    </Provider>
  </StrictMode>,
)
