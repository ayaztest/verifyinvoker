import { useState, Fragment } from 'react'
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react'

export default function Faq() {
  const [open, setOpen] = useState(0)

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value)
  }

  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  }

  return (
    <Fragment>
      <Accordion open={open === 1} animate={customAnimation}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          Why am I being asked to do verification?
        </AccordionHeader>
        <AccordionBody>
          To Safely share sensitive company information with our community
          members.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} animate={customAnimation}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          What is the timeframe to complete Verification?
        </AccordionHeader>
        <AccordionBody>15-days to start the process.</AccordionBody>
      </Accordion>
      <Accordion open={open === 3} animate={customAnimation}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          What happens if I don't complete Verfication?
        </AccordionHeader>
        <AccordionBody>
          If you do not complete the Verification process you will be prohibited
          from any form of ownership, rights, privileges, and associated
          interests in the project for which you hold the NFT(s).
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 5} animate={customAnimation}>
        <AccordionHeader onClick={() => handleOpen(5)}>
          When will i have access to the private discord channel?
        </AccordionHeader>
        <AccordionBody>
          Within 15 days, once we complete the verification.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 6} animate={customAnimation}>
        <AccordionHeader className='text-left' onClick={() => handleOpen(6)}>
          Do i have to do test transcation?
        </AccordionHeader>
        <AccordionBody>No! you dont.</AccordionBody>
      </Accordion>
    </Fragment>
  )
}
