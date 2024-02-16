// Raw string import
import viteLogoRaw from "./assets/vite.svg?raw";

// Data URL import
import viteLogoDataURL from "./assets/vite.svg?url";

// Base64 Encoded import
import viteLogoBase64 from "./assets/vite.svg?base64";

// SVGR Component import
import ViteLogoComponent from "./assets/vite.svg?component";

// Default import, not handled by our plugin
import viteLogo from "./assets/vite.svg";
import arrowIcon from "./assets/arrow.svg";

function App() {
  return (
    <main className="min-h-screen mb-16 mt-16">
      <h1 className="flex justify-center items-center text-3xl font-bold tracking-wider p-6 text-teal-500">
        vite-plugin-react-rich-svg
      </h1>
      <nav className="flex justify-center gap-2">
        <a href="https://github.com/iGoodie/vite-plugin-react-rich-svg">
          <span className="cursor-pointer underline text-teal-500 hover:text-teal-700">
            Github
          </span>
        </a>
        <span>•</span>
        <a href="https://www.npmjs.com/package/vite-plugin-react-rich-svg">
          <span className="cursor-pointer underline text-teal-500 hover:text-teal-700">
            Npm Page
          </span>
        </a>
      </nav>

      <section className="max-w-[800px] mx-auto grid grid-cols-[auto,1fr] gap-x-[16px] gap-y-[8px] relative">
        <h1 className="text-lg font-bold col-span-2">
          Raw - <em>*.svg?raw</em>
        </h1>
        <img
          className="absolute arrow left-[-45px] top-[70px]"
          src={arrowIcon}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: viteLogoRaw,
          }}
        />

        <code className="whitespace-pre overflow-auto flex bg-gray-800 p-8 text-white font-mono text-lg border border-gray-600 rounded-[5px] shadow-lg min-h-[150px]">
          export default "
          {viteLogoRaw.replaceAll('"', '\\"').replace(/\r?\n/g, "\\r\\n")}"
        </code>
      </section>

      <div className="p-4" />

      <section className="max-w-[800px] mx-auto grid grid-cols-[auto,1fr] gap-x-[16px] gap-y-[8px] relative">
        <h1 className="text-lg font-bold col-span-2">
          Data URL - <em>*.svg?url</em>
        </h1>
        <img
          className="absolute arrow left-[-45px] top-[70px]"
          src={arrowIcon}
        />
        <img src={viteLogoDataURL} alt="Vite logo" />

        <code className="whitespace-pre overflow-auto flex bg-gray-800 p-8 text-white font-mono text-lg border border-gray-600 rounded-[5px] shadow-lg min-h-[150px]">
          export default "{viteLogoDataURL}"{"\n\n"}
        </code>
      </section>

      <div className="p-4" />

      <section className="max-w-[800px] mx-auto grid grid-cols-[auto,1fr] gap-x-[16px] gap-y-[8px] relative">
        <h1 className="text-lg font-bold col-span-2">
          Data URL - <em>*.svg?base64</em>
        </h1>
        <img
          className="absolute arrow left-[-45px] top-[70px]"
          src={arrowIcon}
        />{" "}
        <img
          src={`data:image/svg+xml;base64,${viteLogoBase64}`}
          alt="Vite logo"
        />
        <code className="whitespace-pre overflow-auto flex bg-gray-800 p-8 text-white font-mono text-lg border border-gray-600 rounded-[5px] shadow-lg min-h-[150px]">
          export default "{viteLogoBase64}"{"\n\n"}
        </code>
      </section>

      <div className="p-4" />

      <section className="max-w-[800px] mx-auto grid grid-cols-[auto,1fr] gap-x-[16px] gap-y-[8px] relative">
        <h1 className="text-lg font-bold col-span-2">
          Component - <em>*.svg?component</em>
        </h1>
        <img
          className="absolute arrow left-[-45px] top-[70px]"
          src={arrowIcon}
        />{" "}
        <img
          src={`data:image/svg+xml;base64,${viteLogoBase64}`}
          alt="Vite logo"
        />
        <code className="whitespace-pre overflow-auto flex bg-gray-800 p-8 text-white font-mono text-lg border border-gray-600 rounded-[5px] shadow-lg min-h-[150px]">
          export default {ViteLogoComponent.toString()}
          {"\n\n"}
        </code>
      </section>

      <div className="p-4" />

      <section className="max-w-[800px] mx-auto grid grid-cols-[auto,1fr] gap-x-[16px] gap-y-[8px] relative">
        <h1 className="text-lg font-bold col-span-2">
          Default Handler - <em>*.svg</em>
        </h1>
        <img
          className="absolute arrow left-[-45px] top-[70px]"
          src={arrowIcon}
        />{" "}
        <img
          src={`data:image/svg+xml;base64,${viteLogoBase64}`}
          alt="Vite logo"
        />
        <code className="whitespace-pre overflow-auto flex bg-gray-800 p-8 text-white font-mono text-lg border border-gray-600 rounded-[5px] shadow-lg min-h-[150px]">
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
      </section>

      <hr className="mt-4 mb-4 max-w-[100px] mx-auto" />

      <div className="flex flex-col justify-center items-center gap-[16px] py-4">
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
