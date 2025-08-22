// tests/initializeMetadata.ts

import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Faucet } from "../target/types/faucet";
import { MPL_TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";

async function main() {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.Faucet as Program<Faucet>;
    const payer = provider.wallet as anchor.Wallet;

    // The Faucet Mint PDA
    const [mintPDA] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("faucet-mint")],
        program.programId
    );

    // The Metadata PDA
    const [metadataPDA] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from("metadata"),
            MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mintPDA.toBuffer(),
        ],
        MPL_TOKEN_METADATA_PROGRAM_ID
    );

    console.log("Adding metadata to faucet mint...");
    console.log("Mint PDA:", mintPDA.toBase58());
    console.log("Metadata PDA:", metadataPDA.toBase58());

    const tx = await program.methods
        .initializeMetadata()
        .accounts({
            metadata: metadataPDA,
            mint: mintPDA,
            payer: payer.publicKey,
            tokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
        })
        .rpc();

    console.log("\n✅ Metadata added successfully!");
    console.log("Transaction Signature:", tx);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});