// // // frontend/src/components/Faucet.tsx

// // "use client";

// // import React from 'react';
// // import * as anchor from '@coral-xyz/anchor';
// // import { useConnection, useWallet } from '@solana/wallet-adapter-react';
// // import idl from '../idl.json';
// // import { Faucet } from '../types/faucet';

// // export const FaucetComponent = () => {
// //     const { connection } = useConnection();
// //     const { publicKey } = useWallet();
// //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //     const provider = new anchor.AnchorProvider(connection, useWallet() as any, anchor.AnchorProvider.defaultOptions());
// //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //     const program = new anchor.Program<Faucet>(idl as any, provider);

// //     const handleFaucetClick = async () => {
// //         if (!publicKey) {
// //             console.error("Wallet not connected!");
// //             return;
// //         }

// //         try {
// //             // 3. Define the amount (100 tokens with 6 decimals)
// //             const amountToAirdrop = new anchor.BN(100 * 1_000_000);

// //             // 4. Call the airdrop instruction
// //             const tx = await program.methods
// //                 .airdrop(amountToAirdrop)
// //                 .accounts({
// //                     // mint and destination are auto-resolved by Anchor 0.31+ based on IDL
// //                     payer: publicKey,
// //                     receiver: publicKey, // The receiver is the authority for the ATA
// //                 })
// //                 .rpc();

// //             console.log("Airdrop successful! Transaction signature:", tx);
// //             alert("Successfully airdropped 100 tokens!");

// //         } catch (error) {
// //             console.error("Error during airdrop:", error);
// //             alert("Airdrop failed. See console for details.");
// //         }
// //     };

// //     return (
// //         <button
// //             onClick={handleFaucetClick}
// //             disabled={!publicKey}
// //             style={{
// //                 backgroundColor: 'var(--accent-color)',
// //                 color: 'white',
// //                 padding: '1rem 2rem',
// //                 border: 'none',
// //                 borderRadius: '8px',
// //                 fontSize: '1rem',
// //                 fontWeight: 'bold',
// //                 cursor: !publicKey ? 'not-allowed' : 'pointer',
// //                 opacity: !publicKey ? 0.5 : 1,
// //                 transition: 'background-color 0.2s ease-in-out, transform 0.1s ease-in-out',
// //                 width: '100%',
// //             }}
// //             onMouseOver={(e) => {
// //                 if(publicKey) e.currentTarget.style.backgroundColor = '#a35aff';
// //             }}
// //             onMouseOut={(e) => {
// //                 e.currentTarget.style.backgroundColor = 'var(--accent-color)';
// //             }}
// //             onMouseDown={(e) => {
// //                 if(publicKey) e.currentTarget.style.transform = 'scale(0.98)';
// //             }}
// //             onMouseUp={(e) => {
// //                 e.currentTarget.style.transform = 'scale(1)';
// //             }}
// //         >
// //             Get 100 Faucet Coins
// //         </button>
// //     );
// // };

// // export default FaucetComponent;


// "use client";

// import React, { useState } from 'react';
// import * as anchor from '@coral-xyz/anchor';
// import { useConnection, useWallet } from '@solana/wallet-adapter-react';
// import idl from '../idl.json';
// import { Faucet } from '../types/faucet';

// export const FaucetComponent = () => {
//     const { connection } = useConnection();
//     const { publicKey } = useWallet();
//     const [isLoading, setIsLoading] = useState(false);

//     const getProgram = () => {
//         const provider = new anchor.AnchorProvider(connection, useWallet() as any, anchor.AnchorProvider.defaultOptions());
//         return new anchor.Program<Faucet>(idl as any, provider);
//     }

//     const handleClaim = async () => {
//         if (!publicKey) return;
//         setIsLoading(true);
//         try {
//             const program = getProgram();
//             const [globalState] = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("global-state")], program.programId);
//             const [userStats] = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("user-stats"), publicKey.toBuffer()], program.programId);
//             const amount = new anchor.BN(10 * 1_000_000); // 10 Tokens

//             const tx = await program.methods.airdrop(amount)
//                 .accounts({
//                     globalState,
//                     userStats,
//                     payer: publicKey,
//                     receiver: publicKey,
//                 })
//                 .rpc();
//             alert("Success! TX: " + tx);
//         } catch (error: any) {
//             console.error(error);
//             if (error.toString().includes("RateLimitExceeded")) {
//                 alert("Wait 24 hours!");
//             } else {
//                 alert("Failed: " + error.message);
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleBuyPremium = async () => {
//         if (!publicKey) return;
//         setIsLoading(true);
//         try {
//             const program = getProgram();
//             const [globalState] = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("global-state")], program.programId);
//             const amount = new anchor.BN(1_000_000 * 1_000_000); // 1 Million Tokens

//             const tx = await program.methods.buyTokens(amount)
//                 .accounts({
//                     globalState,
//                     payer: publicKey,
//                 })
//                 .rpc();
//             alert("Premium Purchase Success! TX: " + tx);
//         } catch (error: any) {
//             console.error(error);
//             alert("Purchase Failed: " + error.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//             <button 
//                 onClick={handleClaim} 
//                 disabled={!publicKey || isLoading}
//                 style={{ padding: '15px', background: '#9945FF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
//             >
//                 {isLoading ? "Processing..." : "Claim Free 10 Tokens (Daily)"}
//             </button>
            
//             <button 
//                 onClick={handleBuyPremium} 
//                 disabled={!publicKey || isLoading}
//                 style={{ padding: '15px', background: '#14F195', color: 'black', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
//             >
//                 Buy 1 Million Tokens (0.1 SOL)
//             </button>
//         </div>
//     );
// };


"use client";

import React, { useState } from 'react';
import * as anchor from '@coral-xyz/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import idl from '../idl.json';
import { Faucet } from '../types/faucet';

export const FaucetComponent = () => {
    const { connection } = useConnection();
    
    // FIX 1: Capture the whole wallet object at the TOP level
    // We cannot call useWallet() inside getProgram() later.
    const wallet = useWallet(); 

    const [isLoading, setIsLoading] = useState(false);

    const getProgram = () => {
        // FIX 2: Use the 'wallet' variable we captured above.
        // We cast as 'any' because the wallet adapter type is slightly different 
        // from what Anchor expects, but it is compatible at runtime.
        const provider = new anchor.AnchorProvider(
            connection, 
            wallet as any, 
            anchor.AnchorProvider.defaultOptions()
        );
        return new anchor.Program<Faucet>(idl as any, provider);
    }

    const handleClaim = async () => {
        if (!wallet.publicKey) return; // Use wallet.publicKey instead of just publicKey
        setIsLoading(true);
        try {
            const program = getProgram();
            
            const [globalState] = anchor.web3.PublicKey.findProgramAddressSync(
                [Buffer.from("global-state")], 
                program.programId
            );
            const [userStats] = anchor.web3.PublicKey.findProgramAddressSync(
                [Buffer.from("user-stats"), wallet.publicKey.toBuffer()], 
                program.programId
            );
            
            const amount = new anchor.BN(10 * 1_000_000); // 10 Tokens

            const tx = await program.methods.airdrop(amount)
                .accounts({
                    globalState,
                    userStats,
                    payer: wallet.publicKey,
                    receiver: wallet.publicKey,
                    // Note: 'mint' and 'destination' are often auto-resolved, 
                    // but if your IDL is old you might need to pass them manually.
                    // If you get an error "Account not found: mint", add them back here.
                })
                .rpc();
            
            alert("Success! TX: " + tx);
        } catch (error: any) {
            console.error(error);
            if (error.toString().includes("RateLimitExceeded")) {
                alert("Wait 24 hours!");
            } else {
                alert("Failed: " + error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // const handleBuyPremium = async () => {
    //     if (!wallet.publicKey) return;
    //     setIsLoading(true);
    //     try {
    //         const program = getProgram();
    //         const [globalState] = anchor.web3.PublicKey.findProgramAddressSync(
    //             [Buffer.from("global-state")], 
    //             program.programId
    //         );
    //         const amount = new anchor.BN(1_000_000 * 1_000_000); // 1 Million Tokens

    //         const tx = await program.methods.buyTokens(amount)
    //             .accounts({
    //                 globalState,
    //                 payer: wallet.publicKey,
    //             })
    //             .rpc();
    //         alert("Premium Purchase Success! TX: " + tx);
    //     } catch (error: any) {
    //         console.error(error);
    //         alert("Purchase Failed: " + error.message);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
    const handleBuyPremium = async () => {
        if (!wallet.publicKey) return;
        setIsLoading(true);
        try {
            const program = getProgram();
            
            // 1. Explicitly find the Mint PDA
            const [mint] = anchor.web3.PublicKey.findProgramAddressSync(
                [Buffer.from("faucet-mint")], 
                program.programId
            );

            const [globalState] = anchor.web3.PublicKey.findProgramAddressSync(
                [Buffer.from("global-state")], 
                program.programId
            );
            
            const amount = new anchor.BN(1_000_000 * 1_000_000); 

            const tx = await program.methods.buyTokens(amount)
                .accounts({
                    globalState,
                    mint, // <-- ADD THIS LINE explicitly
                    payer: wallet.publicKey,
                    // The 'destination' account is usually auto-resolved 
                    // correctly if 'mint' is provided.
                })
                .rpc();
            alert("Premium Purchase Success! TX: " + tx);
        } catch (error: any) {
            console.error(error);
            alert("Purchase Failed: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
                onClick={handleClaim} 
                disabled={!wallet.publicKey || isLoading}
                style={{ 
                    padding: '15px', 
                    background: '#9945FF', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: wallet.publicKey ? 'pointer' : 'not-allowed',
                    opacity: wallet.publicKey ? 1 : 0.6
                }}
            >
                {isLoading ? "Processing..." : "Claim Free 10 Tokens (Daily)"}
            </button>
            
            <button 
                onClick={handleBuyPremium} 
                disabled={!wallet.publicKey || isLoading}
                style={{ 
                    padding: '15px', 
                    background: '#14F195', 
                    color: 'black', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: wallet.publicKey ? 'pointer' : 'not-allowed',
                    opacity: wallet.publicKey ? 1 : 0.6
                }}
            >
                Buy 1 Million Tokens (0.1 SOL)
            </button>
        </div>
    );
};