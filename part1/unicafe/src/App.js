import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () =>{
    setGood(good+1)
  }

  const neutralClick = () =>{
    setNeutral(neutral+1)
  }

  const badClick = () =>{
    setBad(bad+1)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick = {goodClick} name = "good"/>
      <Button onClick = {neutralClick} name = "neutral"/>
      <Button onClick = {badClick} name = "bad"/>
      {/* <button onClick={goodClick}>good</button>
      <button onClick={neutralClick}>neutral</button>
      <button onClick={badClick}>bad</button> */}
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

const Button = (props) =>{
  return(
    <button onClick = {props.onClick}>{props.name}</button>   
  )
}

const StatisticsLine = (props) =>{
  return(
    <div>{props.text} {props.value}</div>
  )
}

const Statistics = (props) => {
  let all = props.good+props.neutral+props.bad
  if(all == 0){
    return(
      <div>
      <div>Statistics</div>
      <div>No feedback given</div>
      </div>
    )
  }
  return(
    <div>
      <StatisticsLine text ="good" value = {props.good}/>
      <StatisticsLine text ="neutral" value = {props.neutral}/>
      <StatisticsLine text ="bad" value = {props.bad}/>

      <StatisticsLine text ="all" value = {all}/>
      <StatisticsLine text ="average" value = {(props.good-props.bad)/all}/>
      <StatisticsLine text ="positive%" value = {(props.good/all)*100}/>
      {/* <div>good {props.good}</div>
      <div>neutral {props.neutral}</div>
      <div>bad {props.bad}</div>
      <div>all {all}</div>
      <div>average {(props.good-props.bad)/all}</div>
      <div>positive {(props.good/all)*100} %</div> */}
    </div>
  )
}



export default App