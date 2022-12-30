import secret from '/home/chavers/solana/wallet/secret';

import {clusterApiUrl, Connection, Keypair, PublicKey, Struct, Transaction} from '@solana/web3.js';
import {deserializeUnchecked} from 'borsh';

import {bs58, utf8} from "@project-serum/anchor/dist/cjs/utils/bytes";
import * as anchor from '@project-serum/anchor';
import {Program} from '@project-serum/anchor';
import {Fng} from './idl/fng';


(async () => {
    // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const connection = new Connection("http://127.0.0.1:8899", "confirmed");
    const program = anchor.workspace.Fng as Program<Fng>;
    const payer = Keypair.fromSecretKey(bs58.decode(secret.BOB_SECRET_KEY));
    const fng_date = 20221220;


    const [game_pda, _game_pda_bump] = await PublicKey.findProgramAddress(
        [Buffer.from(utf8.encode(`game${fng_date}`))],
        program.programId
    );

    console.log('game_pda', game_pda.toBase58());

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
                    ["oracle", "u8"],
                    ["vector", [4]],

                    ["f0", "u8"],
                    ["l0", "u64"],
                    ["f1", "u8"],
                    ["l1", "u64"],
                    ["f2", "u8"],
                    ["l2", "u64"],
                    ["f3", "u8"],
                    ["l3", "u64"],
                    ["f4", "u8"],
                    ["l4", "u64"],
                    ["f5", "u8"],
                    ["l5", "u64"],
                    ["f6", "u8"],
                    ["l6", "u64"],
                    //    ... 99
                ]
            }
        ]
    ]);


    await connection.getAccountInfo(game_pda)
        .then((account) => {
            let accountInfo = deserializeUnchecked(payloadSchema, Primitive, account.data);
            console.log('Discriminator:', bs58.encode(accountInfo['Discriminator']));
            console.log("betCount", parseInt(accountInfo["betCount"].toString(), 10));
            console.log("oracle", parseInt(accountInfo["oracle"].toString(), 10));
            for (let i = 0; i < 10; i++) {
                try {
                    if (parseInt(accountInfo[`f${i}`].toString(), 10) > 0) {
                        console.log("fng", parseInt(accountInfo[`f${i}`].toString(), 10));
                        console.log('lamport:', parseInt(accountInfo[`l${i}`].toString(), 10) / 1000000000, 'sol');
                    }
                } catch {}
            }
        })
})();