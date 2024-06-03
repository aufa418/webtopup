import Navbar from "../components/Navbar"
import BackgroundImage from "../assets/Background.png"
import Logo from "../assets/Logo.png"
import { Link } from "react-router-dom"
import product1 from '../assets/product1.png'
import product2 from '../assets/product2.png'


const Homepage = () => {
  const Footer = () => {
    return (
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <aside>
          <img src={Logo} className="w-28" />
          <p>Xion Zibit<br />TopUp All Game Store</p>
        </aside>
      </footer>
    )
  }

  return (
    <>
      <Navbar isAdmin={false} />
      <img src={BackgroundImage} className="hero" style={{ maxWidth: '100%', height: '100%', objectFit: 'contain' }} />

      <h1 className="text-center text-3xl font-bold my-4">Product</h1>

      <div className="grid xl:grid-cols-3 gap-3 md:grid-cols-2 justify-items-center">
        {/* Free Fire */}
        <Link to="freefire">
          <div className="card w-80 xl:w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src={product1} alt="Free Fire" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Free Fire</h2>
              <p>Top up Free Fire sekarang, raih kemenanganmu dengan diamonds & skins!</p>
            </div>
          </div>
        </Link>

        {/* Mobile Legend */}
        <Link to="/mobilelegend">
          <div className="card w-80 xl:w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src={product2} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Mobile Legend</h2>
              <p>Boost gameplaymu dengan top up Mobile Legend. Segera miliki diamonds & skins!</p>
            </div>
          </div>
        </Link>
      </div>

      <br />
      <br />

      <Footer />
    </>
  )
}

export default Homepage
