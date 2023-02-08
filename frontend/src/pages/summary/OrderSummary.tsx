import { Fragment } from 'react'
import { ListGroup } from 'react-bootstrap'
import { optionsArr } from '../../constants'
import { useOrderDetailsContext } from '../../contexts/OrderDetailsContext'
import { capitalizeFirstLetter } from '../entry/Options'
import SummaryForm from './SummaryForm'

function OrderSummary() {
   const { totals, total, list } = useOrderDetailsContext()

   return (
      <section className='p-4'>
         <h3 className='mb-3'>Order Summary</h3>
         {optionsArr.map((option) => (
            <Fragment key={option}>
               <h5 className='mb-1'>
                  {capitalizeFirstLetter(option)}: ${totals[option].toFixed(2)}
               </h5>
               <ListGroup className='mb-3'>
                  {list[option].map((item) => (
                     <ListGroup.Item key={item}>{item}</ListGroup.Item>
                  ))}
               </ListGroup>
            </Fragment>
         ))}
         <h5 className='mb-3'>Total: ${total.toFixed(2)}</h5>
         <SummaryForm />
      </section>
   )
}

export default OrderSummary
