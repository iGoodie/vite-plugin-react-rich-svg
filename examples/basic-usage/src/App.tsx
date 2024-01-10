import viteLogoRaw from "./assets/vite.svg?raw";
import viteLogoDataURI from "./assets/vite.svg?dataURI";
import viteLogo from "./assets/vite.svg";

import "./App.css";

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <div
            className="logo"
            dangerouslySetInnerHTML={{ __html: viteLogoRaw }}
          />
        </a>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogoDataURI} className="logo" alt="Vite logo" />
        </a>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
    </>
  );
}

export default App;
