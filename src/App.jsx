import "./App.css";
import { useState, useEffect, useCallback ,useRef} from "react";

function App() {
  const [password, setPassword] = useState("aa");
  const [length, setLength] = useState(8);
  const [useNumber, setUseNumber] = useState(false);
  const [useCharacter, setUseCharacter] = useState(false);


  const passwordRef = useRef(null)
  function handelRange(e) {
    setLength(e.target.value);
  }

  function handelCopy() {
    // setLength(e.target.value);
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  function handelNumber() {
    setUseNumber(!useNumber);
  }

  function handelChar() {
    setUseCharacter(!useCharacter);
  }

  const generateRandomPassword = useCallback(() => {
    let pas = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "123456789";
    let char = "@#$&!*^%@@@$####@@#$$%##3";
    if (useNumber) {
      str += num;
    }
    if (useCharacter) {
      str += char;
    }
    // console.log(str)
    for (let i = 0; i < length; i++) {
      pas += str[Math.floor(Math.random() * str.length)];
    }
    // console.log(pas);
    // return pas;
    setPassword(pas);
  }, [length, useCharacter, useNumber]);

  useEffect(() => {
    // setPassword(generateRandomPassword());
    generateRandomPassword();
  }, [length, useCharacter, useNumber]);

  return (
    <div className="w-800 h-480 bg-slate-700 m-auto flex items-center justify-center flex flex-col rounded-xl">
      <div className="w-4/5 h-16 flex justify-between justify-center flex-row rounded-xl ">
        <input
          type="text"
          value={password}
          className="p-2 m-3 text-zinc-950 outline-none rounded-xl w-96"
          readOnly
          ref={passwordRef}
        />
        <button 
        onClick={handelCopy}
        className="bg-orange-500 rounded-xl text-cyan-50 p-2 m-3 font-extrabold">
          Copy
        </button>
      </div>
      <div
        className="w-80 h-4 p-4 flex justify-center
        items-center gap-3
       flex-row  m-1"
      >
        <input
          type="range"
          min={8}
          id="range"
          max="30"
          value={length}
          onChange={handelRange}
        />{" "}
        <label htmlFor="range" className="text-cyan-50">
          length({length})
        </label>
        <input type="checkbox" id="number" onChange={handelNumber} />{" "}
        <label htmlFor="number" className="text-cyan-50">
          Number
        </label>
        <input
          type="checkbox"
          id="character"
          className="text-cyan-50"
          onChange={handelChar}
        />{" "}
        <label htmlFor="character" className="text-cyan-50">
          character
        </label>
      </div>
    </div>
  );
}

export default App;







