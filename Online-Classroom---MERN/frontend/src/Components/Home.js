import React from 'react'
import './CSS/Home.css'
import {Link} from 'react-router-dom'
const Home = () => {
  
  return (
    <div className="">
      <div className="slider" >

      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active">
    <h4 style={{"color":"#FFD400","fontWeight":"900", "fontSize":"100px"}}>Welcome to the Biggest Online Education Platform</h4>
      <Link to="/signin"><button style={{"marginLeft":"200px"}} className='btn btn-primary'>Get Started</button></Link>
    </div>
    <div className="carousel-item ">
    <h4 style={{"color":"#FFD400","fontWeight":"900", "fontSize":"100px"}}>Join our biggest online community</h4>
      <Link to="/signin"><button style={{"marginLeft":"200px"}} className='btn btn-success'>Get Started</button></Link>
    </div>
    <div className="carousel-item">
    <h4 style={{"color":"#FFD400","fontWeight":"900",  "fontSize":"100px"}}>Enrich your knowledge with us.</h4>
    <Link to="/signin"><button style={{"marginLeft":"200px"}} className='btn btn-primary'>Get Started</button></Link>
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>


      </div>
{/* only image starts */}
<div className="homeImage">
<img src="https://i.ibb.co/zJS5wbP/j.jpg" alt="j" border="0"></img>
</div>

{/* only image ends */}

      {/* middler er image */}
      <div className="container-fluid subHome">
        <div className="p1 w-50">
<img style={{"width":"100%","height":"100%"}} src="https://www.viewsonic.com/library/wp-content/uploads/2020/03/Virtual-Classroom-The-Future-of-Distance-Education.jpg" alt="" />
        </div>
<br />
        <div className="p2 w-50 px-4 my-4">
          <ul style={{"fontSize":"25px","marginLeft":"15px"}}>
            <li>Education even from far away</li>
            <li>Discover a new way of learning </li>
            <li>Distance courses made better</li>
            <li>Made affordable for you</li>
            <li>Our only concern is your education </li>
            <li>Learn at ease</li>
            <li>For your career</li>
            <li>Build your future right here</li>
            <li>Unlock possibilities</li>
            <li>Build a life you deserve</li>
          </ul>
        </div>
      </div>
      {/* middle er image ends */}
      
{/* middle er about us starts*/}
<div style={{"marginTop":"40px"}} className="container-fluid aboutus my-4">
  
      <div className='my-2'>
      <h3>About Us</h3>
  <h4 style={{"color":"gray","marginTop":"50px","fontFamily":"monospace"}}>Classroom partners with many leading universities in Bangladesh to bring flexible, affordable online learning to individuals worldwide. We offer universities a platform where they can manage their educational system.</h4>
      </div>

      <div>
<img src="https://sadanandainstitute.org/wp-content/uploads/2020/09/contact-us-concept-landing-page_52683-12860.jpg" alt="" />
      </div>

</div>
{/* about us ends */}

      {/* Foooter code starts here */}

<div class="container-fluid my- footer" style={{"position":"sticky","top":"100%"}}>

    <footer class="text-center text-lg-start border border-white mt-xl-5 pt-4">

   
    <div class="text-center p-3 border-top border-white">
      © 2022 Copyright:
      <a class="text-white" href="https://mdbootstrap.com/"> classroom.com</a>
    </div>

  </footer>
  
</div>


      </div>
  )
}

export default Home

