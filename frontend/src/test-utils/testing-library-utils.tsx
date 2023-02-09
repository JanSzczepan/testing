import { render } from '@testing-library/react'
import { ReactElement } from 'react'
import AllTheProviders from '../contexts/AllTheProviders'

const renderWithContext = (ui: ReactElement, options?: any) =>
   render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { renderWithContext as render }
