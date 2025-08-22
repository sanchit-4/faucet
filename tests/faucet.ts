// tests/faucet.ts

import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Faucet } from "../target/types/faucet"; // Make sure this matches your program name
import {
  getAssociatedTokenAddress,
  getAccount,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { assert } from "chai";

describe("faucet", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  // Use your program's actual name here from Anchor.toml
  const program = anchor.workspace.Faucet as Program<Faucet>;
  const payer = provider.wallet as anchor.Wallet;

  // 1. Calculate the PDA for the mint account BEFORE the tests run.
  const [mintPDA] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("faucet-mint")],
    program.programId
  );

  it("Initializes the faucet mint", async () => {
    // This test calls the `initialize_faucet` instruction.
    const tx = await program.methods
      .initializeFaucet()
      .accounts({
        mint: mintPDA,
        payer: payer.publicKey,
        // The other system accounts are inferred by Anchor.
      })
      .rpc();
    
    console.log("Initialize transaction signature", tx);

    // Verify that the mint PDA was created and is owned by the token program.
    const accountInfo = await provider.connection.getAccountInfo(mintPDA);
    assert.ok(accountInfo.owner.equals(TOKEN_PROGRAM_ID));
  });

  it("Airdrops tokens to a user", async () => {
    // The user to receive the tokens. Using the payer for simplicity.
    const receiver = payer.publicKey;

    // Calculate the user's Associated Token Account (ATA) address.
    const userATA = await getAssociatedTokenAddress(mintPDA, receiver);

    // Define the amount to airdrop (100 tokens with 6 decimals).
    const amountToAirdrop = new anchor.BN(100 * 1_000_000);

    const tx = await program.methods
      .airdrop(amountToAirdrop)
      .accounts({
        mint: mintPDA,
        destination: userATA,
        payer: payer.publicKey,
        receiver: receiver,
        // The other system accounts are inferred by Anchor.
      })
      .rpc();

    console.log("Airdrop transaction signature", tx);

    // Verify the user's token account now has the correct balance.
    const userTokenAccount = await getAccount(provider.connection, userATA);
    assert.ok(userTokenAccount.amount.toString() === amountToAirdrop.toString());
  });
});