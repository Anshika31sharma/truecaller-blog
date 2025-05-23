
import logo from "../Assets/logotype/truecaller.svg"

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
    <img src={logo} alt="Logo" style={{ width: "100px", marginRight: "1rem" }} />
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#fff",
    padding: "1rem 2rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif", 
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: "#0a6cff",
  },
};

export default Navbar;
