import { Connection, PublicKey, Struct } from '@solana/web3.js';
import { utf8 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { deserializeUnchecked } from 'borsh';
import { Game } from '../models';
import idl from '../idl/fng.json';
import { Buffer } from 'buffer';

export const getGame = async (
    wallet: AnchorWallet,
    connection: Connection,
    fng_date: Number,
): Promise<Game> => {
    const programId = new PublicKey(idl.metadata.address);
    const [game_pda, _game_pda_bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(utf8.encode(`game${fng_date}`))],
        programId
    );
    let game: Game = { betCount: 0, oracle: -1, bump: -1, bets: [], pda: game_pda.toBase58() };

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
                    ["oracle", "u8"],
                    ["vector", [4]],

                    ["f0", "u8"], ["l0", "u64"],
                    ["f1", "u8"], ["l1", "u64"],
                    ["f2", "u8"], ["l2", "u64"],
                    ["f3", "u8"], ["l3", "u64"],
                    ["f4", "u8"], ["l4", "u64"],
                    ["f5", "u8"], ["l5", "u64"],
                    ["f6", "u8"], ["l6", "u64"],
                    ["f7", "u8"], ["l7", "u64"],
                    ["f8", "u8"], ["l8", "u64"],
                    ["f9", "u8"], ["l9", "u64"],
                    ["f10", "u8"], ["l10", "u64"],
                    ["f11", "u8"], ["l11", "u64"],
                    ["f12", "u8"], ["l12", "u64"],
                    ["f13", "u8"], ["l13", "u64"],
                    ["f14", "u8"], ["l14", "u64"],
                    ["f15", "u8"], ["l15", "u64"],
                    ["f16", "u8"], ["l16", "u64"],
                    ["f17", "u8"], ["l17", "u64"],
                    ["f18", "u8"], ["l18", "u64"],
                    ["f19", "u8"], ["l19", "u64"],
                    ["f20", "u8"], ["l20", "u64"],
                    ["f21", "u8"], ["l21", "u64"],
                    ["f22", "u8"], ["l22", "u64"],
                    ["f23", "u8"], ["l23", "u64"],
                    ["f24", "u8"], ["l24", "u64"],
                    ["f25", "u8"], ["l25", "u64"],
                    ["f26", "u8"], ["l26", "u64"],
                    ["f27", "u8"], ["l27", "u64"],
                    ["f28", "u8"], ["l28", "u64"],
                    ["f29", "u8"], ["l29", "u64"],
                    ["f30", "u8"], ["l30", "u64"],
                    ["f31", "u8"], ["l31", "u64"],
                    ["f32", "u8"], ["l32", "u64"],
                    ["f33", "u8"], ["l33", "u64"],
                    ["f34", "u8"], ["l34", "u64"],
                    ["f35", "u8"], ["l35", "u64"],
                    ["f36", "u8"], ["l36", "u64"],
                    ["f37", "u8"], ["l37", "u64"],
                    ["f38", "u8"], ["l38", "u64"],
                    ["f39", "u8"], ["l39", "u64"],
                    ["f40", "u8"], ["l40", "u64"],
                    ["f41", "u8"], ["l41", "u64"],
                    ["f42", "u8"], ["l42", "u64"],
                    ["f43", "u8"], ["l43", "u64"],
                    ["f44", "u8"], ["l44", "u64"],
                    ["f45", "u8"], ["l45", "u64"],
                    ["f46", "u8"], ["l46", "u64"],
                    ["f47", "u8"], ["l47", "u64"],
                    ["f48", "u8"], ["l48", "u64"],
                    ["f49", "u8"], ["l49", "u64"],
                    ["f50", "u8"], ["l50", "u64"],
                    ["f51", "u8"], ["l51", "u64"],
                    ["f52", "u8"], ["l52", "u64"],
                    ["f53", "u8"], ["l53", "u64"],
                    ["f54", "u8"], ["l54", "u64"],
                    ["f55", "u8"], ["l55", "u64"],
                    ["f56", "u8"], ["l56", "u64"],
                    ["f57", "u8"], ["l57", "u64"],
                    ["f58", "u8"], ["l58", "u64"],
                    ["f59", "u8"], ["l59", "u64"],
                    ["f60", "u8"], ["l60", "u64"],
                    ["f61", "u8"], ["l61", "u64"],
                    ["f62", "u8"], ["l62", "u64"],
                    ["f63", "u8"], ["l63", "u64"],
                    ["f64", "u8"], ["l64", "u64"],
                    ["f65", "u8"], ["l65", "u64"],
                    ["f66", "u8"], ["l66", "u64"],
                    ["f67", "u8"], ["l67", "u64"],
                    ["f68", "u8"], ["l68", "u64"],
                    ["f69", "u8"], ["l69", "u64"],
                    ["f70", "u8"], ["l70", "u64"],
                    ["f71", "u8"], ["l71", "u64"],
                    ["f72", "u8"], ["l72", "u64"],
                    ["f73", "u8"], ["l73", "u64"],
                    ["f74", "u8"], ["l74", "u64"],
                    ["f75", "u8"], ["l75", "u64"],
                    ["f76", "u8"], ["l76", "u64"],
                    ["f77", "u8"], ["l77", "u64"],
                    ["f78", "u8"], ["l78", "u64"],
                    ["f79", "u8"], ["l79", "u64"],
                    ["f80", "u8"], ["l80", "u64"],
                    ["f81", "u8"], ["l81", "u64"],
                    ["f82", "u8"], ["l82", "u64"],
                    ["f83", "u8"], ["l83", "u64"],
                    ["f84", "u8"], ["l84", "u64"],
                    ["f85", "u8"], ["l85", "u64"],
                    ["f86", "u8"], ["l86", "u64"],
                    ["f87", "u8"], ["l87", "u64"],
                    ["f88", "u8"], ["l88", "u64"],
                    ["f89", "u8"], ["l89", "u64"],
                    ["f90", "u8"], ["l90", "u64"],
                    ["f91", "u8"], ["l91", "u64"],
                    ["f92", "u8"], ["l92", "u64"],
                    ["f93", "u8"], ["l93", "u64"],
                    ["f94", "u8"], ["l94", "u64"],
                    ["f95", "u8"], ["l95", "u64"],
                    ["f96", "u8"], ["l96", "u64"],
                    ["f97", "u8"], ["l97", "u64"],
                    ["f98", "u8"], ["l98", "u64"],
                    ["f99", "u8"], ["l99", "u64"],
                ]
            }
        ]
    ]);

    await connection.getAccountInfo(game_pda).then((account) => {
        if (account) {

            let accountInfo: any = deserializeUnchecked(payloadSchema, Primitive, account.data);
            game.bump = accountInfo['bump'];
            game.betCount = parseInt(accountInfo["betCount"].toString(), 10);
            game.oracle = parseInt(accountInfo["oracle"].toString(), 10);
            for (let i = 0; i < 100; i++) {
                try {
                    if (parseInt(accountInfo[`f${i}`].toString(), 10) > 0) {
                        game.bets.push({
                            fng: parseInt(accountInfo[`f${i}`].toString(), 10),
                            lamport: parseInt(accountInfo[`l${i}`].toString(), 10),
                            day: 0,
                        });
                    }
                } catch { }
            }
        }
    });
    return (game);
}

