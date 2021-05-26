import React, {useState, useContext} from 'react'
import Row from './Row'
import Context from '../Store/Context'
import Pagination from './Pagination'

const MainTable = () => {
    const {State, Dispatch, SearchFilter, SortBy} = useContext(Context)
    const [Thead, changeThead] = useState([
        {class: 'dropend', text: 'ID', order: 'id'},
        {class: 'dropend', text: 'First Name', order: 'firstName'},
        {class: 'dropend', text: 'Last Name', order: 'lastName'},
        {class: 'dropend', text: 'Email', order: 'email'},
        {class: 'dropend', text: 'Phone', order: 'phone'},
    ])

    const ToggleSort = (text, order) => {
        changeThead(Thead.map((btn) => {
            if (btn.text === text) {
                if (btn.class === 'dropend' || btn.class === 'dropup') {
                    btn.class = 'dropdown'
                    Dispatch({type: 'SetOrder', payload: {order: order, direction: 'straight'}})
                    Dispatch({type: 'Sort', payload: SortBy(order, State.MainArray)})
                }
                else {
                    btn.class = 'dropup'
                    Dispatch({type: 'SetOrder', payload: {order: order, direction: 'reverse'}})
                    Dispatch({type: 'Sort', payload: SortBy(order, State.MainArray).reverse()})
                }
            }
            else btn.class = 'dropend'
            return btn
        }))
    }

    return (
        <div className='table-responsive mt-2' style={{display: State.Loader ? 'none' : ''}}>
            <table className='table table-hover caption-top'>
                <caption>[{State.Page}/{State.Pages.length}] List of people {State.Search ? `includes ${State.Search}` : ''}</caption>
                <thead className='table-light'>
                <tr>{
                    Thead.map(th => {return (
                        <th key={th.text}>
                            <div className={th.class}>
                                <button onClick={() => ToggleSort(th.text, th.order)} type='button' className='btn btn-light btn-thead dropdown-toggle'>{th.text}</button>
                            </div>
                        </th>)})
                }</tr>
                </thead>
                <tbody>{
                    SearchFilter(State.MainArray, State.Search).length === 0 ? <tr><th>No items. Change filter or load data or add 1st person</th><th/><th/><th/><th/></tr> :
                    SearchFilter(State.MainArray, State.Search)
                        .map((row, i) => {
                            if (row && i + 1 > (State.Page - 1) * 50 && i + 1 <= State.Page * 50) {
                                return <Row Person={row} key={row.id + row.firstName + row.lastName}/>
                            }
                        })
                }</tbody>
            </table>
            <Pagination/>
        </div>
    )
}
export default MainTable
