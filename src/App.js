import React, {useState} from "react";

export default function App() {
  const [screenValue, setScreenValue] = useState('')
  const [result, setResult] = useState(0)
  const [acumulator, setAcumulator] = useState(0)
  const [operated, setOperated] = useState(false)

  // components
  const Screen = ( val, res ) => {
    return(
      <div style={styleScreen}>
        <span style={styleScreenOp}>{val}</span>
        <span style={styleScreenRes}>{res}</span>
      </div>
    );
  }

  const btn = ( label, onClick ) => {
    return(
      <button style={styleBtn} onClick={onClick}>{label}</button>
    );
  }

  // functions
  const addDigitToScreen=(d)=>{
    let lastDigit = screenValue[screenValue.length-1]
    if ( (lastDigit == '+' || lastDigit == '-' || lastDigit == '*' || lastDigit == '/') && (d == '+' || d == '-' || d == '*' || d == '/') ) {
      return
    }

    if ( (d == '+' || d == '-' || d == '*' || d == '/') && operated ) {
      setOperated(false);
      setScreenValue(result + d);
      return
    }

    if ( operated ) {
      setOperated(false);
      setScreenValue(d);
      return
    }

    const newScreenValue = screenValue+d
    setScreenValue(newScreenValue);
  }

  const clearMemory = (  ) => {
    setOperated(false)
    setScreenValue('')
    setResult(0)
    setAcumulator(0)
  }

  const operation = ( op ) => {
    if (op == 'bs') {
      let vScr = screenValue
      vScr = vScr.substring(0, (vScr.length-1))
      setScreenValue(vScr)
      setOperated(false)
      return
    }
    try {
      const res = eval(screenValue)
      setAcumulator(res)
      setResult(res)
      setOperated(true)
    } catch {
      setResult('ERRO!')
    }

  }

  // styles
  const styleBackground = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    zIndex: 100,
    backgroundColor: '#abc'
  }

  const styleContainer = {
    display: 'flex',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: 300,
    border: '1px solid #000'
  }

  const styleButtuns = {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }

  const styleScreen = {
    display: 'flex',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    width: 260,
    backgroundColor: '#444'
  }

  const styleScreenOp = {
    fontSize: 25,
    color: '#fff',
    height: 20
  }

  const styleScreenRes = {
    fontSize: 50,
    color: '#fff',
    height: 'fit-content'
  }

  const styleBtn = {
    fontSize: 30,
    height: 75,
    width: 75,
    padding: 20,
    backgroundColor: '#000',
    color: '#fff',
    borderColor: '#000',
    textAlign: 'center',
    outline: 'none'
  }

  return(
    <>
      <div style={styleBackground}>
        <div style={styleContainer}>
          <h3>Calculator</h3>
          {Screen(screenValue, result)}
          <div style={styleButtuns}>
          {btn('AC', clearMemory)}
          {btn('(', ()=>addDigitToScreen('(') )}
          {btn(')', ()=>addDigitToScreen(')') )}
          {btn('/', ()=>addDigitToScreen('/') )}
          {btn('7', ()=>addDigitToScreen('7') )}
          {btn('8', ()=>addDigitToScreen('8') )}
          {btn('9', ()=>addDigitToScreen('9') )}
          {btn('*', ()=>addDigitToScreen('*') )}
          {btn('4', ()=>addDigitToScreen('4') )}
          {btn('5', ()=>addDigitToScreen('5') )}
          {btn('6', ()=>addDigitToScreen('6') )}
          {btn('-', ()=>addDigitToScreen('-') )}
          {btn('1', ()=>addDigitToScreen('1') )}
          {btn('2', ()=>addDigitToScreen('2') )}
          {btn('3', ()=>addDigitToScreen('3') )}
          {btn('+', ()=>addDigitToScreen('+') )}
          {btn('<-', ()=>operation('bs') )}
          {btn('0', ()=>addDigitToScreen('0') )}
          {btn('.', ()=>addDigitToScreen('.') )}
          {btn('=', ()=>operation('=') )}
          </div>
        </div>
      </div>
      
    </>
  );
}