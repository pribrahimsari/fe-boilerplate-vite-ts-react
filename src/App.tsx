import isLogo from "/logo_is.svg";

// import from ENV if needed
// const ANY_API_URL = import.meta.env.VITE_ANY_API_URL;
// console.debug({ ANY_API_URL });

function App() {
  return (
    <>
      <a href="https://isari.me" target="_blank">
        <img src={isLogo} className="logo" alt="İbrahim SARI logo" />
      </a>
      <h1>Vite + React + TS Boilerplate</h1>
    </>
  );
}

export default App;
