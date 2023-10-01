import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token'
import {config} from 'dotenv'
import bs58 from 'bs58';

config()

const main = async () => {
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'), "confirmed")
    const payer = web3.Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY ?? ""))

    // TOKEN MINT FROM token-mint.ts
    const tokenMintAccount = new web3.PublicKey("C2ggyqH5ksSwfakbYq3DSoxKUYn7wRq68P2U77PirZdQ")

    const tokenAccount = await token.createAccount(
        connection,
        payer,
        tokenMintAccount,
        payer.publicKey
    )

    // Token Account: 25RdNN8TTNXu6uE2qgnccDP7gqSN61xy1hYm6BkmPzsB
    // Copy token account to mint-token.ts
    console.log("Token Account: ", tokenAccount.toString())

}

main()
    .then(d => {process.exit(0)})
    .catch(e => {process.exit(1)})