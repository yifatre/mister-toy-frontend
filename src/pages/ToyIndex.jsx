import { useSelector } from "react-redux"
import { useEffect } from "react"
import { ToyList } from "../cmps/ToyList"
import { loadToys, removeToy } from "../store/actions/toy.actions"
import { Link } from "react-router-dom"
import { ToyFilter } from "../cmps/ToyFilter"


export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        async function load() {
            try {
                await loadToys(filterBy)
            }
            catch (err) {
                console.log('toy action -> Cannot load toys', err)
                throw err
            }
        }
        load()
    }, [filterBy])

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
        }
        catch (err) {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        }
    }

    if (!toys) return <div>loading</div>
    return <section className="toy-index grid">
        <ToyFilter />
        <Link to="/toy/edit"><button>Add toy</button></Link>
        <ToyList toys={toys} onRemoveToy={onRemoveToy} />
    </section>
}