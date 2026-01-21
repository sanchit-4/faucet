// // // import * as anchor from "@coral-xyz/anchor";
// // // import { Program } from "@coral-xyz/anchor";
// // // import { Faucet } from "../target/types/faucet";

// // // async function main() {
// // //     const provider = anchor.AnchorProvider.env();
// // //     anchor.setProvider(provider);

// // //     const program = anchor.workspace.Faucet as Program<Faucet>;
// // //     const admin = provider.wallet as anchor.Wallet;

// // //     // The mint must be a new, unused keypair
// // //     const mint = anchor.web3.Keypair.generate();

// // //     const [mintPDA] = anchor.web3.PublicKey.findProgramAddressSync(
// // //         [Buffer.from("faucet-mint")],
// // //         program.programId
// // //     );

// // //     console.log("Initializing faucet...");
// // //     console.log("Admin:", admin.publicKey.toBase58());
// // //     console.log("Mint Keypair:", mint.publicKey.toBase58());
// // //     console.log("Mint PDA:", mintPDA.toBase58());

// // //     const tx = await program.methods
// // //         .initializeFaucet()
// // //         .accounts({
// // //             mint: mint.publicKey,
// // //             payer: admin.publicKey,
// // //         })
// // //         .signers([mint])
// // //         .rpc();

// // //     console.log("\nFaucet initialized successfully!");
// // //     console.log("Transaction Signature:", tx);
// // //     console.log("Mint Account Address:", mint.publicKey.toBase58());
// // // }

// // // main().then(
// // //     () => process.exit(0),
// // //     (err) => {
// // //         console.error(err);
// // //         process.exit(1);
// // //     }
// // // );

// // // tests/initialize.ts

// // import * as anchor from "@coral-xyz/anchor";
// // import { Program } from "@coral-xyz/anchor";
// // import { Faucet } from "../target/types/faucet";

// // async function main() {
// //     // anchor exec provides the provider configured from Anchor.toml
// //     const provider = anchor.AnchorProvider.env();
// //     anchor.setProvider(provider);

// //     const program = anchor.workspace.Faucet as Program<Faucet>;
    
// //     // The payer and admin is the wallet configured in the provider.
// //     const payer = provider.wallet as anchor.Wallet;

// //     // The mint must be a new, unused keypair.
// //     const mint = anchor.web3.Keypair.generate();

// //     const [mintPDA] = anchor.web3.PublicKey.findProgramAddressSync(
// //         [Buffer.from("faucet-mint")],
// //         program.programId
// //     );

// //     console.log("Initializing faucet on Devnet...");
// //     console.log("Payer/Admin:", payer.publicKey.toBase58());
// //     console.log("New Mint Address:", mint.publicKey.toBase58());
// //     console.log("Mint PDA Authority:", mintPDA.toBase58());

// //     // In this version, we don't explicitly pass `payer`.
// //     // The Anchor provider will automatically add the wallet as the payer
// //     // and signer for the transaction fee. The program uses the signer
// //     // list to find the `payer` account for the instruction.
// //     const tx = await program.methods
// //       .initializeFaucet()
// //       .accounts({
// //         mint: mint.publicKey,
// //       })
// //       .signers([mint]) // We still need to sign with the new mint keypair
// //       .rpc();

// //     console.log("\n✅ Faucet initialized successfully!");
// //     console.log("Transaction Signature:", tx);
// //     console.log("IMPORTANT! Save this Mint Address for your frontend:", mint.publicKey.toBase58());
// // }

// // main().then(
// //     () => process.exit(0),
// //     (err) => {
// //         console.error(err);
// //         process.exit(1);
// //     }
// // );

// // tests/initialize.ts

// import * as anchor from "@coral-xyz/anchor";
// import { Program } from "@coral-xyz/anchor";
// import { Faucet } from "../target/types/faucet";
// import { Keypair, Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
// import * as fs from "fs";
// import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// async function main() {
//     // --- 1. Read configuration and set up the connection ---
//     const secretKeyString = fs.readFileSync(process.env.HOME + "/.config/solana/id.json", "utf8");
//     const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
//     const adminKeypair = Keypair.fromSecretKey(secretKey);

//     const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
//     const wallet = new anchor.Wallet(adminKeypair);
//     const provider = new anchor.AnchorProvider(connection, wallet, anchor.AnchorProvider.defaultOptions());
//     anchor.setProvider(provider);

//     // --- 2. Load the program ---
//     // The IDL is used to build the program interface.
//     const idl = JSON.parse(fs.readFileSync("./target/idl/faucet.json", "utf8"));
//     // The program ID is the public key of your deployed program.
//     const programId = new anchor.web3.PublicKey("BFwCjYFjnPfgZYaV2SaBMotZK57MtGPaHXRcpPgzpqe1"); // <-- PASTE YOUR PROGRAM ID
//     const program = new anchor.Program<Faucet>(idl, provider);

//     // --- 3. The core logic (this is the same as before) ---
//     const mint = anchor.web3.Keypair.generate();

//     console.log("Initializing faucet on Devnet...");
//     console.log("Payer/Admin:", adminKeypair.publicKey.toBase58());
//     console.log("New Mint Address:", mint.publicKey.toBase58());

//     // Airdrop some SOL if the admin wallet is low on funds for the transaction
//     const balance = await connection.getBalance(adminKeypair.publicKey);
//     if (balance < 1 * LAMPORTS_PER_SOL) {
//         console.log("Airdropping 1 SOL to admin wallet...");
//         await connection.requestAirdrop(adminKeypair.publicKey, 1 * LAMPORTS_PER_SOL);
//         await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for airdrop
//     }

//     const tx = await program.methods
//       .initializeFaucet()
//       .accounts({
//         mint: mint.publicKey,
//         payer: adminKeypair.publicKey,
//       })
//       .signers([mint, adminKeypair]) // <-- We must explicitly include the admin/payer as a signer
//       .rpc();

//     console.log("\n✅ Faucet initialized successfully!");
//     console.log("Transaction Signature:", tx);
//     console.log("IMPORTANT! Save this Mint Address for your frontend:", mint.publicKey.toBase58());
// }

// main().then(
//     () => process.exit(0),
//     (err) => {
//         console.error(err);
//         process.exit(1);
//     }
// );

// tests/initialize.ts

import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Faucet } from "../target/types/faucet";
import { Keypair, Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as fs from "fs";

async function main() {
    // --- 1. Read configuration and set up the connection ---
    const secretKeyString = fs.readFileSync(process.env.HOME + "/.config/solana/id.json", "utf8");
    const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
    const adminKeypair = Keypair.fromSecretKey(secretKey);

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const wallet = new anchor.Wallet(adminKeypair);
    const provider = new anchor.AnchorProvider(connection, wallet, anchor.AnchorProvider.defaultOptions());
    anchor.setProvider(provider);

    // --- 2. Load the program ---
    const idl = JSON.parse(fs.readFileSync("./target/idl/faucet.json", "utf8"));
    const programId = new anchor.web3.PublicKey("8jTt3KWi5dczJxJcLRLMXuaFFe89NPqCrD6921YW3px9"); // Your Program ID
    const program = new anchor.Program<Faucet>(idl, provider);

    // --- 3. The core logic (CORRECTED) ---

    // Calculate the PDA for the mint account. This does NOT create a keypair.
    const [mintPDA] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("faucet-mint")],
        program.programId
    );

    console.log("Initializing faucet on Devnet...");
    console.log("Payer/Admin:", adminKeypair.publicKey.toBase58());
    console.log("Faucet Mint PDA Address:", mintPDA.toBase58());

    // Airdrop some SOL if the admin wallet is low on funds for the transaction
    const balance = await connection.getBalance(adminKeypair.publicKey);
    if (balance < 0.5 * LAMPORTS_PER_SOL) { // Reduced airdrop amount for efficiency
        console.log("Airdropping 0.5 SOL to admin wallet...");
        const airdropSignature = await connection.requestAirdrop(adminKeypair.publicKey, 0.5 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(airdropSignature);
        console.log("Airdrop complete.");
    }

    // Call the initializeFaucet instruction
    const tx = await program.methods
      .initializeFaucet()
      .accounts({
        mint: mintPDA, // Pass the calculated PDA address here
        payer: adminKeypair.publicKey,
      })
      // NO need for .signers([mint, adminKeypair]) because the provider's wallet is the default signer
      // and the mint PDA is not a keypair that can sign.
      .rpc();

    console.log("\n✅ Faucet initialized successfully!");
    console.log("Transaction Signature:", tx);
    console.log("IMPORTANT! Save this Mint PDA Address for your frontend:", mintPDA.toBase58());
}

main().then(
    () => process.exit(0),
    (err) => {
        console.error(err);
        process.exit(1);
    }
);