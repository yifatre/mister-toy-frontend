import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { utilService } from "../services/util.service"
import { MultipleSelect } from "./MultiSelect"
import { toyService } from "../services/toy.service"

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        console.log('filterByToEdit', filterByToEdit)
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field } = target
        if (field === 'labels') value = typeof value === 'string' ? value.split(',') : value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSetInStockFilter(ev, val) {
        ev.preventDefault()
        setFilterByToEdit(prevFilter => ({ ...prevFilter, inStock: val }))
    }

    return <section className="toy-filter">
        <form >
            <input type="search" name="txt" id="txt" placeholder="Search toy..." value={filterByToEdit.txt} onChange={handleChange} />
            Show: <button onClick={(ev) => onSetInStockFilter(ev, undefined)}>All</button>
            <button onClick={(ev) => onSetInStockFilter(ev, true)}>In stock</button>
            <button onClick={(ev) => onSetInStockFilter(ev, false)}>Out of stock</button>

            Categories: <MultipleSelect labelsList={toyService.getLabels()} handleChange={handleChange} selectedLabels={filterByToEdit.labels} />
        </form>
    </section >
}