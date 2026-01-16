import Panel from "./Panel/PanelMain";
import LifeLog from "./LifeLog/LifeLogMain"
import FocusForge from "./FocusForge/FocusforgeMain"
import LMSv2 from "./lmsv2/MainScr"


function MainScreen({ scene }) {
  return (
    <div className="flex-grow-1 overflow-auto">
      {scene === "panel" && <Panel />}
      {scene === "lifelog" && <LifeLog />}
      {scene === "focusforge" && <FocusForge />}

      {scene === "lmsv1" && (
        <iframe
          src="/lms-v1/index.html"
          title="LMS v1"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      )}
      { scene === "lmsv2" && <LMSv2/> }

      {!["panel", "lifelog", "focusforge", "lmsv2", "lmsv1" ].includes(scene) && (
        <div class="container-fluid">
        <div class="card bg-success text-white m-5 border-2 rounded-3">
                <div class="card-body">
                <h2 class="text-center">Select an Option</h2>
                </div>
        </div>
        
                <h6 class="fw-bold text-center p-5">Nothing to display here....???!!!</h6>
        </div>
      )}
    </div>
  );
}

export default MainScreen;