
import { Link } from "react-router-dom"
import toysImg from "../assets/img/lego.png"
import doll from "../assets/img/doll.png"
import puzzle from "../assets/img/puzzle.png"
import car from "../assets/img/rc-car.png"
import outdoors from "../assets/img/outdoors.png"
import art from "../assets/img/palette.png"


export function HomePage() {
  
    return <section className="home-main grid">
        <section className="home-img flex">
            <h3>Where imagination comes to play, one toy at a time</h3>
            <img src={toysImg} alt="" />
        </section>
        <ul className="clean-list flex">
            <li><Link to="/toy?labels=doll"><img src={doll} alt="" /><span>Dolls</span></Link></li>
            <li><Link to="/toy?labels=art"><img src={art} alt="" /><span>Art</span></Link></li>
            <li><Link to="/toy?labels=on+wheels"><img src={car} alt="" /><span>On Wheels</span></Link></li>
            <li><Link to="/toy?labels=outdoor"><img src={outdoors} alt="" /><span>Outdoor</span></Link></li>
            <li><Link to="/toy?labels=puzzle"><img src={puzzle} alt="" /><span>Puzzles</span></Link></li>
        </ul>
    </section>
}