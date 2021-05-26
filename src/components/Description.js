import React, {useContext} from 'react'
import Context from '../Store/Context'

const Description = () => {
    const {State, Dispatch, SearchFilter} = useContext(Context)

    const Page = Math.ceil((SearchFilter(State.MainArray, State.Search).indexOf(State.Selected) + 1) / 50)

    const FindPage = () => {
        if (State.Pages.includes(Page)) Dispatch({type: 'SelectPage', payload: Page})
        else Dispatch({type: 'SetAlert', payload: {color: 'info', text: 'This Person was filtered'}})
    }

    return (
        <div className='card mb-3' style={{display: State.Loader ? 'none' : ''}}>
            <div className='card-body'>
                <div className='d-flex justify-content-between'>
                    <p>Selected User: <b>{State.Selected?.firstName} {State.Selected?.lastName}</b></p>
                    <button type='button' className='btn-close' aria-label='Close'
                            onClick={() => {Dispatch({type: 'UnselectRow', payload: null})}}
                    />
                </div>
                <div className="form-floating">
                    <textarea className="form-control" placeholder="Leave a comment here" id="Description"
                              style={{height: '110px'}} readOnly={true} value={State.Selected?.description}/>
                    <label htmlFor="Description">Description</label>
                </div>
                <p>Address: <b>{State.Selected?.address.streetAddress}</b></p>
                <p>City: <b>{State.Selected?.address.city}</b></p>
                <p>State: <b>{State.Selected?.address.state}</b></p>
                <p>Zip code: <b>{State.Selected?.address.zip}</b></p>
                {Page !== State.Page ? <button className='btn btn-outline-secondary btn-sm' onClick={FindPage}>Show in table</button> : null}
            </div>
        </div>
    )
}
export default Description