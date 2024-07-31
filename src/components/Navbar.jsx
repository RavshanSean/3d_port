import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <header className="header">

        

        <NavLink to="/" className="w-10 h-10 rounded-lg bg-white
          items-center justify-center flex font-bold shadow-md">
            <p className="blue-gradient_text">Home</p>
        </NavLink>
        <nav className="flex text-lg gap-7 font-medium">


        <NavLink to='/posts/new' className={({isActive}) => isActive ? 
            'text-blue-500' : 'text-black'}>
                New Blog Post
            </NavLink>


          <NavLink to='/SignUp' className={({isActive}) => isActive ? 
            'text-blue-500' : 'text-black'}>
                Sign-Up
            </NavLink>

            <NavLink to='/SignIn' className={({isActive}) => isActive ? 
            'text-blue-500' : 'text-black'}>
                Sign-In
            </NavLink>

            <NavLink to='/' className={({isActive}) => isActive ? 
            'text-blue-500' : 'text-black'}>
                Logout
            </NavLink>

        </nav>
    </header>
  )
}

export default Navbar