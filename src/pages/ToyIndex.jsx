import { useSelector } from "react-redux"
import { useEffect } from "react"
import { ToyList } from "../cmps/ToyList"
import { loadToys, removeToy } from "../store/actions/toy.actions"
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

    if (!toys) return <div>loading</div>
    return <section className="toy-index grid">
        <ToyFilter />
        <Link to="/toy/edit"><button>Add toy</button></Link>
        <ToyList toys={toys} onRemoveToy={onRemoveToy} />
    </section>
}