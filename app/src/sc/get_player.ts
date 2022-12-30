import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { utf8 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { Struct } from '@solana/web3.js';
import { deserializeUnchecked } from 'borsh';
import { Player } from '../models';
import idl from '../idl/fng.json';
import { Buffer } from 'buffer';

export const getPlayer = async (
    wallet: AnchorWallet,
    connection: Connection
): Promise<Player> => {
    const programId = new PublicKey(idl.metadata.address);

    const [player_pda, _player_pda_bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(utf8.encode("player")), wallet.publicKey.toBuffer()],
        programId
    );
    let player: Player = { bump: -1, betCount:0, pda: player_pda.toBase58(), playerBets: [] }

    class Primitive extends Struct {
        constructor(properties: any) {
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

    const account = await connection.getAccountInfo(player_pda);
    if (account) {
        let accountInfo: any = deserializeUnchecked(payloadSchema, Primitive, account.data);
        player.bump = accountInfo['bump'];
        const betCount = parseInt(accountInfo['betCount'].toString(), 10);
        player.betCount = betCount;
        for (let i = 0; i < betCount; i++) {
            try {
                if (parseInt(accountInfo[`f${i}`].toString(), 10) > 0) {
                    player.playerBets.push({
                        day: parseInt(accountInfo[`d${i}`].toString(), 10),
                        lamport: parseInt(accountInfo[`l${i}`].toString(), 10),
                        fng: parseInt(accountInfo[`f${i}`].toString(), 10),
                    });
                }
            } catch { }
        }
    } 
    return player;
}

