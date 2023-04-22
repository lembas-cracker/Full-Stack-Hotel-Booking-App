import Footer from "../components/Footer";
import FrontPage from "../components/FrontPage";
import Header from "../components/Header";
import MailList from "../components/MailList";
import Navbar from "../components/Navbar";
import PopularProperties from "../components/PopularProperties";
import PropertyList from "../components/PropertyList";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="home-container">
        <FrontPage />
        <h1 className="home-title">Browse by property type</h1>
        <PropertyList />
        <h1 className="home-title">Homes guests love</h1>
        <PopularProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
