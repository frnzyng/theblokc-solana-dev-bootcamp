import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token'
import  'dotenv/config';
import bs58 from 'bs58';

const main = async () => {
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'), "confirmed")
    const payer = web3.Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY ?? ""))
    const mintAuthority = payer.publicKey
    const freezeAuthority = payer.publicKey
    
    const tokenMint = await token.createMint(
        connection,
        payer,
        mintAuthority,
        freezeAuthority,
        9
    )
    // Token Mint: C2ggyqH5ksSwfakbYq3DSoxKUYn7wRq68P2U77PirZdQ
    // Copy this address to token-account.ts
    console.log("Token Mint: ", tokenMint.toString())
}

main()
    .then(d => {process.exit(0)})
    .catch(e => {process.exit(1)})