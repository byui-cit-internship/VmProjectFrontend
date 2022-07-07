import createVM from "./createvm.module.css";
import Background from '../../background';
import Header from "../../header";
import LaptopIcon from '@mui/icons-material/Laptop';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function CreateVM() {
    return (
        <div className={createVM.createvm}>
            <div className={createVM.container}>
            {/* <Header /> */}
            <Header />
            <h4 className={createVM.lets}>Let's create a VM</h4>
                <div className={createVM.body}>
                {/* <!-- course dropdown -->  */}
                <span className={createVM.material}><LibraryBooksIcon className={createVM.material} /></span>
                <p className={createVM.description}>1. Select Course</p>
                <select className="course" id={createVM.course}>
                <option value="Default">- Select -</option>
                </select>
                {/* <!-- template vm dropdown --> */}
                <span className={createVM.material}><LaptopIcon className={createVM.material} /></span>
                <p className={createVM.description}>2. Select VM</p>
                <select name="templatevm" id={createVM.course}>
                <option value="Default">-  Select -</option>
                </select>
                {/* <!--Create the VM--> */}
                <span className={createVM.material}><CheckCircleOutlineIcon className={createVM.material} /></span>
                <p className={createVM.description}>3. Create the VM</p>
                <input id ="vm_name" type="hidden" value ='Default Vm' />
                <button id={createVM.buttonVm}>Create</button>
            </div>
            <script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
            </div>
            <Background />
        </div>
    )
}
export default CreateVM;