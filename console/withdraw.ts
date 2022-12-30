import secret from '/home/chavers/solana/wallet/secret';

import {
    clusterApiUrl,
    Connection,
    Keypair,
    PublicKey,
    SystemProgram,
    Transaction,
    LAMPORTS_PER_SOL
} from '@solana/web3.js';
import {deserializeUnchecked} from 'borsh';

import {bs58, utf8} from "@project-serum/anchor/dist/cjs/utils/bytes";
import * as anchor from '@project-serum/anchor';
import {Program} from '@project-serum/anchor';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import {Fng} from './idl/fng';
import {TOKEN_PROGRAM_ID} from "@solana/spl-token";

(async () => {
    // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const connection = new Connection("http://127.0.0.1:8899", "confirmed");
    const bob = Keypair.fromSecretKey(bs58.decode(secret.BOB_SECRET_KEY));
    const alice = Keypair.fromSecretKey(bs58.decode(secret.ALICE_SECRET_KEY));
    const cha = Keypair.fromSecretKey(bs58.decode(secret.CHAT_SECRET_KEY));
    let payer = alice;
    const options = anchor.AnchorProvider.defaultOptions();
    const wallet = new NodeWallet(payer);
    const provider = new anchor.AnchorProvider(connection, wallet, options);
    anchor.setProvider(provider);
    const program = anchor.workspace.Fng as Program<Fng>;
    const fng_date = 20221220;
    console.log("programId:", program.programId.toBase58());

    const [player_pda, _player_pda_bump] = await PublicKey.findProgramAddress(
        [Buffer.from(utf8.encode("player")), payer.publicKey.toBuffer()],
        program.programId
    );
    const [game_pda, _game_pda_bump] = await PublicKey.findProgramAddress(
        [Buffer.from(utf8.encode(`game${fng_date}`))],
        program.programId
    );
    const [bank_authority, bank_authority_bump] = await PublicKey.findProgramAddress(
        [Buffer.from(utf8.encode("bank_authority"))],
        program.programId
    );

    console.log('player_pda', player_pda.toBase58());
    console.log('game_pda', game_pda.toBase58());
    console.log('bank_authority', bank_authority.toBase58());

    const tx = await program.methods.withdraw(fng_date)
        .accounts({
            payer: payer.publicKey,
            gamePda: game_pda,
            playerPda: player_pda,
            bankAuthority: bank_authority,
            systemProgram: SystemProgram.programId,
        })
        .signers([payer])
        .rpc();
    connection.getTransaction(tx).then((resp) => {
        console.log("transaction id:", tx);
    });


})();