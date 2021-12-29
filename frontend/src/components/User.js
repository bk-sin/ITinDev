export default function Admin(props) {
  return (
    <li key={props.index}>
      <img
        src={props.user.image}
        style={{width: "50px", height: "50px", objectFit: "cover"}}
        alt="admin user pic"
      />
      {props.user.name}{" "}
      {props.user.admin && <span style={{color: "red"}}>ADMIN</span>}
    </li>
  )
}
