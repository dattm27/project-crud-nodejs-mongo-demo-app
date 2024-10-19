import React, { useState, useEffect } from 'react';
import UpdateStudentForm from './UpdateStudentForm'; // Nhập component UpdateStudentForm

function StudentList() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:3000/api/findall')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error:', error));
    }, []);

    // Hàm để xử lý xóa sinh viên
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this student?");
        if (confirmDelete) {
            fetch(`http://127.0.0.1:3000/api/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            })
            .then(response => {
                if (response.ok) {
                    setStudents(prevStudents => prevStudents.filter(student => student._id !== id));
                }
            })
            .catch(error => console.error('Error:', error));
        }
    };

    // Hàm để xử lý cập nhật sinh viên
    const handleUpdate = (updatedStudent) => {
        fetch(`http://127.0.0.1:3000/api/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: updatedStudent._id,
                Name: updatedStudent.Name,
                Birthday: updatedStudent.Birthday,
                Roll:  updatedStudent.Roll
            }),
        })
        .then(response => {
            if (response.ok) {
                // Cập nhật lại danh sách sinh viên
                setStudents(prevStudents =>
                    prevStudents.map(student =>
                        student._id === updatedStudent._id ? updatedStudent : student
                    )
                );
                setSelectedStudent(null); // Đặt lại selectedStudent
            }
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            {/* Hiển thị form cập nhật thông tin sinh viên */}
            {selectedStudent && (
                <UpdateStudentForm 
                    student={selectedStudent} 
                    onUpdate={handleUpdate} 
                    onCancel={() => setSelectedStudent(null)} 
                />
            )}  
            <h2>Student List</h2>
            <table style={{ width: '80%', margin: '20px auto', borderCollapse: 'collapse', border: '1px solid black' }}>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Roll</th>
                        <th>Birthday</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student._id}>
                            <td>{student.StudentId}</td>
                            <td>{student.Name}</td>
                            <td>{student.Roll}</td>
                            <td>{new Date(student.Birthday).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => setSelectedStudent(student)}>Edit</button>
                                <button onClick={() => handleDelete(student._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
        </div>
    );
}

export default StudentList;
