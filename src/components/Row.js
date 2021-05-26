import React, {useContext} from 'react'
import Context from '../Store/Context'

const Row = ({Person}) => {
    const {State, Dispatch} = useContext(Context)

    const Select = () => {
        Dispatch({type: 'SelectRow', payload: Person})
    }

    return (
        <tr onClick={Select} style={{backgroundColor: State.Selected === Person ? '#6c757d' : ''}}>
            <th>{Person.id}</th>
            <th>{Person.firstName}</th>
            <th>{Person.lastName}</th>
            <th>{Person.email}</th>
            <th>{Person.phone}</th>
        </tr>
    )
}
export default Row