import secret from '/home/chavers/solana/wallet/secret';

import { clusterApiUrl, Connection, Keypair, PublicKey, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { deserializeUnchecked } from 'borsh';

import { bs58, utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Fng } from './idl/fng';


(async () => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    // const connection = new Connection("http://127.0.0.1:8899", "confirmed");
    const oracle = new PublicKey(secret.FNG_ORACLE_PUBLIC_KEY);
    const admin = new PublicKey(secret.FNG_ADMIN_PUBLIC_KEY);
    const bob = new PublicKey(secret.BOB_PUBLIC_KEY);
    const alice = new PublicKey(secret.ALICE_PUBLIC_KEY);
    const cha = new PublicKey(secret.CHAT_PUBLIC_KEY);
    await connection.confirmTransaction(
        await connection.requestAirdrop(oracle, LAMPORTS_PER_SOL * 1),
        "processed"
    );
    await connection.confirmTransaction(
        await connection.requestAirdrop(admin, LAMPORTS_PER_SOL * 5),
        "processed"
    );
    await connection.confirmTransaction(
        await connection.requestAirdrop(bob, LAMPORTS_PER_SOL * 1),
        "processed"
    );
    await connection.confirmTransaction(
        await connection.requestAirdrop(alice, LAMPORTS_PER_SOL * 1),
        "processed"
    );
    await connection.confirmTransaction(
        await connection.requestAirdrop(cha, LAMPORTS_PER_SOL * 1),
        "processed"
    );

})();