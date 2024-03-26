import { useNavigate } from "react-router-dom"
import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, onRemoveToy }) {
    const navigate = useNavigate()
    return <ul className="toy-list grid">
        {toys.map(toy => (
            <article className="toy grid" key={toy._id}>
                <button onClick={() => onRemoveToy(toy._id)}>✕</button>
                <button onClick={() => navigate(`/toy/edit/${toy._id}`)}>Edit</button>
                <ToyPreview toy={toy} />
            </article>
        ))}
    </ul>
}