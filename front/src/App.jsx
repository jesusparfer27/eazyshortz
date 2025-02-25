import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
    <main className="bg-gray-800 w-full h-screen">
      <Outlet />
    </main>
    </>
  );
}

export default App;
