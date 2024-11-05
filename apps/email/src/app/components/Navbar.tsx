const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-gray-800 px-4 py-2">
      <div className="flex items-center">
        <img
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          alt="Logo"
          className="h-6 w-auto"
        />
        <span className="ml-2 text-xl font-bold text-white">Tailwind UI</span>
      </div>
      <div className="flex items-center">
        <a
          href="https://github.com/tailwindlabs/tailwindcss"
          target="_blank"
          rel="noreferrer"
          className="text-white hover:text-gray-300"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
