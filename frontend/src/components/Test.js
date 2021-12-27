import React, {useState, useRef, useMemo} from "react"
import TinderCard from "react-tinder-card"
import "./Test.css"
import {AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { RiArrowGoBackFill }  from 'react-icons/ri'
import {MdFavorite} from 'react-icons/md'

export default function Test(props) {
  console.log(props)
  const [currentIndex, setCurrentIndex] = useState(props.personas.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(props.personas.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  let canGoBack = currentIndex < props.personas.length - 1

  let canSwipe = currentIndex >= 0

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
  }

  const swipe = (dir) => {
    if (canSwipe && currentIndex < props.personas.length) {
      childRefs[currentIndex].current.swipe(dir)
    }
  }

  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <>
      <div className="container-all">

        <div className="tarjetasTinder">
          <div className="tarjetasTinderContainer">
            {props.personas.map((character, index) => (
              <TinderCard
                ref={childRefs[index]}
                className="swipe"
                key={character._id}
                preventSwipe={["down", "up"]}
                onSwipe={(dir) => swiped(dir, character.name, index)}
                onCardLeftScreen={() => outOfFrame(character.name, index)}
              >
                <div className="info-card">
                <div
                  style={{backgroundImage: "url(" + character.image + ")"}}
                  className="tarjeta"
                >
                </div>
                
                <h2>{character.name}</h2>
                <h3>Te voy a hackear el corazon</h3>
                </div>
              </TinderCard>
            ))}
          </div>
          <div className="buttons">
            <AiOutlineLeft
              style={{backgroundColor: !canSwipe && "#c3c4d3"}}
              onClick={() => swipe("left")}
            >
            </AiOutlineLeft>
            <RiArrowGoBackFill
              style={{backgroundColor: !canGoBack && "#c3c4d3"}}
              onClick={() => goBack()}
            >
              Volver
            </RiArrowGoBackFill>
            <AiOutlineRight
              style={{backgroundColor: !canSwipe && "#c3c4d3"}}
              onClick={() => swipe("right")}
            >
              Swipe derecha
            </AiOutlineRight>
          </div>
        </div>
      </div>
    </>
  )
}
