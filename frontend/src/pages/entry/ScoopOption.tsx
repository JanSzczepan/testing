import { ChangeEvent, useState } from 'react'
import { Card, Col, Form, Stack } from 'react-bootstrap'
import { useOrderDetailsContext } from '../../contexts/OrderDetailsContext'

export type OptionProps = {
   name: string
   imagePath: string
}

function ScoopOption({ name, imagePath }: OptionProps) {
   const { updateOrderDetails, orderDetails } = useOrderDetailsContext()
   const [value, setValue] = useState<number>(orderDetails.scoops[name] || 0)

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(Number(e.target.value))

      updateOrderDetails(name, Number(e.target.value), 'scoops')
   }

   return (
      <Col>
         <Card className='h-100'>
            <Card.Img
               variant='top'
               src={`http://localhost:3030/${imagePath}`}
               alt={`${name} scoop`}
            />
            <Card.Body>
               <Form.Group controlId={name}>
                  <Stack
                     direction='horizontal'
                     className='align-items-center justify-content-between'
                  >
                     <Form.Label>{name}</Form.Label>
                     <Form.Control
                        style={{ width: '100px' }}
                        type='number'
                        value={value}
                        onChange={handleChange}
                        min={0}
                        max={10}
                     />
                  </Stack>
               </Form.Group>
            </Card.Body>
         </Card>
      </Col>
   )
}

export default ScoopOption
