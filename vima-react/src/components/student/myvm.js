import Background from '../../background';
import myVM from "./myvm.module.css";

function MyVM() {
    return (
        <div>
            <div className="container">
            {/* <Header /> */}
            <h4 class="lets">Let's create a VM</h4>
            <div class="body">
                {/* <!-- course dropdown -->  */}
                <span class="material-icons createVM">library_books</span>
                <p class="description">1. Select Course</p>
                <select class="course" id="course">
                <option value="Default">- Select -</option>
                </select>
                {/* <!-- template vm dropdown --> */}
                <span class="material-icons createVM">laptop</span>
                <p class="description">2. Select VM</p>
                <select name="templatevm" id="course">
                <option value="Default">-  Select -</option>
                </select>
                {/* <!--Create the VM--> */}
                <span class="material-icons createVM">check_circle</span>
                <p class="description">3. Create the VM</p>
                <input id ="vm_name" type="hidden" value ='Default Vm' />
                <button id="buttonVm">Create</button>
            </div>
            <script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
            </div>
            <Background />
        </div>
    )
}

export default MyVM;