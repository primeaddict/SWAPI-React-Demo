import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import CharacterDetailsComponent from "./components/detail-componet/detail.component.js";
import HomeComponent from "./components/home-component/home.component.js";
import PNFComponent from "./components/page-not-found-component/404.component"
import FavoriteComponent from "./components/favorites-component/favorite.component.tsx";
import LoadingComponent from "./components/common-components/loading.js";

function App(props) {

  const { loadingPeople, loadingPlanet } = props



  return (
    <div className="App">
      {(loadingPeople || loadingPlanet) && <LoadingComponent />}
      <Routes>
        <Route path="/" element={<HomeComponent {...props} />} />
        <Route path="/details" element={<CharacterDetailsComponent {...props} />} />
        <Route path="/favorites" element={<FavoriteComponent {...props} />} />
        <Route path="*" element={<PNFComponent {...props} />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => {
  return (
    {
      loadingPeople: state?.people?.loading,
      loadingPlanet: state?.planet?.loading
    }
  )
}


export default connect(mapStateToProps, null)(App)
