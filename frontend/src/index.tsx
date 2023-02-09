import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.min.css'
import AllTheProviders from './contexts/AllTheProviders'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
   <React.StrictMode>
      <AllTheProviders>
         <App />
      </AllTheProviders>
   </React.StrictMode>
)

reportWebVitals()
