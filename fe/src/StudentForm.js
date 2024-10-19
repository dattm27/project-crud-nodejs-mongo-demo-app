import React, { useState } from 'react';

function StudentForm() {
    const [student, setStudent] = useState({
        StudentId: '',
        Name: '',
        Roll: '',
        Birthday: ''
    });

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:3000/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
        })
        .then(response => response.text())
        .then(data => {
            alert('Student saved successfully');
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="StudentId" 
                    placeholder="Student ID" 
                    value={student.StudentId}
                    onChange={handleChange} 
                />
                <input 
                    type="text" 
                    name="Name" 
                    placeholder="Name" 
                    value={student.Name}
                    onChange={handleChange} 
                />
                <input 
                    type="text" 
                    name="Roll" 
                    placeholder="Roll" 
                    value={student.Roll}
                    onChange={handleChange} 
                />
                <input 
                    type="date" 
                    name="Birthday" 
                    placeholder="Birthday" 
                    value={student.Birthday}
                    onChange={handleChange} 
                />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default StudentForm;
