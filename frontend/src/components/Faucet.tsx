"use client";

import React, { useState } from 'react';
import * as anchor from '@coral-xyz/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import idl from '../idl.json';
import { Faucet } from '../types/faucet';

export const FaucetComponent = () => {
    const { connection } = useConnection();
    
    const wallet = useWallet(); 

    const [isLoading, setIsLoading] = useState(false);

    const getProgram = () => {
        const provider = new anchor.AnchorProvider(
            connection, 
            wallet as any, 
            anchor.AnchorProvider.defaultOptions()
        );
        return new anchor.Program<Faucet>(idl as any, provider);
    }

    const handleClaim = async () => {
        if (!wallet.publicKey) return; 
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
            
            const amount = new anchor.BN(10 * 1_000_000); 

            const tx = await program.methods.airdrop(amount)
                .accounts({
                    // @ts-ignore
                    globalState,
                    userStats,
                    payer: wallet.publicKey,
                    receiver: wallet.publicKey,
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
            // @ts-ignore
            const tx = await program.methods.buyTokens(amount)
                .accounts({
                    globalState,
                    mint,
                    payer: wallet.publicKey,
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