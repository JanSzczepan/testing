import { Card, Col } from 'react-bootstrap'

export type OptionProps = {
   name: string
   imagePath: string
}

function ScoopOption({ name, imagePath }: OptionProps) {
   return (
      <Col>
         <Card className='h-100'>
            <Card.Img
               variant='top'
               src={`http://localhost:3030/${imagePath}`}
               alt={`${name} scoop`}
            />
            <Card.Body>
               <Card.Text>This is {name} scoop</Card.Text>
            </Card.Body>
         </Card>
      </Col>
   )
}

export default ScoopOption
