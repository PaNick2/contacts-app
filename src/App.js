import './App.css';
import React, { useState, useEffect } from 'react';
import Row from './components/Row';
import Numbers from './components/Numbers';


function App() {

  const [nameInput, setName] = useState("");
  const [emailInput, setEmail] = useState("");
  const [addressInput, setAddress] = useState('');
  const [mobileInput, setMobile] = useState('');
  const [editMode, setEdit] = useState(false);
  const [mobileList, setMobileList] = useState([])
  const [users, setUsers] = useState(
    [])


  // Grabs the users from the database
  useEffect(() => {
    getContacts();
  }, [editMode])


  /* ======================================== Functions needed to check the inputs ==============================*/
  // Checking the validity of inputs 
  function validityCheck() {
    const namePattern = /^[a-zα-ωάέή΄ίύόώ ,.'-\W]+$/i
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const addressPattern = /^[a-zα-ωάέή΄ίύόώ ,.'-]+\s\d{1,4}$/i
    const mobilePattern = /^\d{10}$/
    if (!namePattern.test(nameInput)) {
      alert("Name is not in the correct form. \n 'Firstname Lastname'")
      return false;
    } else if (!emailPattern.test(emailInput)) {
      alert("Email is not in the correct form. \n 'example@mail.com'")
      return false;
    } else if (!addressPattern.test(addressInput) && addressInput.length) {
      alert("Address is not in the correct form. \n 'Address 99'")
      return false;
    } else if (!mobilePattern.test(mobileInput) && mobileInput.length) {
      alert("Mobile number is not in the correct form. \n '6988067200'")
      return false;
    } else {
      return true
    }
  }


  // Checks if the users already exists
  function userExists() {
    for (var i = 0; i < users.length; i++) {
      if (emailInput === users[i]["email"] && !editMode) {
        if (window.confirm("This contact already exists. Are you sure you want to edit the contact?")) {
          setEdit(true);
        }
        return true;
      } else if (emailInput === users[i]["email"] && !editMode) {
        return true;
      } else {
        return false;
      }
    }
  }


  // Check if name or email fields are blank
  function blankCheck() {
    if (nameInput === "" && emailInput === "") {
      alert("Name and email can't be blank")
      // document.getElementById('nameError').innerHTML = "Name and email can't be blank";
      return true;
    } else if (nameInput === "") {
      alert("Name can't be blank")
      return true;
    } else if (emailInput === "") {
      alert("Email can't be blank")
      return true;
    } else {
      return false;
    }
  }
  // All checks gathered
  function allChecks() {
    if (!userExists() && validityCheck() && !blankCheck()) {
      return true;
    } else {
      return false;
    }
  }
  /* ======================================================================*/

  function clearInputs() {
    setName("");
    setEmail("");
    setAddress('');
    setMobile([]);
    setMobileList([]);
  }

  // Grabs the contacts from the Database
  function getContacts() {
    fetch('http://localhost:3001/', {
      method: 'GET',
      headers: { 'Content-type': 'application/JSON' }
    })
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(err => console.log(err))

    // console.log(users)
    // console.log(mobileList)
  }


  // When the sumbit button is pressed => Checks the inputs => sends the contact to the db => clears the input fields
  function onSubmit() {
    console.log("MObile list before is: ", mobileList)
    // onAdd()
    // if (mobileList != null) {
    //   console.log("I'm in")
    //   setMobileList([mobileInput])
    // }
    console.log("MObile list after is: ", mobileList)
    const newUser = {
      name: nameInput,
      email: emailInput,
      address: addressInput,
      mobile: mobileList
    }
    if (allChecks()) {
      const tempUsers = [...users]
      tempUsers.push(newUser)
      setUsers(tempUsers)
      fetch('http://localhost:3001/', {
        method: 'POST',
        headers: { 'Content-type': 'application/JSON' },
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          address: newUser.address,
          mobile: `{${newUser.mobile}}`
        })
      })
      clearInputs()
    }
  }


  function onEdit() {
    const newUser = {
      name: nameInput,
      email: emailInput,
      address: addressInput,
      mobile: mobileList
    }
    if (allChecks()) {
      const tempUsers = [...users]
      tempUsers.push(newUser)
      setUsers(tempUsers)
      fetch(`http://localhost:3001/${emailInput}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/JSON' },
        body: JSON.stringify({
          newName: newUser.name,
          newEmail: newUser.email,
          newAddress: newUser.address,
          newMobile: `{${newUser.mobile}}`
        })
      })
        .then(alert('User edited successfully'))
        .catch(err => alert('Something went wrong while trying to edit'))
      setEdit(false)
      clearInputs()
    }
  }

  function onDelete() {
    console.log("I am in onDelete", "\n", `The emailInput is ${emailInput}`)
    if (userExists) {
      if (window.confirm("Do you really want to delete this contact")) {
        fetch(`http://localhost:3001/${emailInput}`, {
          method: 'DELETE'
        })
          .then(alert('User deleted successfully'))
          .catch(err => alert(err))
        setEdit(false)
        clearInputs()
      }
    } else {
      alert('User does not exist')
    }
  }


  function onAdd() {
    console.log("Add is running")
    const mobilePattern = /^\d{10}$/
    if (mobilePattern.test(mobileInput) && mobileInput.length && !mobileList.includes(mobileInput)) {
      setMobileList([...mobileList, mobileInput])
      setMobile('')
    } else {
      alert("Something went wrong while adding")
    }
  }

  const addedNumbers = mobileList != null ? mobileList.map((number, i) => {
    return (
      <Numbers
        key={i}
        Number={number}
      />
    )
  }) : ""



  function onClear() {
    setMobileList([])
  }

  const xIcon = () => {
    setEdit(!editMode)
  }

  const handleEditor = () => {
    if (userExists) {
      alert("This contact doesn't exist, so it can't be edited")
    } else {
      setEdit(!editMode)
    }
  }

  // Finds the information of the email that was clicked
  function clickedRow(data) {
    console.log(data)
    for (var i = 0; i < users.length; i++) {
      if (users[i]['email'] === data) {
        setName(users[i]['name'])
        setEmail(users[i]['email'])
        setAddress(users[i]['address'])
        setMobileList(users[i]['mobile'])
      }
    }
    setEmail(data)
    setEdit(true)
  }


  const rows = mobileList != null ? users.map((user, i) => {
    const tempMobileList = []
    for (let i = 0; i < mobileList.length; i++) {
      if (user["email"] === mobileList[i]["email"]) {
        tempMobileList.push(mobileList[i]["mobile"])
      }
    }
    // console.log(users[i].mobile)
    // console.log(`${user["email"]} has these mobile numbers`, tempMobileList)
    // setMobileList(tempMobileList)
    return (<Row
      key={i}
      name={users[i].name}
      email={users[i].email}
      address={users[i].address}
      mobile={users[i].mobile}
      clickedRow={clickedRow}

    />)
  }) : ""


  return (
    <>
      {/* ============================== Form ==============================*/}
      <div className='main-container'>
        <div className="form-container">
          <form>
            <div className="title">
              <h2>Add new contact</h2>
            </div>
            <div className="info">
              <input
                id='nameInput'
                className="fname"
                type="text"
                name="name"
                placeholder="Full name"
                value={nameInput}
                pattern="[a-zA-Z]*"
                onChange={e => setName(e.target.value)}
                required
              />
              <p id="nameError className='error-message'"></p>
              <input
                id='emailInput'
                type="email"
                name="name"
                placeholder="Email"
                value={emailInput}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <p id="emailError"></p>
              <input
                id='AddressInput'
                type="text"
                name="name"
                placeholder="Address"
                value={addressInput}
                onChange={e => setAddress(e.target.value)}
              />
              <p id="mobileError"></p>
              <input
                id='MobileInput'
                type="text"
                name="name"
                placeholder="Phone number"
                value={mobileInput}
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                multiple
                maxLength="10"
                onChange={e => setMobile(e.target.value)}
              />
              <p class="notification">*Add the mobile number before submiting*</p>
              <div>
                <button
                  id="add-button"
                  type="button"
                  href="/"
                  onClick={onAdd}
                >Add</button>
                <button
                  id="clear-button"
                  type="button"
                  href="/"
                  onClick={onClear}
                >Clear</button>

              </div>
              <div id="numbers-container">
                {addedNumbers}
              </div>


            </div>
            <button
              type="button"
              href="/"
              onClick={onSubmit}
            >Submit</button>
            <button
              type="button"
              href="/"
              onClick={handleEditor}
            >Edit</button>
          </form>
        </div>
        {/* ====================================================================== */}
        {/* ============================== TABLE ============================== */}
        <div className='table-container'>
          <div div className="wrapper">

            <div className="table">

              <div className="row header">
                <div className="cell">
                  <b>Full Name</b>
                </div>
                <div className="cell">
                  <b>Email</b>
                </div>
                <div className="cell">
                  <b>Address</b>
                </div>
                <div className="cell">
                  <b>Mobile</b>
                </div>
              </div>
              {rows}

            </div>

          </div>
        </div>
      </div>
      {/* ====================================================================== */}
      {/* ==================== Pop up menu to edit contacts ==================== */}
      {editMode === true
        ? <div className="popup-box">
          <div className="box">
            <span className="close-icon" onClick={xIcon}>x</span>
            <div className="form-container">
              <form>
                <div className="title">
                  <h2>Edit contact</h2>
                </div>
                <div className="info">
                  <input
                    id='nameInput'
                    className="fname"
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={nameInput}
                    pattern="[a-zA-Z]*"
                    onChange={e => setName(e.target.value)}
                    required
                  />
                  <p id="nameError className='error-message'"></p>
                  <input
                    id='emailInput'
                    type="email"
                    name="name"
                    placeholder="Email"
                    value={emailInput}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                  <p id="emailError"></p>
                  <input
                    id='AddressInput'
                    type="text"
                    name="name"
                    placeholder="Address"
                    value={addressInput}
                    onChange={e => setAddress(e.target.value)}
                  />
                  <p id="mobileError"></p>
                  <input
                    id='MobileInput'
                    type="text"
                    name="name"
                    placeholder="Phone number"
                    value={mobileInput}
                    // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    maxlength="10"
                    onChange={e => setMobile(e.target.value)}
                  />
                  <p class="notification">*Add the mobile number before submiting*</p>
                  <button
                    id="add-button"
                    type="button"
                    href="/"
                    onClick={onAdd}
                  >Add</button>
                  <button
                    id="clear-button"
                    type="button"
                    href="/"
                    onClick={onClear}
                  >Clear</button>
                  <div id="numbers-container">
                    {addedNumbers}
                  </div>
                </div>
                <button
                  type="button"
                  href="/"
                  onClick={onEdit}
                >Edit</button>
                <button
                  id="del-button"
                  type="button"
                  href="/"
                  onClick={onDelete}
                >Delete</button>
              </form>
            </div>
          </div>
        </div>
        : <>
        </>
      }
      {/* ====================================================================== */}
    </>
  );
}

export default App;
