import createVm from "./createvm.module.css";
import Background from '../../background';

function CreateVM() {
    return (
        <div className={createVm.createvm}>
            <div className={createVm.container}>
            {/* <Header /> */}
            <h4 className={createVm}>Let's create a VM</h4>
                <div className={createVm.body}>
                {/* <!-- course dropdown -->  */}
                <span className="material-icons createVM">library_books</span>
                <p className="description">1. Select Course</p>
                <select className="course" id="course">
                <option value="Default">- Select -</option>
                </select>
                {/* <!-- template vm dropdown --> */}
                <span className="material-icons createVM">laptop</span>
                <p className="description">2. Select VM</p>
                <select name="templatevm" id="course">
                <option value="Default">-  Select -</option>
                </select>
                {/* <!--Create the VM--> */}
                <span className="material-icons createVM">check_circle</span>
                <p className="description">3. Create the VM</p>
                <input id ="vm_name" type="hidden" value ='Default Vm' />
                <button id="buttonVm">Create</button>
            </div>
            <script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
            </div>
            <Background />
        </div>
    )
}
export default CreateVM;