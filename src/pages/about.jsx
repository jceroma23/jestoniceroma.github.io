import React from 'react';

const About = () => {
    return (
        <div className="about container d-sm-flex justify-content-center align-items-center mt-5">
            <h3 className="me-5">About Us</h3>
            <div>Welcome to our Shop! 🙌
                Your Online Tiangge directly from Taytay, Rizal

                Pang-awra ba? We got you covered! We have a wide variety of outfits at a very affordable price
                Check our shop now! Bagsak presyo mga bes 😉

                Open for RESELLERS.
                Visit us at Lake Side View Park, Angono, Rizal
                3 PM to 7 PM, Monday to Sunday

                https://shopee.ph/strawberrystreet.ph
            </div>

            <div class="col  p-5">
                <div class="text-center">
                  <h3>Contact Us</h3><br/>
                  <img src="image/ADDRESS.png" alt="" style={{width: "20px"}}/> Lake Side View Park, Angono, Rizal <br/><br/>
                  <img src="images/mobile.png" alt="" style={{width: "20px"}}/> +63 995 904 2062 <br/><br/>
                </div>

                {/* social media */}
                <div class="socials text-center">
                    <ul class="list-inline">
                        <li class="list-inline-item"> Follow us </li>
                        <li class="list-inline-item"><a href="https://www.facebook.com/strawberrystreet.ph" target="_Blank">
                            <img src="images/fb.png" style={{width: "30px"}}/></a></li>
                        <li class="list-inline-item"><a href="https://www.instagram.com/strawberrystreet.ph/" target="_Blank">
                            <img src="images/ig.png" style={{width: "30px"}}/></a></li>
                        <li class="list-inline-item"><a href="https://www.tiktok.com/@strawberrystreet.ph" target="_Blank">
                            <img src="images/tiktok icon.png" style={{width: "30px"}}/></a></li>
                    </ul>
                </div>
              </div>
        </div>
  )
};

export default About;