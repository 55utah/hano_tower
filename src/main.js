import React, { useState } from 'react'
import { render } from 'react-dom'

import './index.css'

function Circles(props){
    const array = props.array.map((_, i) => ({index: _.index, color: _.color}))
    return (array.map(a => <div key={a.index} className="circle" style={{backgroundColor: a.color, width: 80 + 10*a.index + 'px'}}>{a.index}</div>))
}


function Tower(props){
    return (<div className={props.hover?'tower towerSelect':'tower'} onClick={() => {props.click()}} style={{border: props.hover?'#55b6ab 4px solid':'', padding: props.hover?'3px':''}}>
        <div style={{height: 'fit-content'}}><Circles array={props.array} /></div>
        </div>)
}


// number, time
function HanTower(props){
    const atomColor = () => {
        return Math.random().toString(16).substring(2, 8)
    }
    const build = num => {
        return new Array(num).fill(0).map((_, index) => {
            return {color: atomColor(), index: index+1}
        })
    }


    const [state, setState] = useState([build(props.num), [], []])
    const [hover, setHover] = useState(-1)
    
    const handleMove = index => {
        if(hover == -1 && state[index].length > 0){
            setHover(index)
        }else if(hover != -1 && index != hover){
            console.log(state)
            if(state[index].length == 0 || state[index][0].index > state[hover][0].index){
                let p = state[hover][0]
                state[hover].shift()
                state[index].unshift(p)
                setState(state)
                setHover(-1)
            }else{
                setHover(-1)
                console.log('fail')
            }
        }else{
            setHover(-1)
            console.log('fail')
        }
        if(state[0].length == 0 && state[1].length == 0 && state[2].length != 0){
            alert('YOU WIN!')
        }
    }
    return (
        <div className="hanTower">
            <span className='tip'>将左边block一个个移到最后边方框内，单次一个,数字大的block不能放在小的上面.</span>
            <div>
                <Tower index={1} hover={hover==0} click={() => handleMove(0)} array={state[0]}></Tower>
                <Tower index={2} hover={hover==1} click={() => handleMove(1)} array={state[1]}></Tower>
                <Tower index={3} hover={hover==2} click={() => handleMove(2)} array={state[2]}></Tower>
            </div>
        </div>
    )
}

render(<HanTower num={7}/>, document.querySelector('#app'))