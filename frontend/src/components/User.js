import swal from "sweetalert"

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
      <button
        onClick={() => {
          swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              props.deletePeople(props.user._id)
              props.getAllUsers()

              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              })
            } else {
              swal("Your imaginary file is safe!")
            }
          })
        }}
      >
        DELETE USER!
      </button>
    </li>
  )
}
