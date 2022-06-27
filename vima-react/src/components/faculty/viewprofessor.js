import React from 'react';
import viewprofessor from './viewprofessor.module.css';

function ViewProfessor() {
    return (
        <>
            <h1>View Professors</h1>
                <table>
                    <th>Professors</th>
                    {/* search bar goes here  */}
                    {/* professor list goes here */}
                </table>
            <button type="submit" id={viewprofessor.newprofessor}>Add New Professor</button>
        </>
    )
}

export default ViewProfessor;