import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Header } from '../../components/headerComponent';
import './style.css';
import { CardInfoComponent } from '../../components/cardInfoComponent';
import PetsIcon from '@mui/icons-material/Pets';
import { PiDog } from "react-icons/pi";
import api from '../../api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaUsers } from "react-icons/fa";
import moment from 'moment';

export const Home = () => {
    const [totalRegisters, setTotalRegisters] = useState(0);
    const [portSmall, setPortSmall] = useState(0);
    const [portMedium, setPortMedium] = useState(0);
    const [portLarge, setPortLarge] = useState(0);
    const [city, setCity] = useState([]);
    const [registerDate, setRegisterDate] = useState([]);

    useEffect(() => {

        const getInfoCitys = async () => {
            try {
                const { data } = await api.post(`/cityInfos`);
                if (data && data.status === 1) setCity(data.infoCitys)
            } catch (err) {
                console.log(err);
            }
        }

        const getInfoDates = async () => {
            try {
                const { data } = await api.post(`/registerDateInfos`);
                if (data && data.status === 1) setRegisterDate(data.infoDate)
            } catch (err) {
                console.log(err);
            }
        }

        const getInfoCads = async () => {
            try {
                const { data } = await api.post('/cadsInfos');
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

        getInfoCitys();
        getInfoDates();
        getInfoCads();
    }, []);

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
                <div className='container-chart-city'>
                    <div className='title-chart'>
                        <Typography component={'span'} fontSize={21} >Índice por Cidade</Typography>
                    </div>
                    <ResponsiveContainer height={150} width={"100%"} >
                        <BarChart
                            data={city}
                        >
                            <CartesianGrid />
                            <XAxis dataKey="city" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar width={2} radius={7} dataKey="total" fill="#751b1b" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className='container-chart-date'>
                    <div className='title-chart'>
                        <Typography component={'span'} fontSize={21} >Índice por Mês</Typography>
                    </div>
                    <ResponsiveContainer height={150} width={"100%"} >
                        <BarChart
                            data={registerDate}
                        >
                            <CartesianGrid />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar width={2} radius={7} dataKey="total" fill="#751b1b" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="container-dashboard">
                    <div className="box-cards">
                        <CardInfoComponent icon={<FaUsers fontSize={35} />} title='Castrados' total={totalRegisters} textIcon='CPF' />
                        <CardInfoComponent icon={<FaUsers fontSize={35} />} title='Agendamentos' total={portSmall} textIcon='CPF' />
                        <CardInfoComponent icon={<FaUsers fontSize={35} />} title='Ausentes' total={portMedium} textIcon='CPF' />
                        <CardInfoComponent icon={<FaUsers fontSize={35} />} title='Banco de Dados' total={portLarge} textIcon='CPF' />
                    </div>
                </div>
            </div>
        </div>
    )
}