import { NavLink } from "react-router-dom"


const Navbar = (props) => {
  console.log(props.user);
  return (
    <header className="header">



      <NavLink to="/" className="w-16 h-16 rounded-lg bg-white
          items-center justify-center flex font-bold shadow-md" id="homeContainer">
        <p className="blue-gradient_text" id="home">Home</p>
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">


        {props.user ? (
          <NavLink to='/posts/new' className={({ isActive }) => isActive ?
            'text-blue-500' : 'text-black'}>
            New Blog Post
          </NavLink>
        ) : null}

        <NavLink to='/posts' className={({ isActive }) => isActive ?
          'text-blue-500' : 'text-black'}>
          Blog Posts
        </NavLink>


        <NavLink to='/SignUp' className={({ isActive }) => isActive ?
          'text-white' : 'text-black'}>
          Sign-Up
        </NavLink>

        <NavLink to='/SignIn' className={({ isActive }) => isActive ?
          'text-white' : 'text-black'}>
          Sign-In
        </NavLink>

        {props.user ? (
          <NavLink to='/' onClick={props.handleSignout} className={({ isActive }) => isActive ?
            'text-white' : 'text-black'}>
            Logout
          </NavLink>
        ) : null}

      </nav>

    </header>
  )
}

export default Navbar