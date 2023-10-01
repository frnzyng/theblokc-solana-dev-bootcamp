import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token'
import  'dotenv/config';
import bs58 from 'bs58';


const main = async () => {
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'), "confirmed")
    const payer = web3.Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY ?? ""))

    // Token Account: 25RdNN8TTNXu6uE2qgnccDP7gqSN61xy1hYm6BkmPzsB
    // Token Mint: C2ggyqH5ksSwfakbYq3DSoxKUYn7wRq68P2U77PirZdQ

    const tokenMintAccount = new web3.PublicKey( "C2ggyqH5ksSwfakbYq3DSoxKUYn7wRq68P2U77PirZdQ")
    const tokenAccount = new web3.PublicKey( "25RdNN8TTNXu6uE2qgnccDP7gqSN61xy1hYm6BkmPzsB")
    const mintAccount = await token.mintTo(
        connection,
        payer,
        tokenMintAccount,
        tokenAccount,
        payer,
        web3.LAMPORTS_PER_SOL * .00000009
    )
    
        //Mint Account: 2ZWwrG8HM5iDDi8t9TDMi5R6vSaLPubZ68zLqCmA7KLr89Pnr7AUcAJJ78LgXUYBJdUXHkJn3qZpWG9PycgmJz7d
    console.log("Mint Account: ", mintAccount)

}

main()
    .then(d => {process.exit(0)})
    .catch(e => {
        console.log(e)
        process.exit(1)
    })