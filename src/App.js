import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container'
import Section from './components/Section'
import Balance from './components/Balance'

const compoundInterest = (deposit, contribution, years, rate) => {
    let total = deposit

    for (let i = 0; i < years; i++) {
        total = (total + contribution) * (rate + 1)
    }
    return Math.round(total)

}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
})

const App = () => {
    const [bal, setBal] = useState('')

    const handleSubmit = ({ deposit, contribution, years, rate }) => {
        const result = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
        setBal(formatter.format(result))
    }
	return (
        <Container>
            <Section>
                <Formik 
                    initialValues={{
                        deposit: '',
                        contribution: '',
                        years: '',
                        rate: '',
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={Yup.object({
                        deposit: Yup.number().required('Required').typeError('Must be a number'),
                        contribution: Yup.number().required('Required').typeError('Must be a number'),
                        years: Yup.number().required('Required').typeError('Must be a number'),
                        rate: Yup.number().required('Required').typeError('Must be a number'),
                    })}
                >
                    <Form>
                        <Input name='deposit' label='Initial investment' />
                        <Input name='contribution' label='Annual contribution' />
                        <Input name='years' label='Length of time in years' />
                        <Input name='rate' label='Estimated interest rate' />
                        <Button type='submit' >Calculate</Button>
                    </Form>
                </Formik>
                {bal !== '' ? <Balance>Balance: {bal}</Balance> : null}
            </Section>
        </Container>
	)
}

export default App;
