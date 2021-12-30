import swal from "sweetalert"
import {useState, useRef} from "react";
import { Modal } from 'react-bootstrap'

export default function Admin(props) {
  const [edit, setEdit] = useState(false)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const email = useRef()
  const name = useRef()
  const lastname = useRef()
  const photo = useRef()
  const country = useRef()
  const age = useRef()
  const gender = useRef()
  const description = useRef()

  function handleEdit(e) {
    e.preventDefault()
    swal({
      title: "Estás seguro?",
      text: "Una vez eliminado, no podras recuperarlo!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willEdit) => {
      if (willEdit) {
        props.editPeople(props.user._id, {
          email: email.current.value,
          name: name.current.value,
          lastName: lastname.current.value,
          image: photo.current.value,
          country: country.current.value,
          age: age.current.value,
          gender: gender.current.value,
          description: description.current.value,
        })
        swal("Poof! El usuario fue eliminado!", {
          icon: "success",
        })
      } else {
        swal("El usuario ha sido salvado!")
      }
    })
  }

  


  return (
    <>
    <div key={props.index} className="usuarios-admin">
      {props.user.admin && <span style={{color: "red"}}>ADMIN</span>}
      {props.user.banned && <span style={{color: "red"}}>BANNED</span>}
      <img
        src={props.user.image}
        style={{width: "50px", height: "50px", objectFit: "cover"}}
        alt="admin user pic"
      />
      {props.user.name} {props.user.lastName}{" "}
      <div className="button-admin-conteiner">
          <button
            onClick={() => {
              swal({
                title: "Estás seguro?",
                text: "Una vez eliminado, no podras recuperarlo! 😰",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                  props.deletePeople(props.user._id, "DEL")
                  swal("Poof! El usuario fue eliminado!", {
                    icon: "success",
                  })
                } else {
                  swal("El usuario ha sido salvado! 😅")
                }
              })
            }}
          >
            🗑️
          </button>
          <button
            onClick={() => {
              setEdit(!edit)
              handleShow()
            }} 
          >
            🖊️
          </button>
          <button
            onClick={() => {
              props.banPeople(props.user._id)
            }}
          >
            ⛔
          </button>
          </div>
    </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Editar el perfil de {props.user.name}:
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="form-admin-conteiner">
          {edit && (
            <form onSubmit={handleEdit}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="inputs-btn"
                ref={name}
                required
                defaultValue={props.user.name}
                minLength="3"
                maxLength="20"
              ></input>
              <label htmlFor="lastname">Lastname</label>
              <input
                type="text"
                id="lastname"
                className="inputs-btn"
                ref={lastname}
                required
                defaultValue={props.user.lastName}
                minLength="3"
                maxLength="20"
              ></input>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="inputs-btn"
                ref={email}
                defaultValue={props.user.email}
                required
              ></input>
              <label htmlFor="photo">Photo</label>
              <input
                type="string"
                id="photo"
                className="btn-signup"
                required
                defaultValue={props.user.image}
                ref={photo}
              ></input>
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                className="inputs-btn"
                required
                defaultValue={props.user.age}
                ref={age}
              ></input>
              <label htmlFor="gender">Gender</label>
              <select
                type="string"
                id="gender"
                className="inputs-btn"
                required
                defaultValue={props.user.gender}
                ref={gender}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <label htmlFor="country">Country</label>
              <select
                type="text"
                id="country"
                className="inputs-btn"
                defaultValue={props.user.country}
                ref={country}
              >
                <option value="Argentina">Argentina</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Brasil">Brasil</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Chile">Chile</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Peru">Peru</option>
              </select>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="inputs-btn"
                required
                defaultValue={props.user.description}
                ref={description}
              ></textarea>
              <Modal.Footer>
              <input type="submit" value="Editar" className="btn-submit" />
              </Modal.Footer>
            </form>
          )}
    </div>
    </Modal.Body>
    </Modal>
    </>
  )
}
