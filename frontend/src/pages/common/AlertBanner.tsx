import { Alert } from 'react-bootstrap'

type AlertMessage =
   | 'string'
   | 'An unexpected error occurred. Please try again later.'
type AlertVariant =
   | 'primary'
   | 'secondary'
   | 'success'
   | 'danger'
   | 'warning'
   | 'info'
   | 'light'
   | 'dark'

type AlertBannerProps = {
   message?: AlertMessage
   variant?: AlertVariant
}

function AlertBanner({
   message = 'An unexpected error occurred. Please try again later.',
   variant = 'danger',
}: AlertBannerProps) {
   return <Alert variant={variant}>{message}</Alert>
}

AlertBanner.defaultProps = {
   message: 'An unexpected error occurred. Please try again later.',
   variant: 'danger',
}

export default AlertBanner
