import { Card, Col } from 'react-bootstrap'

type ScoopOptionProps = {
   name: string
   imagePath: string
}

function ScoopOption({ name, imagePath }: ScoopOptionProps) {
   return (
      <Col>
         <Card>
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
