import * as React from 'react';

import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button, ButtonProps, Stack, styled } from '@mui/material';
import { grey, yellow } from '@mui/material/colors';
import '@solana/wallet-adapter-react-ui/styles.css';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const LogoButton = styled(Button)<ButtonProps>(({ theme }) => ({
    // color: theme.palette.getContrastText(yellow[500]),
    // backgroundColor: yellow[500],
    // '&:hover': {
    //     backgroundColor: yellow[500],
    // },
}));

const LogoTitleButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: '#000000',
    fontSize: '22px',
}));

const MenuButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: grey[700],
    fontSize: '17px',
    lineHeight: '27px',
    fontWeight: '700',
    fontFamily: 'Open Sans,sans-serif',
    padding: '4px',
    minWidth: '0',
    '&:hover': {
        color: yellow[500],
    }

}));


const Menu = () => {

    return (
        <>
            <div className="menu">

                <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    className={"width-menu"}
                >
                    <Stack direction="row" className={"logo"}>
                        <LogoButton
                            style={{
                                marginTop: '10px',
                                marginBottom: '10px',
                                minWidth: '0',
                                padding: '0',
                                // backgroundColor: '#fff',
                            }}>
                            <img
                                src={"fng.png"}
                                width={"55px"}
                            />
                        </LogoButton>
                        <LogoTitleButton>
                            <p className={"logo-title-button"}>Crypto Fear & Greed</p>
                        </LogoTitleButton>
                    </Stack>
                        <WalletMultiButton />
                </Stack>
            </div>
        </>
    );
}

export default Menu