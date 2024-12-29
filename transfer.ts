import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl, Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import "dotenv/config";

const main = async () => {
    try {
        const suppliedToPubkey = process.argv[2];
        if (!suppliedToPubkey) {
            throw new Error("Please provide account address");
        };
        const senderKeyPair = getKeypairFromEnvironment("SECRET_KEY");
        const toPublicKey = new PublicKey(suppliedToPubkey);
        const connection = new Connection(clusterApiUrl("devnet"));
        const transaction = new Transaction();
        const LAMPORTS_TO_SEND = 5000;
        const sendSolInstructions = SystemProgram.transfer({
            fromPubkey: senderKeyPair.publicKey,
            toPubkey: toPublicKey,
            lamports: LAMPORTS_TO_SEND
        });
        transaction.add(sendSolInstructions);
        const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeyPair]);
        console.log(signature, "singature");
    } catch (err) {
        console.log(err.message);
    }
};

main();