import { TextField, Button, CircularProgress, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { green } from '@mui/material/colors';
import { Box, Stack } from '@mui/system';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alertAction, setGame, setPlayer } from '../redux/actions';
import { IState } from '../redux/reducers';
import { newBetSC } from '../sc/new_bet';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { getPlayer } from '../sc/get_player';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getGame } from '../sc/get_game';

const NewBet = () => {
    const state = useSelector((state: IState) => state);
    const [fng, setFng] = React.useState(20);
    const [lamport, setLamport] = React.useState(0.1);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const wallet = useAnchorWallet();
    const { connection } = useConnection();
    const dispatch = useDispatch();
    const handleFngChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFng(parseInt(event.target.value));
    }
    const handleLamportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLamport(parseFloat(event.target.value));
    }

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };
    const sendTrx = async () => {
        if (!loading && fng > 0 && fng <= 100 && lamport >= 0.01 && wallet) {
            setLoading(true);
            setSuccess(false);
            await newBetSC(
                wallet,
                connection,
                parseInt(state.dateValue.dateString),
                lamport * LAMPORTS_PER_SOL,
                fng,
                state.player,
                state.game,
            ).catch((err) => {
                dispatch(alertAction({ open: true, severity: 'error', message: err.message, title: 'ERROR' }));
                setLoading(false);
            }).then(async (trx) => {
                setSuccess(true);
                await getPlayer(wallet, connection).then(player => dispatch(setPlayer(player)));
                await getGame(wallet, connection, +(state.dateValue.dateString)).then(game => dispatch(setGame(game)));
                dispatch(alertAction({ open: true, severity: 'success', message: `https://explorer.solana.com/tx/${trx}`, title: 'sended' }));
            });
            setLoading(false);
        }
    }

    return (
        <>
            {
                state.dateValue &&
                <Box component="form" noValidate autoComplete={'off'}
                    style={{ backgroundColor: "white", padding: '15px', color: "grey" }}>
                    <p>What will be the {state.dateValue.dateString} fear & greed value?</p>
                    <Stack spacing={2} direction={"row"}>
                        <TextField
                            id="outlined-number"
                            label="FnG value"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{ step: 1, min: 1, max: 100 }}
                            value={fng}
                            onChange={handleFngChange}
                        />
                        <TextField
                            id="outlined-number2"
                            label="$Sol to bet"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{ step: 'any', min: 0.01 }}
                            value={lamport}
                            onChange={handleLamportChange}
                        />
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button variant='contained' startIcon={<PriceCheckIcon />} sx={buttonSx}
                                disabled={loading} onClick={sendTrx}>
                                bet
                            </Button>
                            {loading && (
                                <Dialog open={loading} >
                                    <DialogTitle sx={{ padding: '10px' }}>Sending Solana transaction...</DialogTitle>
                                    <DialogContent>
                                        <p></p>
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                                color: green[500],
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                marginLeft: '-12px',
                                            }}
                                        />
                                    </DialogContent>
                                </Dialog>
                            )}
                        </Box>
                    </Stack>
                </Box>
            }
        </>
    );
};

export default NewBet;