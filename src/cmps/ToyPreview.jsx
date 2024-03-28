import bear from "../assets/img/bear.jpg"
export function ToyPreview({ toy }) {



    return <>
        <img src={bear} alt="" />
        <h3>{toy.name}</h3>
        <span>Price: ${toy.price}</span>
        <button>Add to cart</button>
    </>

}