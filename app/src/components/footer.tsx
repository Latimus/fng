import * as React from 'react';
import { Stack } from '@mui/material';
import SnackAlert from './snack_alert';

const Footer = () => {
    return (        
        <div className="solanaAvatarArea">
            <Stack direction="row" className={"width70 center height186"}>
                <div className={"kitty-img"}>
                    <img
                        src="fng.png"
                        width={"380px"}
                    />
                </div>
                <div className={"center solana-img-div"}>
                    <p className={"solana-label"}>POWERED BY</p>
                    <img src="solana.png" className={"solana-img"} />
                </div>
            </Stack>
            <SnackAlert />

        </div>
    );
}

export default Footer