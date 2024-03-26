import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { saveToy } from "../store/actions/toy.actions"

export function ToyEdit() {
    const navigate = useNavigate()
    const { toyId } = useParams()
    const [toy, setToy] = useState(toyService.getEmptyToy())

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => console.log('err', err))
    }

    function handleChange({ target }) {
        let { type, name: field, value } = target
        if (type === 'number') value = +value
        setToy(prevToy => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toy)
            .then(navigate('/toy'))
            .catch(err => console.log('err', err))
    }

    if (!toy) return <div>loading...</div>
    return <form onSubmit={onSaveToy} >
        <label htmlFor="name">Toy name:</label><input type="text" name="name" id="name" placeholder="Toy name" value={toy.name} onChange={handleChange} />
        <label htmlFor="price">Price:</label><input type="number" name="price" id="price" placeholder="Price" value={toy.price} onChange={handleChange} />
        <button>Save</button>
    </form>
}