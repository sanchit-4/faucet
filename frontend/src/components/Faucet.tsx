// "use client";
// import { useConnection, useWallet } from "@solana/wallet-adapter-react";
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// import * as anchor from "@coral-xyz/anchor";
// import idl from "@/idl.json"; // Import the IDL
// import { Faucet } from "../types/faucet"; // We'll create this type
// import { getAssociatedTokenAddress } from "@solana/spl-token";
// import { useState } from "react";

// // --- IMPORTANT: PASTE YOUR OWN KEYS HERE ---
// const PROGRAM_ID = new anchor.web3.PublicKey("BFwCjYFjnPfgZYaV2SaBMotZK57MtGPaHXRcpPgzpqe1");
// const MINT_ADDRESS = new anchor.web3.PublicKey("9nLMbtABv6GucXPbgCEB2q2637h8NRcDC2bSUxJ1HNQi");
// // ------------------------------------------

// export const FaucetComponent = () => {
//     const { connection } = useConnection();
//     const { publicKey, sendTransaction } = useWallet();
//     const [txSignature, setTxSignature] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleFaucetClick = async () => {
//         if (!publicKey) return;
//         setLoading(true);
//         setTxSignature("");
//         try {
//             const provider = new anchor.AnchorProvider(connection, { publicKey }, {});
//             const program = new anchor.Program<Faucet>(idl as any, PROGRAM_ID, provider);

//             const [mintPDA] = anchor.web3.PublicKey.findProgramAddressSync(
//                 [Buffer.from("faucet-mint")],
//                 program.programId
//             );

//             const userATA = await getAssociatedTokenAddress(MINT_ADDRESS, publicKey);

//             const transaction = await program.methods
//                 .airdrop(new anchor.BN(100 * 1_000_000))
//                 .accounts({
//                     mint: MINT_ADDRESS,
//                     destination: userATA,
//                     payer: publicKey,
//                     receiver: publicKey,
//                 })
//                 .transaction();

//             const signature = await sendTransaction(transaction, connection);
//             await connection.confirmTransaction(signature, 'processed');

//             setTxSignature(signature);
//         } catch (error) {
//             console.error(error);
//             alert("An error occurred. Check the console.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '50px' }}>
//             <WalletMultiButton />
//             {publicKey && (
//                 <button onClick={handleFaucetClick} disabled={loading}>
//                     {loading ? "Processing..." : "Get 100 FaucetCoin"}
//                 </button>
//             )}
//             {txSignature && (
//                 <div>
//                     <p>Success! Transaction Signature:</p>
//                     <a href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`} target="_blank" rel="noopener noreferrer">
//                         {txSignature}
//                     </a>
//                 </div>
//             )}
//         </div>
//     );
// };


// frontend/src/components/Faucet.tsx

"use client";

import React from 'react';
import * as anchor from '@coral-xyz/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import idl from '../idl.json';
import { Faucet } from '../types/faucet';

const programId = new anchor.web3.PublicKey("2CtSGNwpXpixS7acooqJSPVRHfdtjZytfuxvHo8zjWoz");

export const FaucetComponent = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const provider = new anchor.AnchorProvider(connection, useWallet() as any, anchor.AnchorProvider.defaultOptions());
    const program = new anchor.Program<Faucet>(idl as any, provider);

    const handleFaucetClick = async () => {
        if (!publicKey) {
            console.error("Wallet not connected!");
            return;
        }

        try {
            // 1. Calculate the PDA for the mint
            const [mintPDA] = anchor.web3.PublicKey.findProgramAddressSync(
                [Buffer.from("faucet-mint")],
                program.programId
            );

            // 2. Calculate the user's Associated Token Account (ATA)
            const userATA = await getAssociatedTokenAddress(mintPDA, publicKey);

            // 3. Define the amount (100 tokens with 6 decimals)
            const amountToAirdrop = new anchor.BN(100 * 1_000_000);

            // 4. Call the airdrop instruction
            const tx = await program.methods
                .airdrop(amountToAirdrop)
                .accounts({
                    mint: mintPDA,
                    destination: userATA,
                    payer: publicKey,
                    receiver: publicKey, // The receiver is the authority for the ATA
                    // System accounts are inferred by Anchor
                })
                .rpc();

            console.log("Airdrop successful! Transaction signature:", tx);
            alert("Successfully airdropped 100 tokens!");

        } catch (error) {
            console.error("Error during airdrop:", error);
            alert("Airdrop failed. See console for details.");
        }
    };

    return (
        <button
            onClick={handleFaucetClick}
            disabled={!publicKey}
            style={{
                backgroundColor: 'var(--accent-color)',
                color: 'white',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: !publicKey ? 'not-allowed' : 'pointer',
                opacity: !publicKey ? 0.5 : 1,
                transition: 'background-color 0.2s ease-in-out, transform 0.1s ease-in-out',
                width: '100%',
            }}
            onMouseOver={(e) => {
                if(publicKey) e.currentTarget.style.backgroundColor = '#a35aff';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-color)';
            }}
            onMouseDown={(e) => {
                if(publicKey) e.currentTarget.style.transform = 'scale(0.98)';
            }}
            onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
            }}
        >
            Get 100 Faucet Coins
        </button>
    );
};

export default FaucetComponent;