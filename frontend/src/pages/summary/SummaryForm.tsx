import { useState } from 'react'
import { Button, Form, OverlayTrigger, Popover } from 'react-bootstrap'

function SummaryForm() {
   const [isChecked, setIsChecked] = useState<boolean>(false)

   const popover = (
      <Popover id='terms-and-conditions-popover'>
         <Popover.Body>No ice cream will actually be delivered</Popover.Body>
      </Popover>
   )

   const checkboxLabel = (
      <span>
         I agree to{' '}
         <OverlayTrigger
            trigger={['hover', 'focus']}
            placement='right'
            overlay={popover}
         >
            <span className='text-primary'>Terms and Conditions</span>
         </OverlayTrigger>
      </span>
   )

   return (
      <Form>
         <Form.Group
            className='mb-3'
            controlId='formCheckbox'
         >
            <Form.Check
               type='checkbox'
               label={checkboxLabel}
               checked={isChecked}
               onChange={(e) => setIsChecked(e.target.checked)}
            />
         </Form.Group>
         <Button
            variant='primary'
            type='submit'
            disabled={!isChecked}
         >
            Confirm order
         </Button>
      </Form>
   )
}

export default SummaryForm
