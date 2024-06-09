import React, { useEffect, useState } from 'react'
import Header from './Header'
import { getDatabase, onValue, ref } from 'firebase/database'
import { database } from '../firebase';
import '../index.css'
import { Link } from 'react-router-dom';
export default function Equipments() {
    let [equipment, setEqui] = useState([])
    const afficher = () => {
        const starCountRef = ref(database, 'Equipments');
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        let newData = [];
        for(let key in data){
            newData.push({id: key, ...data[key]})
        }
        newData = newData.sort((a,b) => {
            if(a.name < b.name){
                return -1
            }
            if(a.name > b.name){
                return 1
            }
            return 1
        })
        setEqui(newData)
        });
    }
    useEffect(() => {
        afficher()
    }, [])
    const handleSearch = (e) => {
        let search = e.target.value;
        if(search !== ''){
            let newData = equipment.filter(el => el.name.toLowerCase().includes(search.toLowerCase()) || el.domain.toLowerCase().includes(search.toLowerCase()))
            setEqui(newData)
        }else{
            afficher()
        }
    }
  return (
    <>
       <Header/>
       <div className="container-fluid">
       <input class="form-control" list="datalistOptions" onChange={handleSearch} id="exampleDataList" placeholder="Type to search..."/>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>La photo de l'équipement</th>
                    <th>Le nom de l'équipement</th>
                    <th>Le domaine de l'équipement</th>
                    <th>Le nombre de défauts associés</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    equipment.map(el => {
                        return (
                            <tr>
                                <td><img src={el.photo} className='img-rounded' alt="" /></td>
                                <td>{el.name}</td>
                                <td>{el.domain}</td>
                                <td>{el.nbFaults}</td>
                                <td><Link className='btn btn-primary' to={`/checkpoints/${el.id}`}>Details page</Link></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
       </div>
    </>
  )
}
