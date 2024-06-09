import React, { useEffect, useState } from 'react'
import Header from './Header'
import { getDatabase, onValue, ref } from 'firebase/database'
import { database } from '../firebase';
import { useParams } from 'react-router-dom';

export default function Checkpoints() {
    let { id } = useParams();
    let [equipment, setEqui] = useState({})
    let [checkpoint, setCheck] = useState([])
    const afficher = () => {
        const checkpointsdata = ref(database, `Checkpoints`);
        onValue(checkpointsdata, (snapshot) => {
        const data = snapshot.val();
        let newData = [];
        for(let key in data){
            if(data[key]['equipmentKey'] == id){
                newData.push({...data[key]})
            }
        }
        setCheck(newData)
        console.log(checkpoint);
        });

        const starCountRef = ref(database, 'Equipments');
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        for(let key in data){
            if(key == id){
                setEqui(data[key])
            }
        }
        });
        console.log(equipment);
    }
    useEffect(() => {
        afficher()
    }, [])
  return (
    <>
            <div class="card">
                <img src={equipment.photo} class="card-img-top img-check"  alt="..."/>
                <div class="card-body">
                    <div className="row">
                        <div className="col-6">
                            <span className='fw-bold'>Le nom de l'équipement: </span>
                            <span>{equipment.name}</span>
                        </div>
                        <div className="col-6">
                            <span className='fw-bold'>Le domaine de l'équipement: </span>
                            <span>{equipment.domain}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <span className='fw-bold'>Le nombre de défauts associés: </span>
                            <span>{equipment.nbFaults}</span>
                        </div>
                        <div className="col-6">
                            <span className='fw-bold'>Etablissment: </span>
                            <span>{equipment.building}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <span className='fw-bold'>Le model: </span>
                            <span>{equipment.model}</span>
                        </div>
                        <div className="col-6">
                            <span className='fw-bold'>niveau: </span>
                            <span>{equipment.niveau}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <span className='fw-bold'>Status: </span>
                            <span>{equipment.status}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container margin-table">
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>La photo si elle existe</th>
                            <th>Le point de contrôle</th>
                            <th>Le défaut si il existe</th>
                            <th>La préconisation si le défaut existe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            checkpoint.map(el => {
                                return (
                                    <tr>
                                        <td>{el.photo !== undefined ? <img src={el.photo} className='img-rounded' alt="" /> : ''}</td>
                                        <td>{el.name}</td>
                                        <td>{el.fault}</td>
                                        <td>{el.recommandation}</td>
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
