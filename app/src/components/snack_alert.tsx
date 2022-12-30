import { AlertColor, AlertProps, Snackbar, Alert, AlertTitle } from '@mui/material';
import React from 'react';
import { SA } from '../models';
import { useSelector, useDispatch } from 'react-redux';
import { alertAction } from '../redux/actions';
import { IState } from '../redux/reducers';


const SnackAlert = () => {

    const snackAlert = useSelector((state: IState) => state.snackAlert);
    const dispatch = useDispatch();

    // const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    //     props,
    //     ref,
    // ) {
    //     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    // });
    const closeAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(alertAction({ open: false, severity: 'success', message: "", title: "" }));
    };

    return (
        <>
            {
                snackAlert && snackAlert.open &&
                <Snackbar open={snackAlert.open} autoHideDuration={6000} onClose={closeAlert} >
                    <Alert onClose={closeAlert} severity={snackAlert.severity} sx={{ width: '100%' }}>
                        <AlertTitle>{snackAlert.title}</AlertTitle>
                        {snackAlert.message}
                    </Alert>
                </Snackbar>
            }
        </>
    );
};

export default SnackAlert;