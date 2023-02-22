import React from 'react'

const Userdashboard = () => {

  return (
    <div className="userDashboard container d-sm-flex justify-content-center align-items-center mt-5">
          <form className="form-control d-sm-flex flex-column justify-content-center p-4">
            <h3 className="m-2">My Profile</h3>
            <h6 className="m-2">Manage and protect your account.</h6>
            
            <div class="m-3 row">
              <label className="col-sm-2 col-form-label" htmlFor="userName">User Name:  </label>
              <div className="col-sm-10">
                <input className="form-control m-1" type="text" id="username"/>
              </div>
              <div className="col-sm-2"></div><p className="col-sm-10">Username can only be changed once.</p>
            </div>
            
            <div class="m-3 row">
              <label className="col-sm-2 col-form-label" htmlFor="name">Name:  </label>
              <div className="col-sm-10">
                <input className="form-control m-1" type="text" id="name"/>
              </div>
            </div>

            <div class="m-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Email Address:  </label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"/>
               </div>
               {/* <Link to="" className="mt-3">Change</Link>         */}
            </div>
            
            <div class="m-3 row">
              <label for="staticPhoneNo" class="col-sm-2 col-form-label">Phone Number:  </label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control-plaintext" id="staticPhoneNo" value="*********74"/>
                {/* <Link to="" className="mt-3">Change</Link>         */}
            </div>
               
            </div>
            
            <div class="m-3 row">
              <label class="col-sm-2 col-form-label">Gender:  </label>
              <div class="col-sm-10">
                <input type="radio" class="m-1 form-check-input" id="Male" name="optradio" value="Male" checked/>Male
                <label class="m-1 form-check-label" for="radioMale"></label>
                <input type="radio" class="m-1 form-check-input" id="Female" name="optradio" value="Female" />Female
                <label class="m-1 form-check-label" for="radioFemale"></label>
                <input type="radio" class="m-1  form-check-input" id="Others" name="optradio" value="Others" />Others
                <label class="m-1 form-check-label" for="radioOthers"></label>      
              </div>
            </div>

            <div class="m-3 row">
              <label class="col-sm-2 col-form-label">Date of Birth:  </label>
              <div class="col-sm-10">
              <input id="dateofbirth" className="form-control m-1" type="date" />         
              </div>
              </div>

            <div className="d-flex justify-content-evenly m-3">
                {/* {error && <div>{error}</div>} */}
              <button className="btn m-3 px-5" type="submit" style={{backgroundColor: "#d43589", color: "white"}}>Save</button>
            </div>


          </form>
          
         
        </div>
  )
}

export default Userdashboard;
