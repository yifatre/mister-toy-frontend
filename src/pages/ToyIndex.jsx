import { ToyList } from "../cmps/ToyList"

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    
    return <section>
        <ToyList />
    </section>
}