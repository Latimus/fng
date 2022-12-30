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
    const connection = new Connection("http://127.0.0.1:8899", "confirmed");

    const bob = Keypair.fromSecretKey(bs58.decode(secret.BOB_SECRET_KEY));
    const alice = Keypair.fromSecretKey(bs58.decode(secret.ALICE_SECRET_KEY));
    const cha = Keypair.fromSecretKey(bs58.decode(secret.CHAT_SECRET_KEY));
    let payer = cha;
    const options = anchor.AnchorProvider.defaultOptions();
    const wallet = new NodeWallet(payer);
    const provider = new anchor.AnchorProvider(connection, wallet, options);
    anchor.setProvider(provider);
    const program = anchor.workspace.Fng as Program<Fng>;

    console.log("programId:", program.programId.toBase58());

    const [player_pda, _player_pda_bump] = await PublicKey.findProgramAddress(
        [Buffer.from(utf8.encode("player")), payer.publicKey.toBuffer()],
        program.programId
    );

    console.log('player_pda', player_pda.toBase58());

    let initATAtx = new Transaction();
    initATAtx.add(program.instruction.newPlayer(
        {
            accounts: {
                payer: payer.publicKey,
                playerPda: player_pda,
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