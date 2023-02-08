import { render } from '@testing-library/react'
import { ReactElement } from 'react'
import { OrderDetailsContextProvider } from '../contexts/OrderDetailsContext'

const renderWithContext = (ui: ReactElement, options?: any) =>
   render(ui, { wrapper: OrderDetailsContextProvider, ...options })

export * from '@testing-library/react'

export { renderWithContext as render }
