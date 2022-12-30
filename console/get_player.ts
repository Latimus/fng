import secret from '/home/chavers/solana/wallet/secret';

import {clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, Struct, Transaction} from '@solana/web3.js';
import {deserializeUnchecked} from 'borsh';

import {bs58, utf8} from "@project-serum/anchor/dist/cjs/utils/bytes";
import * as anchor from '@project-serum/anchor';
import {Program} from '@project-serum/anchor';
import {Fng} from './idl/fng';


(async () => {
    // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const connection = new Connection("http://127.0.0.1:8899", "confirmed");
    const program = anchor.workspace.Fng as Program<Fng>;
    const bob = Keypair.fromSecretKey(bs58.decode(secret.BOB_SECRET_KEY));
    const alice = Keypair.fromSecretKey(bs58.decode(secret.ALICE_SECRET_KEY));
    const cha = Keypair.fromSecretKey(bs58.decode(secret.CHAT_SECRET_KEY));
    const adm = Keypair.fromSecretKey(bs58.decode(secret.FNG_ADMIN_SECRET_KEY));
    let payer = alice;


    const [player_pda, _player_pda_bump] = await PublicKey.findProgramAddress(
        [Buffer.from(utf8.encode("player")), payer.publicKey.toBuffer()],
        program.programId
    );

    console.log('player_pda', player_pda.toBase58());

    class Assignable {
        constructor(properties) {
            Object.keys(properties).map((key) => {
                return (this[key] = properties[key]);
            });
        }
    }

    class Payload extends Assignable {
    }
    class Primitive extends Struct {
        constructor(properties) {
            super(properties);
        }

    }
    const payloadSchema = new Map([
        [
            Primitive,
            {
                kind: "struct",
                fields: [
                    ["Discriminator", [8]],
                    ["bump", "u8"],
                    ["betCount", "u8"],
                    ["vector", [4]],

                    ["f0", "u8"],
                    ["l0", "u64"],
                    ["d0", "u32"],

                    ["f1", "u8"],
                    ["l1", "u64"],
                    ["d1", "u32"],

                    ["f2", "u8"],
                    ["l2", "u64"],
                    ["d2", "u32"],
              
                    ["f3", "u8"],
                    ["l3", "u64"],
                    ["d3", "u32"],
              
                    ["f4", "u8"],
                    ["l4", "u64"],
                    ["d4", "u32"],
              
                    ["f5", "u8"],
                    ["l5", "u64"],
                    ["d5", "u32"],
              
                    ["f6", "u8"],
                    ["l6", "u64"],
                    ["d6", "u32"],
              
                    ["f7", "u8"],
                    ["l7", "u64"],
                    ["d7", "u32"],
              
                    ["f8", "u8"],
                    ["l8", "u64"],
                    ["d8", "u32"],
              
                    ["f9", "u8"],
                    ["l9", "u64"],
                    ["d9", "u32"],
              
                ]
            }
        ]
    ]);


    await connection.getAccountInfo(player_pda,'finalized')
        .then((account) => {
            console.log('data size', account.data.length);
            let accountInfo = deserializeUnchecked(payloadSchema, Primitive, account.data);
            console.log('Discriminator:', bs58.encode(accountInfo['Discriminator']));
            const betCount = parseInt(accountInfo['betCount'].toString(), 10);
            console.log("betCount:", betCount);
            
            for (let i = 0; i < betCount; i++) {
                try {
                    if (parseInt(accountInfo[`f${i}`].toString(), 10) > 0) {
                        console.log("fng:", parseInt(accountInfo[`f${i}`].toString(), 10));
                        console.log('lamport:', parseInt(accountInfo[`l${i}`].toString(), 10) / LAMPORTS_PER_SOL, 'sol');
                        console.log('day:', parseInt(accountInfo[`d${i}`].toString(), 10));
                    }
                } catch {}
            }
        })
})();