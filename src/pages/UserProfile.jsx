import React from 'react'

const UserProfile = () => {
  return (
    <div className="userProfile container d-sm-flex justify-content-center align-items-center mt-5">
          <form className="form-control d-sm-flex flex-column justify-content-center p-4">
            <h3 className="me-5">My Profile</h3>
            <h5 className="me-5">Manage and Protect your account.</h5>
            
            <label className="m-3" htmlFor="userName">User Name:
            <input className="form-control m-1" type="text" id="username"/>
            </label>
            <p>Username can only be changed once.</p>
            
            <label className="m-3" htmlFor="name">Name:
            <input id="name" className="form-control m-1" type="text" />           
            </label>
            
            <label className="m-3" htmlFor="email">Email:
            <input id="email" className="form-control m-1" type="email" />   
            <Link to="" className="mt-3">Change</Link>        
            </label>
            
            <label className="m-3" htmlFor="phonenumber">Phone Number:
            <input id="phonenumber" className="form-control m-1" type="text" /> 
            <Link to="" className="m-3">Change</Link>          
            </label>
            
            <label className="m-3" htmlFor="gender">Gender:
            <input class="form-check-input m-1" type="radio" name="flexMale" id="flexMale1"/>
            <label class="form-check-label m-1" for="flexMale1">Male</label>
            <input class="form-check-input m-1" type="radio" name="flexFemale" id="flexFemale1"/>
            <label class="form-check-label m-1" for="flexFemale1">Female</label>
            <input class="form-check-input m-1" type="radio" name="flexOthers" id="flexOthers1"/>
            <label class="form-check-label m-1" for="flexOthers1">Other</label>       
            </label>

            <label className="m-3" htmlFor="dateofbirth">Date of Birth:
            <input id="dateofbirth" className="form-control m-1" type="date" />         
            </label>

            <div className="d-flex justify-content-evenly m-3">
                {error && <div>{error}</div>}
              <button className="btn btn-secondary m-3" type="submit">Save</button>
            </div>
          </form>
          
         
        </div>
  )
}

export default UserProfile