import Home from "./Home";
import TP from "./TimerPanel"

function MainScr({ scene }) {
  if (scene === "home") return <Home />;
  if (scene === "profile") return <h2>Profile Screen</h2>;
  if (scene === "settings") return <h2>Settings Screen</h2>;
  if (scene === "timerPanel") return <TP/>;

  return <h2>Select something</h2>;
}

export default MainScr;
