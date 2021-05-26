import React, {useContext} from 'react'
import Context from '../Store/Context'

const Alert = ({alert}) => {
    const {Dispatch} = useContext(Context)
    return (
        <div className='backdrop'>
            <div className="card card-alert">
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <h5 className={`card-title text-${alert.color}`}>Alert</h5>
                        <button type="button" className="btn-close" aria-label="Close"
                                data-bs-toggle={alert.text === 'New person added successfully' ? 'modal' : ''}
                                data-bs-target={alert.text === 'New person added successfully' ? '#Modal' : ''}
                                onClick={() => Dispatch({type: 'SetAlert', payload: null})}
                        />
                    </div>
                    <h6 className='card-subtitle mb-2 text-muted'>{alert.color}</h6>
                    <p className='card-text'>{alert.text}</p>
                </div>
            </div>
        </div>
    )
}

export default Alert