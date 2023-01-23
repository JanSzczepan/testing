import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

function OrderSummary() {
   const [isChecked, setIsChecked] = useState<boolean>(false)

   const checkboxLabel = (
      <span>
         I agree to <span className='text-primary'>Terms and Conditions</span>
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

export default OrderSummary
