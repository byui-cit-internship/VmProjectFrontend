// import "./background.css";
import background from './background.module.css';

function Background() {
    return (
        <div className={background.area} >
            <ul className={background.circles} >
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    )
}
export default Background;
