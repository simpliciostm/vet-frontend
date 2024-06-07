import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Header } from '../../components/headerComponent';
import './style.css';
import { CardInfoComponent } from '../../components/cardInfoComponent';
import PetsIcon from '@mui/icons-material/Pets';
import { PiDog } from "react-icons/pi";
import api from '../../api';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Home = () => {
    const [totalRegisters, setTotalRegisters] = useState(0);
    const [portSmall, setPortSmall] = useState(0);
    const [portMedium, setPortMedium] = useState(0);
    const [portLarge, setPortLarge] = useState(0);

    useEffect(() => {
        const getInfo = async () => {
            try {
                const { data } = await api('/cadsInfos');
                if (data && data.status === 1) {
                    setTotalRegisters(data.totalRegister);
                    setPortSmall(data.portSmall)
                    setPortMedium(data.portMedium)
                    setPortLarge(data.portLarge)
                }
            } catch (err) {
                console.log(err);
            }
        }
        getInfo();
    }, []);

    const data = [
        {
            name: 'Bauru',
            uv: 4000,
        },
        {
            name: 'Page B',
            uv: 3000,
        },
        {
            name: 'Page C',
            uv: 2000,
        },
        {
            name: 'Page D',
            uv: 2780,
        },
        {
            name: 'Page E',
            uv: 1890,
        },
        {
            name: 'Page F',
            uv: 2390
        },
        {
            name: 'Page G',
            uv: 3490,
        },
    ];

    return (
        <div>
            <Header />
            <div className="container-home">
                <div className="title-home">
                    <Typography component={'span'} fontSize={25}>Dashboard</Typography>
                </div>
                <div className="container-dashboard">
                    <div className="box-cards">
                        <CardInfoComponent icon={<PetsIcon fontSize='large' />} title='Total de Animais - Castrados' total={totalRegisters} />
                        <CardInfoComponent icon={<PiDog fontSize={25} />} title='Porte Pequeno' total={portSmall} />
                        <CardInfoComponent icon={<PiDog fontSize={35} />} title='Porte médio' total={portMedium} />
                        <CardInfoComponent icon={<PiDog fontSize={45} />} title='Porte Grande' total={portLarge} />
                    </div>
                </div>
                <div className='container-chart'>
                    <div className='title-chart'>
                    <Typography component={'span'} fontSize={21} >Índice por Cidade</Typography>
                    </div>
                    <ResponsiveContainer height={250} >
                        <BarChart
                            width={300}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar width={2} radius={7} dataKey="uv" fill="#751b1b" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}