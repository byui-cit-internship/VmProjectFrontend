import Background from '../../background';
import Header from '../../header';
import myVm from "./myvm.module.css";

function MyVM() {
    return (
        <div className={myVm.myVm}>
            <div className={myVm.container}>
                <Header />
           
            </div>
            <Background />
        </div>
    )
}

export default MyVM;