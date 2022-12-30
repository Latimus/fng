import React from 'react';
import RuleIcon from '@mui/icons-material/Rule';
import { Button, Box, CircularProgress, Backdrop, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Bets } from '../models';
import { IState } from '../redux/reducers';
import dayjs from 'dayjs';
import { green } from '@mui/material/colors';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useDispatch, useSelector } from 'react-redux';
import { withdrawSC } from '../sc/withdraw';
import { alertAction, setPlayer } from '../redux/actions';
import { getPlayer } from '../sc/get_player';


const Withdraw = () => {
    const state = useSelector((state: IState) => state);
    const [getResult, setGetResult] = React.useState<Bets[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const wallet = useAnchorWallet();
    const { connection } = useConnection();
    const dispatch = useDispatch();

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    React.useEffect(() => {
        setGetResult(state.player.playerBets.filter(x => x.day && x.day < +(dayjs().format('YYYYMMDD'))));
    }, [state.player]);

    const sendWithdraw = async () => {
        if (!loading && wallet) {
            setLoading(true);
            setSuccess(false);
            await withdrawSC(
                wallet,
                connection,
                state.player,
            ).then(async (trx) => {
                setSuccess(true);
                await getPlayer(wallet, connection).then((player) => { dispatch(setPlayer(player)) });
                if (state.game.oracle === state.player.playerBets.filter(x => x.day === +(state.dateValue.dateString))[0].fng) {
                    dispatch(alertAction({ open: true, severity: 'success', title:'You win !!!', message: `https://explorer.solana.com/tx/${trx}` }));
                } else {
                    dispatch(alertAction({ open: true, severity: 'warning',title:'You lost :(', message: `https://explorer.solana.com/tx/${trx}` }));
                }
            }).catch((err) => {
                dispatch(alertAction({ open: true, severity: 'error', message: err.message, title: 'ERROR' }));
            });
            setLoading(false);
        }
    }
    return (
        <>
            {
                getResult &&
                <Box style={{ backgroundColor: "white", padding: '15px', color: "grey" }}>
                    <h3>You have a result pending.</h3>
                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Button variant='contained' startIcon={<RuleIcon />} sx={buttonSx}
                            disabled={loading} onClick={sendWithdraw}>
                            Check
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
                </Box>
            }
        </>
    );

}

export default Withdraw;