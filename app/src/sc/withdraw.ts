import * as web3 from '@solana/web3.js';
import { utf8 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';
import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import {
    AnchorWallet
} from '@solana/wallet-adapter-react';
import { Game, Player } from '../models';
import BN from 'bn.js';
import idl from '../idl/fng.json';
import { Buffer } from 'buffer';
import dayjs from 'dayjs';

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const withdrawSC = async (
    wallet: AnchorWallet,
    connection: web3.Connection,
    player: Player,
) => {
    const programId = new web3.PublicKey(idl.metadata.address);
    const player_pda = new web3.PublicKey(player.pda);
    anchor.setProvider(new anchor.AnchorProvider(connection, wallet, { commitment: 'finalized', maxRetries: 5 }));
    const program = new Program(idl as anchor.Idl, programId)

    const getPDA = (buff: string) => {
        const [pda, _pda_bump] = web3.PublicKey.findProgramAddressSync(
            [Buffer.from(utf8.encode(buff))],
            programId
        );
        return pda;
    }
    const bank_authority = getPDA("bank_authority");
    let initATAtx = new web3.Transaction({ feePayer: wallet.publicKey });
    const today = +(dayjs().format('YYYYMMDD'));

    const addInstruction = async () => {
        return Promise.all(
            player.playerBets.map(async (bet) => {
                if (today > bet.day) {
                    const game_pda = getPDA(`game${bet.day}`);
                    initATAtx.add(await program.methods
                        .withdraw(bet.day)
                        .accounts({
                            payer: wallet.publicKey,
                            gamePda: game_pda,
                            playerPda: player_pda,
                            bankAuthority: bank_authority,
                            systemProgram: web3.SystemProgram.programId,
                        })
                        .instruction());
                }
            })
        );

    }
    await addInstruction();
    if (initATAtx.instructions.length > 0) {

        const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight },
        } = await connection.getLatestBlockhashAndContext();

        if (!blockhash) {
            console.log('no blockhash, cancel');
            return null;
        }
        initATAtx.recentBlockhash = blockhash;
        const signature = await wallet.signTransaction(initATAtx);

        const trx = await connection.sendRawTransaction(signature.serialize());
        await connection.confirmTransaction(trx, 'finalized');
        return trx;
    } else {
        console.log('no trx to send');
    }

};