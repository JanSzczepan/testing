import { Card, Col } from 'react-bootstrap'
import { OptionProps } from './ScoopOption'

function ToppingOption({ name, imagePath }: OptionProps) {
   return (
      <Col>
         <Card className='h-100'>
            <Card.Img
               variant='top'
               src={`http://localhost:3030/${imagePath}`}
               alt={`${name} topping`}
            />
            <Card.Body>
               <Card.Text>This is {name} topping</Card.Text>
            </Card.Body>
         </Card>
      </Col>
   )
}

export default ToppingOption
