import React, {useState, useRef, useMemo} from "react"
import TinderCard from "react-tinder-card"
import "./Test.css"

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
      <h1>Hola</h1>
      <div className="contenedor">
        <link
          href="https://fonts.googleapis.com/css?family=Damion&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
          rel="stylesheet"
        />
        <h1>React Tinder Card</h1>
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
                <div
                  /*                   style={{backgroundImage: "url(" + character.image + ")"}}
                   */ className="tarjeta"
                >
                  <img src={character.image} />
                  <h3>{character.name}</h3>
                </div>
              </TinderCard>
            ))}
          </div>
          <div className="buttons">
            <button
              style={{backgroundColor: !canSwipe && "#c3c4d3"}}
              onClick={() => swipe("left")}
            >
              Swipe izquierda
            </button>
            <button
              style={{backgroundColor: !canGoBack && "#c3c4d3"}}
              onClick={() => goBack()}
            >
              Volver
            </button>
            <button
              style={{backgroundColor: !canSwipe && "#c3c4d3"}}
              onClick={() => swipe("right")}
            >
              Swipe derecha
            </button>
          </div>
          {lastDirection ? (
            <h2 key={lastDirection} className="infoText">
              You swiped {lastDirection}
            </h2>
          ) : (
            <h2 className="infoText">Swipe para algun lado</h2>
          )}
        </div>
      </div>
    </>
  )
}
