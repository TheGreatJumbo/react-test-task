import React, {useContext, useRef, useState} from 'react'
import Context from '../Store/Context'
import DataSelector from "./DataSelector";

const Navbar = () => {
    const {State, Dispatch, SearchFilter, CalcPages} = useContext(Context)
    const [InputValue, changeInput] = useState('')
    const INPUT = useRef(null)
    const Search = e => {
        e.preventDefault()
        Dispatch({
            type: 'Search',
            payload: {
                Search: InputValue,
                Pages: CalcPages(
                    SearchFilter(State.MainArray, InputValue).length
                )
            }
        })
        Dispatch({type: 'SelectPage', payload: 1})
    }
    const Cancel = e => {
        e.preventDefault()
        INPUT.current.value = ''
        Dispatch({
            type: 'Search',
            payload: {
                Search: '',
                Pages: CalcPages(State.MainArray.length)
            }
        })
        Dispatch({type: 'SelectPage', payload: 1})
    }

    return (
        <nav className='navbar navbar-light bg-secondary'>
            <div className='container-fluid'>
                <form className='d-flex'>
                    <input className='form-control me-2' ref={INPUT} type='search' placeholder='Search'
                           onChange={() => changeInput(event.target.value)} aria-label='Search'
                    />
                    <button className='btn btn-outline-light' type='submit'
                            onClick={() => Search(event)} disabled={!INPUT.current?.value}
                    >Search</button>
                    <button className='btn btn-outline-light ms-2'
                            onClick={() => Cancel(event)} style={{display: State.Search ? '' : 'none'}}
                    >Cancel</button>
                </form>
                <DataSelector/>
                <button className='btn btn-outline-light' data-bs-toggle="modal" data-bs-target="#Modal"

                >Add person</button>
            </div>

        </nav>
    )
}
export default Navbar