import ReactSyntaxHighlighter from "react-syntax-highlighter";
import { atelierSulphurpoolDark as codeTheme } from "react-syntax-highlighter/dist/esm/styles/hljs";
import arrowIcon from "./assets/arrow.svg";
import logo from "./assets/logo.svg";

/* Examplar imports */

// Raw string import
import exampleRaw from "./assets/example.svg?raw";

// Data URL import
import exampleDataURL from "./assets/example.svg?url";

// Base64 Encoded import
import exampleBase64 from "./assets/example.svg?base64";

// SVGR Component import
import ExampleComponent from "./assets/example.svg?component";

// Default import, not handled by our plugin
import exampleDefault from "./assets/example.svg";

function Code(props: { children: string[] }) {
  return (
    <code className="max-h-[400px] whitespace-pre overflow-auto flex bg-gray-800 text-white font-mono text-lg border border-gray-600 rounded-[5px] shadow-lg min-h-[150px]">
      <ReactSyntaxHighlighter language="javascript" style={codeTheme}>
        {props.children.join("")}
      </ReactSyntaxHighlighter>
    </code>
  );
}

function App() {
  return (
    <main className="min-h-screen mb-16 mt-16">
      <header className="mb-16">
        <h1 className="flex flex-col justify-center items-center text-3xl font-bold tracking-wider p-4 text-white">
          <img src={logo} className="h-[150px]" />
          <span>vite-plugin-react-rich-svg</span>
          <span className="text-base opacity-50 mt-2 font-normal">
            Seamless SVG loader with versatile import options
          </span>
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
      </header>

      <section className="max-w-[500px] md:max-w-[800px] mx-auto grid grid-cols-[auto,1fr] gap-x-[16px] gap-y-[8px] relative">
        <h1 className="text-lg font-bold col-span-2">
          Raw - <em>*.svg?raw</em>
        </h1>
        <img
          className="absolute arrow left-[-45px] top-[70px]"
          src={arrowIcon}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: exampleRaw,
          }}
        />

        <Code>
          export default "
          {exampleRaw.replaceAll('"', '\\"').replace(/\r?\n/g, "\\r\\n")}"
        </Code>
      </section>

      <div className="p-4" />

      <section className="max-w-[500px] md:max-w-[800px] mx-auto grid grid-cols-[auto,1fr] gap-x-[16px] gap-y-[8px] relative">
        <h1 className="text-lg font-bold col-span-2">
          Data URL - <em>*.svg?url</em>
        </h1>
        <img
          className="absolute arrow left-[-45px] top-[70px]"
          src={arrowIcon}
        />
        <img src={exampleDataURL} alt="Vite logo" />

        <Code>
          export default "{exampleDataURL}"{"\n\n"}
        </Code>
      </section>

      <div className="p-4" />

      <section className="max-w-[500px] md:max-w-[800px] mx-auto grid grid-cols-[auto,1fr] gap-x-[16px] gap-y-[8px] relative">
        <h1 className="text-lg font-bold col-span-2">
          Data URL - <em>*.svg?base64</em>
        </h1>
        <img
          className="absolute arrow left-[-45px] top-[70px]"
          src={arrowIcon}
        />{" "}
        <img
          src={`data:image/svg+xml;base64,${exampleBase64}`}
          alt="Vite logo"
        />
        <Code>
          export default "{exampleBase64}"{"\n\n"}
        </Code>
      </section>

      <div className="p-4" />

      <section className="max-w-[500px] md:max-w-[800px] mx-auto grid grid-cols-[auto,1fr] gap-x-[16px] gap-y-[8px] relative">
        <h1 className="text-lg font-bold col-span-2">
          Component - <em>*.svg?component</em>
        </h1>
        <img
          className="absolute arrow left-[-45px] top-[70px]"
          src={arrowIcon}
        />{" "}
        <img
          src={`data:image/svg+xml;base64,${exampleBase64}`}
          alt="Vite logo"
        />
        <Code>
          export default {ExampleComponent.toString()}
          {"\n\n"}
        </Code>
      </section>

      <div className="p-4" />

      <section className="max-w-[500px] md:max-w-[800px] mx-auto grid grid-cols-[auto,1fr] gap-x-[16px] gap-y-[8px] relative">
        <h1 className="text-lg font-bold col-span-2">
          Default Handler - <em>*.svg</em>
        </h1>
        <img
          className="absolute arrow left-[-45px] top-[70px]"
          src={arrowIcon}
        />{" "}
        <img
          src={`data:image/svg+xml;base64,${exampleBase64}`}
          alt="Vite logo"
        />
        <Code>
          // This value depends on your vite config,
          {"\n"}
          // as this plugin passes, when svg import is missing a query
          {"\n\n"}
          export default {typeof exampleDefault === "string"
            ? `"${exampleDefault.replace(/\r?\n/g, "\\r\\n")}"`
            : // @ts-expect-error typeof viteLogo depends on the vite config.
              exampleDefault.toString()}
          {"\n\n"}
        </Code>
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
