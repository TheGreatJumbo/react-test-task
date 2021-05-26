import React, {useContext} from 'react'
import Context from '../Store/Context'
import * as Yup from 'yup'
import {useFormik} from 'formik'

const AddForm = () => {
    const {State, Dispatch, CalcPages} = useContext(Context)

    const Inputs = [
        {name: 'id', type: 'number', label: 'ID'},
        {name: 'firstName', type: 'text', label: 'First Name'},
        {name: 'lastName', type: 'text', label: 'Last Name'},
        {name: 'email', type: 'text', label: 'Email'},
        {name: 'phone', type: 'tel', label: 'Phone [(xxx)xxx-xxxx]'}
    ]

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: 1,
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        },
        validationSchema: Yup.object().shape({
            id: Yup.number().required('ID required').positive('positive number expected').integer('integer number expected'),
            firstName: Yup.string().trim().matches('[A-Za-z]', 'letters expected').required('first name required'),
            lastName: Yup.string().trim().matches('[A-Za-z]', 'letters expected').required('last name required'),
            email: Yup.string().trim().required('email required').email('wrong email format'),
            phone: Yup.string().trim().matches('\\([0-9]{3}\\)[0-9]{3}-[0-9]{4}', 'wrong phone format').required('phone number required')
        }),
        onSubmit: values => {
            const Person = {
                ...values,
                address: {
                    streetAddress: '9792 Mattis Ct',
                    city: 'Waukesha',
                    state: 'WI',
                    zip: '22178'
                },
                description: 'et lacus magna dolor...'
            }
            Dispatch({type: 'AddPerson', payload: {person: Person, pages: CalcPages(State.MainArray.length + 1)}})
            Dispatch({type: 'SelectRow', payload: Person})
            Dispatch({type: 'SetAlert', payload: {color: 'success', text: 'New person added successfully'}})
            formik.handleReset()
        },
    })

    return (
        <div className='modal fade' id='Modal' tabIndex='-1' aria-labelledby='ModalLabel' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title' id='ModalLabel'>Insert info about person</h5>
                    </div>
                    <div className='modal-body'>
                        <form onSubmit={formik.handleSubmit}>
                            {Inputs.map(input => {
                                return (
                                    <div className='mb-3' key={input.name}>
                                        <label htmlFor='id' className='form-label'>{input.label}</label>
                                        <input id={input.name} type={input.type} className='form-control' {...formik.getFieldProps(input.name)}/>
                                        {formik.touched[input.name] && formik.errors[input.name] ? <div className='form-text text-danger'>{formik.errors[input.name]}</div> : null}
                                    </div>)
                            })}

                            <div className='d-flex justify-content-between'>
                                <button className='btn btn-danger' onClick={formik.handleReset}>Reset</button>
                                <button className='btn btn-success' type='submit'>Add Person</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddForm
