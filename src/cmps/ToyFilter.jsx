import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { utilService } from "../services/util.service"
import { toyService } from "../services/toy.service"
import { useSearchParams } from "react-router-dom"
import { setFilterBy } from "../store/actions/toy.actions"
import SearchIcon from '@mui/icons-material/Search'

export function ToyFilter() {
    const [searchParams, setSearchParams] = useSearchParams()
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    useEffect(() => {
        const filterFromParams = toyService.getFilterFromParams(searchParams)
        setFilterBy(getCleanParams(filterFromParams))
        setFilterByToEdit(prevFilter => ({ ...prevFilter, ...getCleanParams(filterFromParams) }))
    }, [searchParams])

    function onSetFilter(_filterBy) {
        setFilterBy(_filterBy)
        setSearchParams(getCleanParams(_filterBy))
    }

    function getCleanParams(filter = filterBy) {
        const cleanParams = {}
        for (const key in filter) {
            if (filter[key]) cleanParams[key] = filter[key]
        }
        return cleanParams
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        // console.log('field, value', field, value)
        if (field === 'labels') {
            if (filterByToEdit.labels.includes(value)) value = filterByToEdit.labels.filter(label => label !== value)
            else value = [...filterByToEdit.labels, value]
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSetInStockFilter(ev, val) {
        ev.preventDefault()
        setFilterByToEdit(prevFilter => ({ ...prevFilter, inStock: val }))
    }

    return <form className="toy-filter flex column" >
        <SearchIcon />
        <input type="search" name="txt" id="txt" placeholder="Search toy..." value={filterByToEdit.txt} onChange={handleChange} />

        <div className="stock-filter">
            Show:
            <div>
                <button className={filterByToEdit.inStock === undefined ? 'selected' : ''} onClick={(ev) => onSetInStockFilter(ev, undefined)}>All</button>
                <button className={filterByToEdit.inStock ? 'selected' : ''} onClick={(ev) => onSetInStockFilter(ev, true)}>In stock</button>
                <button className={filterByToEdit.inStock === false ? 'selected' : ''} onClick={(ev) => onSetInStockFilter(ev, false)}>Out of stock</button>
            </div></div>
        <div>
            Categories:
            {toyService.getLabels().map(label => {
                return <div key={label + 'input'}>
                    <input type="checkbox" name="labels" id={label} value={label.toLowerCase()} onChange={handleChange} checked={filterByToEdit.labels.includes(label.toLowerCase())} />
                    <label htmlFor={label}>{label}</label>
                </div>
            })}
        </div>

    </form>

}