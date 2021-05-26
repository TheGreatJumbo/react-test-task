import React, {useContext} from 'react'
import Context from "../Store/Context";

const DataSelector = () => {
    const {State, Dispatch} = useContext(Context)

    const SelectSmall = () => {
        if (State.SelectedData === State.SmallData)
            Dispatch({type: 'SetAlert', payload: {color: 'info', text: 'Small data is already loaded'}})
        else
            Dispatch({type: 'SelectSmall'})
    }

    const SelectBig = () => {
        if (State.SelectedData === State.BigData)
            Dispatch({type: 'SetAlert', payload: {color: 'info', text: 'Big data is already loaded'}})
        else
            Dispatch({type: 'SelectBig'})
    }

    return (
        <div>
            <button className="btn btn-outline-light m-1" disabled={State.Loader}
                    onClick={SelectSmall}
            >Load small data</button>
            <button className="btn btn-outline-light m-1" disabled={State.Loader}
                    onClick={SelectBig}
            >Load big data</button>
        </div>
    )
}

export default DataSelector