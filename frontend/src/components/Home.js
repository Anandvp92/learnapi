import React, { useEffect ,useState} from 'react';
import '../components/Home.css';


export function Home() {
    const [task,UseTask]=useState([]);
    useEffect(() => {
    let data=[]
    const getnotes = async () => 
      {
      try {
        let response = await fetch('http://127.0.0.1:4000/listall/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json(); 
        UseTask(data)

      } catch (error) {
        console.error('Fetch error:', error);
        UseTask(data);
      }
    };
    
    getnotes();
    const intervalId = setInterval(getnotes,2000);
    return () => clearInterval(intervalId)
  }, []); // The empty dependency array ensures this runs only once after the initial render

  return (
    <>
    <h1 className='tabletitle'>Task List</h1>
   <table>
  
  <tbody>

  <tr>
    <th>SI NO</th>
    <th>Task</th>
    <th>Created Date</th>
    <th>Updated Date</th>
    <th>Status</th>
    <th>Action</th>
    <th>Change Status</th>
  </tr>

    {task.map(item=>(
      <tr key={item.id}>

        <td>{item.id}</td>
        <td>{item.task}</td>
        <td>{item["created time"]}</td>
        <td>{item["updated date"]}</td>
        <td>{item["status"]===0?"Not Completed":"Completed"}</td>
        <td>
          <button>Delete</button>          
          <button>Edit</button>
        </td>
        <td>
          <button>Completed</button>
          <button>Not Completed</button>
        </td>
      </tr>
    
  ))} 
   

  </tbody>
</table>
    </>
  );
}
