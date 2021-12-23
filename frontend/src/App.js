import TinderCard from "react-tinder-card"
import "./css.css"

function App() {
  const onSwipe = (direction) => {
    console.log("You swiped: " + direction)
  }

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen")
  }
  return (
    <div className="padre">
      <h1>ITinDev</h1>
      <TinderCard
        className="swipe"
        onSwipe={onSwipe}
        onCardLeftScreen={() => onCardLeftScreen("fooBar")}
        preventSwipe={["up", "down"]}
      >
        <img src="https://preview.redd.it/8zr60tk7ra781.jpg?width=640&crop=smart&auto=webp&s=72838e77707d05157c424377386f866738c2147c" />
      </TinderCard>
    </div>
  )
}

export default App
