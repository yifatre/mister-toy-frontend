
import { Link } from "react-router-dom"
import toysImg from "../assets/img/toys-home.png"
import doll from "../assets/img/doll.png"
import puzzle from "../assets/img/puzzle.png"
import car from "../assets/img/rc-car.png"
import outdoors from "../assets/img/outdoors.png"
import art from "../assets/img/palette.png"
import { setFilterBy } from "../store/actions/toy.actions"
import { toyService } from "../services/toy.service"
import { useSelector } from "react-redux"


export function HomePage() {
    // const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    // setFilterBy(toyService.getDefaultFilter())



    return <section className="home-main">
        <img src={toysImg} alt="" />
        <Link to="/toy?labels=doll"><img src={doll} alt="" /><span>Dolls</span></Link>
        <Link to="/toy?labels=art"><img src={art} alt="" /><span>Art</span></Link>
        <Link to="/toy?labels=on+wheels"><img src={car} alt="" /><span>On wheels</span></Link>
        <Link to="/toy?labels=outdoor"><img src={outdoors} alt="" /><span>Outdoor</span></Link>
        <Link to="/toy?labels=puzzle"><img src={puzzle} alt="" /><span>Puzzles</span></Link>
    </section>
}