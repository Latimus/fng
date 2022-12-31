import secret from '/home/chavers/solana/wallet/secret';

import * as web3 from '@solana/web3.js';
import { deserializeUnchecked } from 'borsh';

import { bs58, utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { Fng } from './idl/fng';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';

(async () => {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");
    const fngApi = 'https://api.alternative.me/fng/';
    // const connection = new Connection("http://127.0.0.1:8899", "processed");
    const payer = web3.Keypair.fromSecretKey(bs58.decode(secret.FNG_ORACLE_SECRET_KEY));
    const options = anchor.AnchorProvider.defaultOptions();
    const wallet = new NodeWallet(payer);
    const provider = new anchor.AnchorProvider(connection, wallet, options);
    const fngData = await axios.get(fngApi).then(Response => Response.data);
    const fng_date = +(dayjs.unix(+(fngData.data[0].timestamp)).format('YYYYMMDD'));
    const fng = +(fngData.data[0].value)
    console.log('date:', fng_date, ' fng:', fng);
    anchor.setProvider(provider);
    const program = anchor.workspace.Fng as Program<Fng>;

    console.log("programId:", program.programId.toBase58());

    const [config_account, _config_account_bump] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from(utf8.encode("config_fng"))],
        program.programId
    );

    const [game_pda, _game_pda_bump] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from(utf8.encode(`game${fng_date}`))],
        program.programId
    );
    console.log('config_account', config_account.toBase58());
    console.log('game_pda', game_pda.toBase58());
    class Primitive extends web3.Struct {
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
                ]
            }
        ]
    ]);
    await connection.getAccountInfo(game_pda)
        .then(async (account) => {
            if (account) {
                let accountInfo = deserializeUnchecked(payloadSchema, Primitive, account.data);
                const oracle = parseInt(accountInfo["oracle"].toString(), 10);
                if (oracle === 254) {
                    await program.methods.updateOracle(fng_date, fng)
                        .accounts({
                            payer: payer.publicKey,
                            configFng: config_account,
                            gamePda: game_pda,
                            systemProgram: web3.SystemProgram.programId,
                            rent: web3.SYSVAR_RENT_PUBKEY,
                        })
                        .rpc().then((trx) => { console.log(trx) });
                }
            } else { console.log('no game') }
        });
})();