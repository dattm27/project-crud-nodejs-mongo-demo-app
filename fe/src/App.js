import logo from './logo.svg';
import './App.css';
import StudentForm from './StudentForm';
import StudentList from './StudentList';

function App() {
  return (
    <div className="App">
        <div>
            <h1>Student Management System</h1>
            <StudentForm />
            <StudentList />
        </div>
    </div>
  );
}

export default App;
