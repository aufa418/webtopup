import Logo from '../assets/Logo.png'

const Navbar = () => {

    return (
        <>
            <div className="navbar bg-black text-white">
                <div className="">
                    <a href="/" className="btn btn-ghost" style={{ marginTop: '-7px' }}><img src={Logo} className='w-14' /></a>
                </div>
            </div>
        </>
    )
}
export default Navbar

