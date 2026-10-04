import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/Store.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ToggleCartProvider } from './context/ToggleCartContext.tsx'
import { ModalProvider } from './context/ModalContext.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ToggleCartProvider>
        <ModalProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalProvider>
      </ToggleCartProvider>
    </Provider>
  </StrictMode>,
)
