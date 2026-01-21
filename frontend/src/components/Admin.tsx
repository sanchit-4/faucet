"use client";

import { useState } from 'react';
import * as anchor from '@coral-xyz/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import idl from '../idl.json';
import { Faucet } from '../types/faucet';

export default function AdminDashboard() {
    const { connection } = useConnection();
    const wallet = useWallet();
    const { publicKey } = wallet;
    const [isLoading, setIsLoading] = useState(false);
    
    // REPLACE THIS with your actual Admin Wallet Address (from init-state.ts)
    const ADMIN_KEY = "Ao17vHUj5smFY4bPQ6aDXG5LsoFSk2Ex1NV5p94ZihM6"; 

    // Helper to load the program
    const getProgram = () => {
        const provider = new anchor.AnchorProvider(
            connection, 
            wallet as any, 
            anchor.AnchorProvider.defaultOptions()
        );
        return new anchor.Program<Faucet>(idl as any, provider);
    }

    // Hide component if not admin
    if (publicKey?.toBase58() !== ADMIN_KEY) return null;

    const togglePause = async () => {
        if (!publicKey) return;
        setIsLoading(true);

        try {
            const program = getProgram();
            // 1. Find Global State PDA
            const [globalState] = anchor.web3.PublicKey.findProgramAddressSync(
                [Buffer.from("global-state")], 
                program.programId
            );

            // 2. Call togglePause instruction
            const tx = await program.methods
                // @ts-ignore
                .togglePause()
                .accounts({
                    globalState: globalState,
                    admin: publicKey,
                })
                .rpc();
            
            alert(`Success! Faucet state toggled.\nTX: ${tx}`);
        } catch (error: any) {
            console.error("Pause Error:", error);
            alert("Failed to toggle pause: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const withdrawFunds = async () => {
        if (!publicKey) return;
        setIsLoading(true);

        try {
            const program = getProgram();
            const [globalState] = anchor.web3.PublicKey.findProgramAddressSync(
                [Buffer.from("global-state")], 
                program.programId
            );

            // 3. Call withdrawFunds instruction
            const tx = await program.methods
                // @ts-ignore
                .withdrawFunds()
                .accounts({
                    globalState: globalState,
                    admin: publicKey,
                })
                .rpc();

            alert(`Success! Funds withdrawn to your wallet.\nTX: ${tx}`);
        } catch (error: any) {
            console.error("Withdraw Error:", error);
            alert("Failed to withdraw: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ 
            border: '1px solid #ef4444', 
            background: 'rgba(239, 68, 68, 0.1)',
            padding: '20px', 
            marginTop: '30px', 
            borderRadius: '12px',
            maxWidth: '500px',
            width: '100%'
        }}>
            <h3 style={{ color: '#fca5a5', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                ⚠️ Admin Panel
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button 
                    onClick={togglePause}
                    disabled={isLoading}
                    style={{ 
                        padding: '12px', 
                        background: '#374151', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '6px', 
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        transition: 'background 0.2s'
                    }}
                >
                    {isLoading ? "Processing..." : "⏯️ Pause / Unpause Faucet"}
                </button>

                <button 
                    onClick={withdrawFunds}
                    disabled={isLoading}
                    style={{ 
                        padding: '12px', 
                        background: '#374151', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '6px', 
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        transition: 'background 0.2s'
                    }}
                >
                    {isLoading ? "Processing..." : "💰 Withdraw Treasury SOL"}
                </button>
            </div>
        </div>
    );
}