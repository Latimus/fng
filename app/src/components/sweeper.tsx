import { Grid } from '@mui/material';
import React, { FC } from 'react';
import DenseTable from "./BetTable";
import CurrentFnG from "./CurrentFnG";


const Sweeper: FC = props => {

    return (
        <div>
            <div style={{ height: "100px" }}></div>
            <div className={"prize-border"}>
                <Grid container direction="row" justifyContent="center"
                    alignItems="flex-end">
                    <Grid xs={12} md={6} style={{
                        padding: '35px',
                    }}>
                        <CurrentFnG />
                    </Grid>
                    <Grid xs={12} md={6} style={{
                        padding: '35px',
                    }}>
                        <DenseTable />
                    </Grid>
                </Grid>
            </div>

        </div>
    );
}

export default Sweeper