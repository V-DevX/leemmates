const Navbar = () => (
  <header className="fixed top-0 z-50 w-screen bg-white shadow">
    <div className="mx-2 flex h-20 max-w-7xl items-center justify-start px-2 ">
      <img 
        src="assets/logo.png" 
        alt="LeemMates Logo" 
        className="w-18 h-18 object-contain"
      />
      <h1 className="font-montserrat text-[1.8rem] font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        LeemMates
      </h1>
    </div>
  </header>
);

export default Navbar;
