import secret from '/home/chavers/solana/wallet/secret';

// import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js';
import { deserializeUnchecked } from 'borsh';

import { bs58, utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { Fng } from './idl/fng';


(async () => {
    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
    // const connection = new Connection("http://127.0.0.1:8899", "confirmed");
    const payer = Keypair.fromSecretKey(bs58.decode(secret.FNG_ADMIN_SECRET_KEY));
    const options = anchor.AnchorProvider.defaultOptions();
    const wallet = new NodeWallet(payer);
    const provider = new anchor.AnchorProvider(connection, wallet, options);
    anchor.setProvider(provider);
    const program = anchor.workspace.Fng as Program<Fng>;

    console.log("programId:", program.programId.toBase58());
    const [bank_authority, bank_authority_bump] = await PublicKey.findProgramAddress(
        [Buffer.from(utf8.encode("bank_authority"))],
        program.programId
    );
    const [config_account, _config_account_bump] = await PublicKey.findProgramAddress(
        [Buffer.from(utf8.encode("config_fng"))],
        program.programId
    );
    console.log('bank_authority', bank_authority.toBase58());
    console.log('config_account', config_account.toBase58());

    class Assignable {
        constructor(properties) {
            Object.keys(properties).map((key) => {
                return (this[key] = properties[key]);
            });
        }
    }

    let initATAtx = new Transaction();
    initATAtx.add(program.instruction.configFng({
        accounts: {
            payer: payer.publicKey,
            oracle: new PublicKey(secret.FNG_ORACLE_PUBLIC_KEY),
            configPda: config_account,
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
    class ConfigPda extends Assignable {
    }

    const ConfigPdaDS = new Map([
        [
            ConfigPda,
            {
                kind: "struct",
                fields: [
                    ["Discriminator", [8]],
                    ["owner_account", [32]],
                    ["oracle_account", [32]],
                ]
            }
        ]
    ]);
    await connection.getAccountInfo(config_account)
        .then((account) => {
            let accountInfo = deserializeUnchecked(ConfigPdaDS, ConfigPda, account.data);
            console.log("admin", bs58.encode(accountInfo['owner_account']));
            console.log('oracle:', bs58.encode(accountInfo['oracle_account']));
        })
})();