import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { DataGrid, GridColDef, GridRowClassNameParams, GridValueFormatterParams } from '@mui/x-data-grid';
import {
    useConnection,
    useAnchorWallet,
    AnchorWallet,
} from '@solana/wallet-adapter-react';
import { getPlayer } from '../sc/get_player';
import { Connection } from '@solana/web3.js';
import { getGame } from '../sc/get_game';
import { Paper, Box, Grid, TextField, CircularProgress } from '@mui/material';
import { Bets, Rating } from '../models';
import { dateAction, setGame, setPlayer } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../redux/reducers';
import NewBet from './new_bet';
import Withdraw from './withdraw';
import { green } from '@mui/material/colors';

const DenseTable = () => {
    const columns: GridColDef[] = [
        { field: 'fng', headerName: 'Fear & Greed', width: 150, type: 'number' },
        {
            field: 'rating',
            headerName: 'Rating',
            width: 150,
            type: 'number',
            valueFormatter: (params: GridValueFormatterParams<number>) => {
                if (params.value == null) {
                    return '1/1';
                }
                return `${params.value} /1`;
            },
        },
        { field: 'bet', headerName: 'Your bet', width: 150, type: 'string' }
    ];


    const dispatch = useDispatch();
    const state = useSelector((state: IState) => state);
    const [reloadPage, setReloadPage] = React.useState(false);
    const wallet = useAnchorWallet();
    const { connection } = useConnection();

    const handleChange = (newValue: Dayjs | null) => {
        if (newValue) {
            dispatch(dateAction({ date: newValue, dateString: newValue.format('YYYYMMDD') }));
        }
    };
    const beted = (params: GridRowClassNameParams) => {
        if (currentBet[0] && params.row) {
            if (currentBet[0].fng === params.row.fng) {
                return 'beted';
            }
        }
        return '';
    }
    const [playerLoading, setPlayerLoading] = React.useState(false);
    const [gameLoading, setGameLoading] = React.useState(false);
    const [pastBet, setPastBet] = React.useState<Bets[]>([]);
    const [currentBet, setCurrentBet] = React.useState<Bets[]>([]);
    const [currentDate, setCurrentDate] = React.useState<number>(+(dayjs().format('YYYYMMDD')));
    const [rows, setRows] = React.useState<Rating[]>([]);

    React.useEffect(() => {
        const fetchData = async (wallet: AnchorWallet, connection: Connection, fng_date: Number) => {
            setPlayerLoading(true);
            await getPlayer(wallet, connection).then((player) => {
                dispatch(setPlayer(player));
            });
            setPlayerLoading(false);
        }
        if (wallet && wallet.publicKey) {
            fetchData(wallet, connection, +(state.dateValue.dateString)).catch(console.error);
        }
    }, [wallet]);

    React.useEffect(() => {
        const fetchData = async (wallet: AnchorWallet, connection: Connection, fng_date: Number) => {
            setGameLoading(true);
            await getGame(wallet, connection, fng_date).then((game) => {
                dispatch(setGame(game));
            });
            setGameLoading(false);
        }
        if (wallet && wallet.publicKey) {
            fetchData(wallet, connection, +(state.dateValue.dateString)).catch(console.error);
            setCurrentBet(state.player.playerBets.filter(x => x.day && x.day === +(state.dateValue.dateString)));
        }
    }, [state.dateValue]);


    React.useEffect(() => {
        if (wallet && wallet.publicKey) {
            const bets = state.player.playerBets.filter(x => x.day && x.day <= currentDate);
            setPastBet(bets);
            if (wallet && bets.length > 0) {
                dispatch(dateAction({ date: dayjs(bets[0].day.toString(), { format: 'YYYMMDD', utc: true }), dateString: bets[0].day.toString() }))
            } else {
                dispatch(dateAction({ date: dayjs().add(1, 'day'), dateString: dayjs().add(1, 'day').format('YYYYMMDD') }));
            }
        }
    }, [state.player]);

    React.useEffect(() => {
        let r: Rating[] = [];
        let totalBet = 0;
        state.game.bets.forEach(b => { totalBet += b.lamport ?? 0 });
        state.game.bets.sort((a, b) => a.fng - b.fng).forEach((b, i) => {
            r.push({
                id: i, fng: b.fng, rating: +((totalBet / b.lamport).toFixed(2)),
                bet: (currentBet.length > 0 && b.fng === currentBet[0].fng ? `${(currentBet[0].lamport / 1000000000).toLocaleString()} sol` : '')
            })
        })
        setRows(r);
    }, [state.game])


    return (
        <>
            <div>
                <Grid container spacing={1}>
                    <Grid item xs />
                    <Grid item xs={4}>
                        <Paper elevation={3} >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label=""
                                    inputFormat="DD/MM/YYYY"
                                    value={state.dateValue.date}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                    disablePast={false}
                                />
                            </LocalizationProvider>
                        </Paper>
                        <p></p>
                    </Grid>
                    <Grid item xs />
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Paper elevation={3}>
                            <Box sx={{ height: 275, position: 'relative' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    disableColumnMenu
                                    disableSelectionOnClick
                                    density={'compact'}
                                    editMode={'row'}
                                    getRowClassName={(params) => beted(params)}

                                />
                                {(playerLoading || gameLoading) && (
                                    <CircularProgress
                                        size={48}
                                        sx={{
                                            color: green[500],
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            marginTop: '-12px',
                                            marginLeft: '-12px',
                                        }}
                                    />
                                )}
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        {
                            !wallet &&
                            <Box style={{ backgroundColor: "white", padding: '15px', color: "grey" }}>
                                <h3>please sign in with your Solana wallet.</h3>
                            </Box>
                        }
                        {
                            wallet && pastBet.length === 0 && currentBet.length === 0 && +(state.dateValue.dateString) > currentDate &&
                            <NewBet />
                        }
                        {
                            wallet && pastBet.length === 0 && currentBet.length === 1 && +(state.dateValue.dateString) > currentDate &&
                            <h3>You already have a bet for this day, take another to play.</h3>
                        }
                        {
                            wallet && pastBet.length > 0 &&
                            <Withdraw />
                        }
                        {
                            wallet && pastBet.length === 0 && +(state.dateValue.dateString) <= currentDate &&
                            <h3>No pending result. Pickup a future's date to play.</h3>
                        }
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
export default DenseTable;