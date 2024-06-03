import PropTypes from 'prop-types'
import axios from 'axios'
import Logo from '../assets/Logo.png'

const Navbar = ({ isAdmin }) => {
    const ApiBase = import.meta.env.VITE_API_URL

    const LogoutAccount = async () => {
        await axios.delete(`${ApiBase}/logout`, {
            withCredentials: true
        })
    }

    return (
        <>
            <div className="navbar bg-black text-white">
                <div className="">
                    <a href="/" className="btn btn-ghost" style={{ marginTop: '-7px' }}><img src={Logo} className='w-14' /></a>
                </div>
                {
                    isAdmin && (
                        <div className="flex-none">
                            <ul className="menu menu-horizontal px-1">
                                <li><button onClick={() => LogoutAccount()} className=''>Logout</button></li>
                            </ul>
                        </div>
                    )
                }
            </div>
        </>
    )
}

Navbar.propTypes = {
    isAdmin: PropTypes.bool.isRequired
}

export default Navbar

