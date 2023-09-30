import { CelebList } from "./components/CelebList";
import { SearchBar } from "./components/SearchBar";
import { ToggleButton } from "./components/ToggleButton";

function App() {
  return (
    <div className="flex flex-col  gap-4 lg:mx-52 mx-7 min-h-screen py-20">
      <ToggleButton />
      <SearchBar />
      <CelebList />
    </div>
  );
}

export default App;
