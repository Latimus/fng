import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Box, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { FngData } from '../models';
import dayjs from 'dayjs';



const FngChart = () => {

    const [data, setData] = React.useState<any[]>([]);
    const [dataMin, setDataMin] = React.useState(0);
    const [dataMax, setDataMax] = React.useState(100);
    const fetchData = async () => {
        const fngApi = 'https://api.alternative.me/fng/?limit=10';
        const fngData: FngData = await axios.get(fngApi).then(Response => Response.data);
        let data: any[] = [];
        let dMi = 100;
        let dMa = 0;
        fngData.data?.map((d) => {
            data.unshift({ name: dayjs.unix(+(d.timestamp)).format('DD/MM'), fng: +(d.value) });
            if (+(d.value) < dMi ) { dMi = +(d.value) }
            if (+(d.value) > dMa ) { dMa = +(d.value) }
        });
        setDataMin(dMi);
        setDataMax(dMa);
        setData(data);
    }
    if (data.length === 0) {
        fetchData().catch(console.error);
    }


    return (
        <>
            <Grid container spacing={2} m={2} direction={'row'} justifyContent={'center'} alignItems={'center'} >
                <Grid item xs />
                <Grid item xs={10} alignItems={'center'} alignContent={'center'}>
                    <Paper sx={{ padding: 2, textAlign: 'center' }}  >
                        <LineChart
                            width={800}
                            height={300}
                            data={data}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name"   />
                            <YAxis dataKey="fng" type='number' domain={[dataMin -2, dataMax +2]} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="fng" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </Paper>

                </Grid>
                <Grid item xs />
            </Grid>
        </>
    );
};

export default FngChart;