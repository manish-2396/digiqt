import { Route, Routes } from 'react-router-dom';
import './App.css';
// import { NomineeFormController } from './Componet/NomineeForm/NomineeFormController';
import { NomineeFormController, NormineeTableController } from './Componet';
// import { NomineeFormController } from './Componet';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NormineeTableController />} />
        <Route path="/form" element={<NomineeFormController />} />
      </Routes>

    </div>
  );
}

export default App;
