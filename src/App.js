import React, {useReducer, useEffect} from 'react'
import './bootstrap.min.css'
import './bootstrap.bundle.min'
import './index.css'
import MainTable from "./components/MainTable"
import Description from "./components/Description"
import Navbar from './components/Navbar'
import Reducer from './Store/Reducer'
import Context from './Store/Context'
import axios from 'axios'
import Loader from './components/Loader'
import AddForm from './components/AddForm'
import Alert from './components/Alert'

const App = () => {
    const SortBy = (order, Arr, dir = 'straight') => {
        Arr.sort((a, b) => {
            if (typeof(a[order]) !== 'string') return a[order] - b[order]
            if (a[order].toLowerCase() > b[order].toLowerCase()) return 1
            if (a[order].toLowerCase() === b[order].toLowerCase()) return 0
            if (a[order].toLowerCase() < b[order].toLowerCase()) return -1
        })
        if (dir === 'reverse') return Arr.reverse()
        return Arr
    }

    const CalcPages = (ArrLength) => {
        const PagesArr = []
        for (let p = 1; p <= Math.ceil(ArrLength/50); p++) PagesArr.push(p)
        return PagesArr
    }

    const SearchFilter = (Arr, string) => {
        const Search = (row, string) => {
            const includes = []
            for (let i in row) includes.push(row[i].toString().includes(string))
            return includes.includes(true)
        }
        return Arr.map(row => {if (Search(row, string)) return row}).filter(row => row !== undefined)
    }

    const [State, Dispatch] = useReducer(Reducer, {
        BigData: 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D',
        SmallData: 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D',
        SelectedData: null,
        MainArray: [],
        AddedArray: [],
        Pages: [],
        Page: 1,
        Selected: null,
        SortBy,
        Order: {order: '', direction: ''},
        Search: '',
        SearchedArray: [],
        Loader: false,
        Alert: null
    })

    useEffect(() => {
        if (State.SelectedData) {
            Dispatch({type: 'Loading'})
            axios
                .get(State.SelectedData)
                .then(response => {
                    Dispatch({type: 'LoadData', payload: response.data})
                    Dispatch({type: 'SetPages', payload: CalcPages(response.data.length + State.AddedArray.length)})
                    Dispatch({type: 'SelectPage', payload: 1})
                    Dispatch({type: 'Loaded'})
                    Dispatch({type: 'SetAlert', payload: {color: 'success', text: 'Data loaded successfully'}})
                })
                .catch(error => {
                    Dispatch({type: 'Loaded'})
                    Dispatch({type: 'SetAlert', payload: {color: 'danger', text: error.message}})
                })
        }}, [State.SelectedData])

    return (
        <Context.Provider value={{State, Dispatch, SearchFilter, CalcPages, SortBy}}>
            <Navbar/>
            {State.Alert ? <Alert alert={State.Alert}/> : null}
            <div className='container-fluid'>
                <AddForm/>
                {State.Loader ? <Loader/> : null}
                <MainTable/>
                {State.Selected ? <Description/> : null }
            </div>
        </Context.Provider>
    )
}

export default App
