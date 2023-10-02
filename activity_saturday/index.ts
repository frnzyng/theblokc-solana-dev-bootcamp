import * as Web3 from '@solana/web3.js'
import { 
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
} from '@solana/web3.js';

import bs58 from "bs58";
import "dotenv/config";

const publicKey = new PublicKey("8XrhDXxRxA7gRkkRSxweASLPrBoUdc6zJfDffB7RuFfx");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const transaction = new Transaction();
const keyPair = Keypair.fromSecretKey(
    bs58.decode(process.env.PRIVATE_KEY ?? "")
  );


// SOLANA PROGRAM ID: DSuVG3dnbYtJJfoCEv7LQjvYBnE1zgPBe6jtbRKxE2Ym
async function main() {
    const instruction = new Web3.TransactionInstruction({
        keys: [
            {
                pubkey: publicKey,
                isSigner: true,
                isWritable: false,
            }
        ],
        data: Buffer.alloc(20),
        programId: new Web3.PublicKey("DSuVG3dnbYtJJfoCEv7LQjvYBnE1zgPBe6jtbRKxE2Ym"),
    });

    const signature = await Web3.sendAndConfirmTransaction(
        connection,
        transaction.add(instruction), 
        [keyPair],
    )
    console.log('SIGNATURE', signature)
}

main()
.then(() => process.exit(0))
.catch(err => {
    console.error(err)
});