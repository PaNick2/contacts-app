import React from 'react'



function Register(users) {



    return (
        <div className="form-container">
            <form action="/">
                <div className="title">
                    <h2>Add new contact</h2>
                </div>
                <div className="info">
                    <input
                        className="fname"
                        type="text"
                        name="name"
                        placeholder="Full name"
                    // onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Email"
                    // onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Address"
                    // onChange={e => setAddress(e.target.value)}
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Phone number"
                    // onChange={e => setMobile(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    href="/"
                >Submit</button>
            </form>
        </div>
    )
}

export default Register
