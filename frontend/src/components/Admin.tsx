"use client";
import { useState } from 'react';
import * as anchor from '@coral-xyz/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import idl from '../idl.json';

export default function AdminDashboard() {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    
    // REPLACE THIS WITH YOUR WALLET ADDRESS
    const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY;

    if (publicKey?.toBase58() !== ADMIN_KEY) return null;

    const togglePause = async () => {
        // Logic to call program.methods.togglePause()
    };

    const withdrawFunds = async () => {
         // Logic to call program.methods.withdrawFunds()
    };

    return (
        <div style={{ border: '1px solid red', padding: '20px', marginTop: '20px', color: 'white' }}>
            <h3>⚠️ Admin Panel</h3>
            <button onClick={togglePause}>Pause/Unpause Faucet</button>
            <button onClick={withdrawFunds}>Withdraw Treasury SOL</button>
        </div>
    );
}