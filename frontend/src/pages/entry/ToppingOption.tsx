import { ChangeEvent } from 'react'
import { Card, Col, Form, Stack } from 'react-bootstrap'
import { useOrderDetailsContext } from '../../contexts/OrderDetailsContext'
import { OptionProps } from './ScoopOption'

function ToppingOption({ name, imagePath }: OptionProps) {
   const { updateOrderDetails, orderDetails } = useOrderDetailsContext()

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const count = e.target.checked ? 1 : 0
      updateOrderDetails(name, count, 'toppings')
   }

   const checked = !!orderDetails.toppings[name]

   return (
      <Col>
         <Card className='h-100'>
            <Card.Img
               variant='top'
               src={`http://localhost:3030/${imagePath}`}
               alt={`${name} topping`}
            />
            <Card.Body>
               <Stack
                  className='align-items-center justify-content-between'
                  direction='horizontal'
               >
                  <Form.Group controlId={name}>
                     <Form.Check
                        type='checkbox'
                        label={name}
                        checked={checked}
                        onChange={handleChange}
                     />
                  </Form.Group>
               </Stack>
            </Card.Body>
         </Card>
      </Col>
   )
}

export default ToppingOption
