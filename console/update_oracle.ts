import secret from '/home/chavers/solana/wallet/secret';

import {clusterApiUrl, Connection, Keypair, PublicKey, Transaction} from '@solana/web3.js';
import {deserializeUnchecked} from 'borsh';

import {bs58, utf8} from "@project-serum/anchor/dist/cjs/utils/bytes";
import * as anchor from '@project-serum/anchor';
import {Program} from '@project-serum/anchor';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import {Fng} from './idl/fng';
import {TOKEN_PROGRAM_ID} from "@solana/spl-token";

(async () => {
    // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const connection = new Connection("http://127.0.0.1:8899", "processed");
    const payer = Keypair.fromSecretKey(bs58.decode(secret.FNG_ORACLE_SECRET_KEY));
    const options = anchor.AnchorProvider.defaultOptions();
    const wallet = new NodeWallet(payer);
    const provider = new anchor.AnchorProvider(connection, wallet, options);
    const fng_date = 20221220;
    anchor.setProvider(provider);
    const program = anchor.workspace.Fng as Program<Fng>;

    console.log("programId:", program.programId.toBase58());

    const [config_account, _config_account_bump] = await PublicKey.findProgramAddress(
        [Buffer.from(utf8.encode("config_fng"))],
        program.programId
    );
    const [oracle_pda, _oracle_pda_bump] = await PublicKey.findProgramAddress(
        [Buffer.from(utf8.encode(`oracle${fng_date}`))],
        program.programId
    );
    const [game_pda, _game_pda_bump] = await PublicKey.findProgramAddress(
        [Buffer.from(utf8.encode(`game${fng_date}`))],
        program.programId
    );
    console.log('config_account', config_account.toBase58());
    console.log('oracle_pda', oracle_pda.toBase58());

    let initATAtx = new Transaction();
    initATAtx.add(program.instruction.updateOracle(
        fng_date,
        20,
        {
            accounts: {
                payer: payer.publicKey,
                configFng: config_account,
                gamePda: game_pda,
                systemProgram: anchor.web3.SystemProgram.programId,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            }
        }
    ));

    if (initATAtx.instructions.length > 0) {
        initATAtx.feePayer = payer.publicKey;
        let tx = null;
        await provider.connection.confirmTransaction(
            tx = await connection.sendTransaction(initATAtx, [payer]),
            "finalized"
        );
        console.log("transaction id:", tx);
    }


})();