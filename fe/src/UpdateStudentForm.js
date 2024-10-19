import React, { useState, useEffect } from 'react';

function UpdateStudentForm({ student, onUpdate, onCancel }) {
    const [name, setName] = useState(student.Name);
    const [birthday, setBirthday] = useState(new Date(student.Birthday).toISOString().split('T')[0]);
    const [roll, setRoll] = useState(student.Roll); 

    // Cập nhật state khi student thay đổi
    useEffect(() => {
        setName(student.Name);
        setBirthday(new Date(student.Birthday).toISOString().split('T')[0]);
        setRoll(student.Roll);
    }, [student]);


    const handleUpdate = (e) => {
        e.preventDefault(); // Ngăn chặn reload trang
        onUpdate({ ...student, Name: name, Birthday: birthday, Roll: roll  });
    };

    return (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <h3>Update Student</h3>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>ID: </label>
                    <input type="text" value={student.StudentId} readOnly />
                </div>
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Roll: </label>
                    <input
                        type="text" 
                        value={roll}
                        onChange={(e) => setRoll(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Birthday: </label>
                    <input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
}

export default UpdateStudentForm;
