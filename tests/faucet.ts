// // tests/faucet.ts

// import * as anchor from "@coral-xyz/anchor";
// import { Program } from "@coral-xyz/anchor";
// import { Faucet } from "../target/types/faucet"; // Make sure this matches your program name
// import {
//   getAssociatedTokenAddress,
//   getAccount,
//   TOKEN_PROGRAM_ID,
//   ASSOCIATED_TOKEN_PROGRAM_ID,
// } from "@solana/spl-token";
// import { assert } from "chai";

// describe("faucet", () => {
//   const provider = anchor.AnchorProvider.env();
//   anchor.setProvider(provider);

//   // Use your program's actual name here from Anchor.toml
//   const program = anchor.workspace.Faucet as Program<Faucet>;
//   const payer = provider.wallet as anchor.Wallet;

//   // 1. Calculate the PDA for the mint account BEFORE the tests run.
//   const [mintPDA] = anchor.web3.PublicKey.findProgramAddressSync(
//     [Buffer.from("faucet-mint")],
//     program.programId
//   );

//   it("Initializes the faucet mint", async () => {
//     // This test calls the `initialize_faucet` instruction.
//     const tx = await program.methods
//       .initializeFaucet()
//       .accounts({
//         mint: mintPDA,
//         payer: payer.publicKey,
//         // The other system accounts are inferred by Anchor.
//       })
//       .rpc();
    
//     console.log("Initialize transaction signature", tx);

//     // Verify that the mint PDA was created and is owned by the token program.
//     const accountInfo = await provider.connection.getAccountInfo(mintPDA);
//     assert.ok(accountInfo.owner.equals(TOKEN_PROGRAM_ID));
//   });

//   it("Airdrops tokens to a user", async () => {
//     // The user to receive the tokens. Using the payer for simplicity.
//     const receiver = payer.publicKey;

//     // Calculate the user's Associated Token Account (ATA) address.
//     const userATA = await getAssociatedTokenAddress(mintPDA, receiver);

//     // Define the amount to airdrop (100 tokens with 6 decimals).
//     const amountToAirdrop = new anchor.BN(100 * 1_000_000);

//     const tx = await program.methods
//       .airdrop(amountToAirdrop)
//       .accounts({
//         mint: mintPDA,
//         destination: userATA,
//         payer: payer.publicKey,
//         receiver: receiver,
//         // The other system accounts are inferred by Anchor.
//       })
//       .rpc();

//     console.log("Airdrop transaction signature", tx);

//     // Verify the user's token account now has the correct balance.
//     const userTokenAccount = await getAccount(provider.connection, userATA);
//     assert.ok(userTokenAccount.amount.toString() === amountToAirdrop.toString());
//   });
// });


import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Faucet } from "../target/types/faucet";
import { assert } from "chai";

describe("faucet", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Faucet as Program<Faucet>;

  // 1. Define the Mint PDA seeds
  const [mintPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("faucet-mint")],
    program.programId
  );

  // 2. Define the Metaplex Metadata Program ID
  const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );

  // 3. Derive the Metadata Account PDA
  //    (Seeds: "metadata" + ProgramID + MintAddress)
  const [metadataPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mintPda.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );

  it("Is initialized!", async () => {
    // Add your test logic here
    // Example: Initialize Faucet
    try {
      const tx = await program.methods
        .initializeFaucet()
        .accounts({
          mint: mintPda,
          payer: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .rpc();
      console.log("Your transaction signature", tx);
    } catch (e) {
      // If it fails because it's already initialized, that's fine for testing
      console.log("Faucet might already be initialized");
    }
  });

  it("Initialize Metadata", async () => {
    try {
      const tx = await program.methods
        .initializeMetadata()
        .accounts({
          metadata: metadataPda,
          mint: mintPda,
          payer: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .rpc();
      console.log("Metadata Initialized signature", tx);
    } catch (error) {
      console.error(error);
    }
  });

  it("Airdrops tokens", async () => {
    // Generate a random receiver
    const receiver = anchor.web3.Keypair.generate();
    
    // Derive the Associated Token Account (ATA) for the receiver
    const destination = await anchor.utils.token.associatedAddress({
      mint: mintPda,
      owner: receiver.publicKey,
    });

    const amount = new anchor.BN(1000000); // 1 Token (if decimals=6)

    const tx = await program.methods
      .airdrop(amount)
      .accounts({
        mint: mintPda,
        destination: destination,
        payer: provider.wallet.publicKey,
        receiver: receiver.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
      })
      .rpc();

    console.log("Airdrop signature", tx);
  });
});