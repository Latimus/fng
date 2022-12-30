import React from 'react';
import { Stack, styled, Typography } from "@mui/material";

import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';


const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    marginBottom: '16px',
    background: '#243562',
    borderRadius: '15px',
    color: 'white',
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon=
        {<img
            src={"down-arrow.png"}
            width={"22px"}
        />}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'left',
}));

const Faq = () => {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    return (
        <>
            <Stack className={"center FAQ mt0"}>
                <Stack direction="row" className={"center"}>
                    <p className="faq-left"></p>
                    <h1>FAQ</h1>
                    <p className="faq-right"></p>
                </Stack>
            </Stack>
            <div>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>Q: What is this game?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Stack direction="row">
                                <div style={{ marginRight: '5px' }}>
                                    A:
                                </div>
                                <div>
                                    It's a prognostic game, without bookmaker, using the pari-mutuel principle. No
                                    hosting, no human, only this page and a Solana full automatique smart contract.
                                </div>
                            </Stack>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>Q: How to play?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Stack direction="row">
                                <div style={{ marginRight: '5px' }}>
                                    A:
                                </div>
                                <div>
                                    Connect your wallet to register, pickup a date, guess futur's value of FnG, place your bet then click BET button.
                                </div>
                            </Stack>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography>Q: How rate calculated?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Stack direction="row">
                                <div style={{ marginRight: '5px' }}>
                                    A:
                                </div>
                                <div>
                                    #TBD
                                </div>
                            </Stack>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                        <Typography>Q: What if i'm alone?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Stack direction="row">
                                <div style={{ marginRight: '5px' }}>
                                    A:
                                </div>
                                <div>
                                    No friend... it's sad. When you are the only player for the day, you can withdraw
                                    what you bet (less transaction fees ).
                                </div>
                            </Stack>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                        <Typography>Q: How do I collect my winnings?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Stack direction="row">
                                <div style={{ marginRight: '5px' }}>
                                    A:
                                </div>
                                <div>
                                    Choose a date in the past, to check your previous bets.
                                </div>
                            </Stack>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </>

    )
}
    ;

export default Faq;