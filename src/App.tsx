import MainLayout from "./Layout/MainLayout/MainLayout";
import ProtectedRoute from "./Shared/ProtectedRoute";

function App() {
  return (
    <div>
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    </div>
  );
}

export default App;
