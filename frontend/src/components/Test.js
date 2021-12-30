import React, {useState, useRef, useMemo} from "react"
import TinderCard from "react-tinder-card"
import "./Test.css"
import {useNavigate} from "react-router-dom"
import {ImCross} from "react-icons/im"
import {RiArrowGoBackFill} from "react-icons/ri"
import {MdFavorite} from "react-icons/md"
import swal from "sweetalert"

export default function Test(props) {
  const navigate = useNavigate()
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

  function match(user, idliked) {
    console.log(user)
    if (user.matchs.some((e) => e === idliked)) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willMatch) => {
        if (willMatch) {
          navigate("/messenger", {replace: true})
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          })
        } else {
          swal("Your imaginary file is safe!")
        }
      })
      props.newConver(idliked)
    } else {
      console.log("NO")
    }
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
  console.log(props)

  return (
    <>
      <div className="container-general">
        <div className="tarjetasTinder">
          <div className="tarjetasTinderContainer">
            {props.personas !== "Oops!error" ? (
              props.personas.map((character, index) => (
                <TinderCard
                  ref={childRefs[index]}
                  className="swipe"
                  key={character._id}
                  preventSwipe={["down", "up"]}
                  onSwipe={(dir) => {
                    dir === "right" && props.matchsAndDismatchs(character._id)
                    swiped(dir, character.name, index)
                  }}
                  onCardLeftScreen={() => outOfFrame(character.name, index)}
                >
                  <div className="info-card">
                    <div
                      style={{backgroundImage: "url(" + character.image + ")"}}
                      className="tarjeta"
                    ></div>

                    <h2>{character.name}, {character.age}</h2>
                    <p className="description-user">{character.description}</p>
                  </div>
                </TinderCard>
              ))
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
          <div className="buttons">
            <div className="boton-individual-1">
              <ImCross
                style={{backgroundColor: !canSwipe && "#c3c4d3"}}
                onClick={() => {
                  swipe("left")
                }}
              ></ImCross>
            </div>
            <div className="boton-individual-2">
              <RiArrowGoBackFill
                style={{backgroundColor: !canGoBack && "#c3c4d3"}}
                onClick={() => {
                  goBack()
                  canGoBack &&
                    lastDirection === "right" &&
                    props.matchsAndDismatchs(
                      props.personas[currentIndex + 1]._id
                    )
                }}
              ></RiArrowGoBackFill>
            </div>
            <div className="boton-individual-3">
              <MdFavorite
                style={{backgroundColor: !canSwipe && "#c3c4d3"}}
                onClick={() => {
                  props.personas.length > 0 && swipe("right")

                  props.personas.length > 0 &&
                    match(props.user, props.personas[currentIndex]._id)
                }}
              ></MdFavorite>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
