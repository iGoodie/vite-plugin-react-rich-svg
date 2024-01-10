// Raw string import
import viteLogoRaw from "./assets/vite.svg?raw";

// Data URI import
import viteLogoDataURI from "./assets/vite.svg?dataURI";

// Default import, not handled by our plugin
import viteLogo from "./assets/vite.svg";

function App() {
  return (
    <main>
      <div className="logo">
        <h1>Raw</h1>
        <div dangerouslySetInnerHTML={{ __html: viteLogoRaw }} />
        <code>
          "{viteLogoRaw.replace(/\r?\n/g, "\\r\\n")}"{"\n\n"}
        </code>
      </div>

      <div className="logo">
        <h1>Data URI</h1>
        <img src={viteLogoDataURI} alt="Vite logo" />
        <code>
          "{viteLogoDataURI}"{"\n\n"}
        </code>
      </div>

      <div className="logo">
        <h1>Default Handler</h1>
        <img src={viteLogo} alt="Vite logo" />
        <code>
          // This value depends on your vite config,
          {"\n"}
          // as this plugin passes, when svg import is missing a query
          {"\n\n"}
          {typeof viteLogo === "string"
            ? `"${viteLogo.replace(/\r?\n/g, "\\r\\n")}"`
            : // @ts-expect-error typeof viteLogo depends on the vite config.
              viteLogo.toString()}
          {"\n\n"}
        </code>
      </div>

      <hr />

      <div className="license">
        <span>© 2024 Taha Anılcan Metinyurt (iGoodie)</span>
        <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
          <img
            alt="Creative Commons License"
            // style="border-width:0"
            src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
          />
        </a>
      </div>
    </main>
  );
}

export default App;
