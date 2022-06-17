import Background from '../../background';
import styles from './addclass.module.css';

function AddClass() {
  return (
    <div>
    <div class={styles.container}>

    <div id={styles.formheader}>
      <span id={styles.backbtn}>&#8592; back</span>
      <h1 className={styles.h1}>Add Class</h1>
    </div>
    <div id={styles.gridcont}>
    
    {/* <a href="/VMfaculty_dashboard/facultyview.html" class="back">Back</a> */}
      {/* <!-- Course Name--> */}
        <div class={styles.column1}>
          {/* <p class="validation">Required *</p> */}
        <label className={styles.label1} bfor="name">Course Name:</label>
        

        <input className={styles.input} type="text" id="name" name="CourseName" placeholder="Enter your class name" required />

        {/* <!-- Section course --> */}

        <label className={styles.label1}>Course Section:</label>
          <select className={styles.select} name="section" id="section" required>
            <option name="option" value="">Select a section number</option>
            <option name="option" value="1">1</option>
            <option name="option" value="2">2</option>
            <option name="option" value="3">3</option>
            <option name="option" value="4">4</option>
            <option name="option" value="5">5</option>
          </select>

          
        </div>

        <div class={styles.column2}>
        <label className={styles.label1} for="name">Canvas Token:</label>

        <input className={styles.input} type="text" id="canvasToken"  name="canvas_token" placeholder="Enter your class token" required/> 

{/* <!--Course Id--> */}
<label className={styles.label1} for="name">Canvas Course ID:</label>
        <span className={styles.span} role="alert" id="nameError" aria-hidden="true">
        Please add a valid CourseID
        </span>
        <input className={styles.input} type="text" id="courseId" name="CourseId" placeholder="Enter your course Id" required />

        </div>
  
  </div>
      <button type="button" id="submit" className={styles.submitBt}>
        Add
      </button>
    </div>
    {/* // <!-- </form> --> */}

  {/* // <!-- </div> --> */}

  <Background />
</div>
  )
}

export default AddClass;