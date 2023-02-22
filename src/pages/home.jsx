import React from 'react';

const Home = () => {
  const quotes = [
    "Fashion is not necessarily about labels. It's not about brands. It's about something else that comes from within you.",
    "I like my money right where I can see it…hanging in my closet.",
    "In order to be irreplaceable one must always be different.",
    "Fashion is the armor to survive the reality of everyday life.",
    "Style is a way to say who you are without having to speak.",
    "Fashion is the most powerful art there is. It's movement, design and architecture all in one. It shows the world who we are and who we'd like to be.",
  ];
  
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  return (
    <div className='d-flex flex-fill flex-column justify-content-center align-items-center' style={{ 
      backgroundImage: "url('https://images.pexels.com/photos/10377281/pexels-photo-10377281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      height: "100vh",
      backgroundSize: "contain",
      backgroundRepeat: "repeat",
      backgroundPosition: "center center"
    }}>
      <h1 className='display-3'>Welcome to my Fashion Store</h1>
      <p className='display-6 text-center'>{randomQuote}</p>
      <button className='w-25 btn btn-danger mt-5'>Shop Now</button>
    </div>
    
  );
};

export default Home;
