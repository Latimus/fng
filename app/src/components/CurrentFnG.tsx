import React from 'react';
import { Skeleton } from "@mui/material";

const CurrentFnG = (props: any) => {

    return (
        <>
            <h2 style={{ color: '#fff' }}>FnG Today: </h2>
            <img
                src="https://alternative.me/crypto/fear-and-greed-index.png"
                alt="Latest Crypto Fear & Greed Index"
                width={350} height={350}
            />

        </>
    )
};

export default CurrentFnG;