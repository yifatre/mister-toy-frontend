import { useSelector } from "react-redux"
import { ToyList } from "../cmps/ToyList"
import { useEffect } from "react"
import { loadToys, removeToy, setFilterBy } from "../store/actions/toy.actions"
import { useNavigate, Link } from "react-router-dom"
import { ToyFilter } from "../cmps/ToyFilter"

export function ToyIndex() {
    const navigate = useNavigate()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys(filterBy)
            .catch(err => console.log('err', err))
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(console.log('success'))
            .catch(err => console.log('err', err))
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }


    if (!toys) return <div>loading</div>
    return <section>
        <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} />
        <Link to="/toy/edit"><button>Add toy</button></Link>
        <ToyList toys={toys} onRemoveToy={onRemoveToy} />
    </section>
}