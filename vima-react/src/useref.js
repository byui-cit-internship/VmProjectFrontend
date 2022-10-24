import { useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import styles from "./useref.module.css";

function App() {
  // O P T I O N 1
  const inputElement = useRef();
  const focusInput = () => {
    inputElement.current.focus();
  };

  // F O R M
  const formV = useRef();
  const grabInputs = () => {
    formV.current.focus();
    console.log("it worked");
  };

  //   function handleInput(e) {
  //     const input = e.target;
  //     const nextInput = input.nextElementSibling;
  //     if (nextInput && input.value) {
  //       nextInput.focus();
  //       if (nextInput.value) {
  //         nextInput.select();
  //       }
  //     }
  //   }

  //   function handlePaste(e) {
  //     e.preventDefault();
  //     const paste = e.clipboardData.getData("text");
  //     inputs.forEach((input, i) => {
  //       input.value = paste[i] || "";
  //     });
  //   }

  //   function handleBackspace(e) {
  //     const input = e.target;
  //     if (input.value) {
  //       input.value = "";
  //       return;
  //     }

  //     input.previousElementSibling.focus();
  //   }

  //   function handleArrowLeft(e) {
  //     const previousInput = e.target.previousElementSibling;
  //     if (!previousInput) return;
  //     previousInput.focus();
  //   }

  //   function handleArrowRight(e) {
  //     const nextInput = e.target.nextElementSibling;
  //     if (!nextInput) return;
  //     nextInput.focus();
  //   }

  //   formV.addEventListener("input", handleInput);
  //   grabInputs[0].addEventListener("paste", handlePaste);

  //   inputs.forEach((input) => {
  //     input.addEventListener("focus", (e) => {
  //       setTimeout(() => {
  //         e.target.select();
  //       }, 0);
  //     });

  //     input.addEventListener("keydown", (e) => {
  //       switch (e.keyCode) {
  //         case KEYBOARDS.backspace:
  //           handleBackspace(e);
  //           break;
  //         case KEYBOARDS.arrowLeft:
  //           handleArrowLeft(e);
  //           break;
  //         case KEYBOARDS.arrowRight:
  //           handleArrowRight(e);
  //           break;
  //         default:
  //       }
  //     });
  //   });

  // O P T I O N 2
  //   const ref = useRef(null);
  //   useEffect(() => {
  // 👇️ use a ref (best)
  // const el2 = ref.current;
  // console.log(el2);

  // 👇️ use document.getElementById()
  // should only be used when you can't set a ref prop on the element
  // (you don't have access to the element)
  //     const el = document.getElementById("container");
  //     console.log(el);
  //   }, []);

  //   const form = document.querySelector("form");
  //   const inputs = form.querySelectorAll("input");
  //   const KEYBOARDS = {
  //     backspace: 8,
  //     arrowLeft: 37,
  //     arrowRight: 39,
  //   };

  return (
    <>
      {/* O P T I O N 1 */}
      <div className={styles.w3schools}>
        <input type="text" ref={inputElement} />
        <input
          type="tel"
          ref={formV}
          required
          maxlength="1"
          pattern="[0-9]"
          id="formControl"
        />
        <button onClick={focusInput}>Focus Input</button>
        <button onClick={grabInputs}>grab inputs</button>
      </div>

      {/* F O R M */}
      <div className={styles.verifyEmail}>
        <form action="#" className={styles.form}>
          <h4 class="text-center mb-4">Enter your code</h4>
          <div className={styles.dflex}>
            <input
              required
              type="tel"
              maxlength="1"
              pattern="[0-9]"
              id="formControl"
            />
            <input type="tel" maxlength="1" pattern="[0-9]" id="formControl" />
            <input type="tel" maxlength="1" pattern="[0-9]" id="formControl" />
            <input type="tel" maxlength="1" pattern="[0-9]" id="formControl" />
            <input type="tel" maxlength="1" pattern="[0-9]" id="formControl" />
          </div>

          <button type="submit" className={styles.btn}>
            Verify account
          </button>
        </form>
      </div>

      {/* O P T I O N 2 */}
      {/* <div>
        <div ref={ref} id="container">
          <h2>Hello</h2>
        </div>
      </div> */}
    </>
  );
}

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);

/*
By clicking the button,
the input field will get focus.
*/

export default App;
