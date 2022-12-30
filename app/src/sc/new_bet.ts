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

export const newBetSC = async (
    wallet: AnchorWallet,
    connection: web3.Connection,
    fng_date: number,
    lamport: number,
    fng: number,
    player: Player,
    game: Game,
) => {

    const programId = new web3.PublicKey(idl.metadata.address);

    const player_pda = new web3.PublicKey(player.pda);
    const game_pda = new web3.PublicKey(game.pda);
    const [bank_authority, bank_authority_bump] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from(utf8.encode("bank_authority"))],
        programId
    );
    anchor.setProvider(new anchor.AnchorProvider(connection, wallet, { commitment: 'finalized', maxRetries: 5 }));
    const program = new Program(idl as anchor.Idl, programId)


    let initATAtx = new web3.Transaction({ feePayer: wallet.publicKey });

    if (player.bump === -1) {
        initATAtx.add(await program.methods.newPlayer()
            .accounts({
                payer: wallet.publicKey,
                playerPda: player_pda,
                systemProgram: web3.SystemProgram.programId,
                rent: web3.SYSVAR_RENT_PUBKEY,
            })
            .instruction());
    };

    if (game.bump === -1) {
        initATAtx.add(await program.methods.newGame(fng_date)
            .accounts({
                payer: wallet.publicKey,
                gamePda: game_pda,
                systemProgram: web3.SystemProgram.programId,
                rent: web3.SYSVAR_RENT_PUBKEY,
            })
            .instruction());
    }
    const i = await program.methods.newBet(fng_date, new BN(lamport), fng)
        .accounts({
            payer: wallet.publicKey,
            gamePda: game_pda,
            playerPda: player_pda,
            bankAuthority: bank_authority,
            systemProgram: web3.SystemProgram.programId,
        })
        .instruction().then((t) => t).catch((err) => { console.log(err) });
    if (i) {

        initATAtx.add(
            i
        );
    }

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
}