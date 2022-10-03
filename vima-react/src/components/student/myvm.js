import Background from '../../background';
import Header from '../../header';
import myVm from "./myvm.module.css";
import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { getApiRoot } from '../../utils/getApiRoot';


function MyVM() {

    const [courseList, setCourseList]= useState([]);
    let navigate = useNavigate();
        useEffect(()=>{
      const getCourseList = async ()=>{
        const courseResponse = await fetch(getApiRoot()+'/api/studentcourse',
        {
          credentials:'include',
          headers:{
            'content-type':'application/json'
          },
          method:'GET',
        });
        const courseResponseObject = await courseResponse.json();
        console.log(courseResponseObject);
        }
        getCourseList();
    }, [])

    return (
        <div className={myVm.myVm}>
            <div className={myVm.container}>
                <Header />
                {/* <span onClick={() => {navigate("/student")}} id={myVm.backbtn}>&#8592; Back</span> */}
                
            <div className={myVm.table}>
                    <table>
                        <thead>
                        <tr>
                        <th>Class</th>
                        <th>VM</th>
                        <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Class</td>
                            <td>Vm</td>
                            <td>Date</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
            <Background />
        </div>
    </div>
    )
}

export default MyVM;