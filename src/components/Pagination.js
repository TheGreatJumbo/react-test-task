import React, {useContext} from 'react'
import Context from '../Store/Context'

const Pagination = () => {
    const {State, Dispatch} = useContext(Context)

    const SelectPage = (page, e) => {
        e.preventDefault()
        Dispatch({type: 'SelectPage', payload: page})
    }
    return (
        <nav aria-label='Page navigation' style={{display: State.Pages.length === 1 ? 'none' : '', overflow: 'auto'}}>
            <ul className='pagination'>
                {State.Pages.map(page => {
                    return (
                        <li className={`page-item ${State.Page === page ? 'active' : ''}`} key={page}>
                            <a className='page-link' href='#' onClick={() => SelectPage(page, event)}>{page}</a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
export default Pagination