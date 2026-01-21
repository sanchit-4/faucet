// import * as anchor from "@coral-xyz/anchor";
// import { Program } from "@coral-xyz/anchor";
// import { Faucet } from "../target/types/faucet";

// async function main() {
//   const provider = anchor.AnchorProvider.env();
//   anchor.setProvider(provider);
//   const program = anchor.workspace.Faucet as Program<Faucet>;

//   const [globalStatePda] = anchor.web3.PublicKey.findProgramAddressSync(
//     [Buffer.from("global-state")],
//     program.programId
//   );

//   console.log("Initializing Global State at:", globalStatePda.toBase58());

//   try {
//     const tx = await program.methods
//       .initializeGlobalState()
//       .accountsStrict({
//         globalState: globalStatePda,
//         admin: provider.wallet.publicKey,
//         systemProgram: anchor.web3.SystemProgram.programId,
//       })
//       .rpc();
//     console.log("Global State Initialized! Signature:", tx);
//   } catch (e) {
//     console.log("State likely already initialized.", e);
//   }
// }

// main().then(() => process.exit(0)).catch(console.error);


import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Faucet } from "../target/types/faucet";

async function main() {
  // 1. Setup the provider
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Faucet as Program<Faucet>;

  // 2. Derive the Global State PDA
  const [globalStatePda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("global-state")],
    program.programId
  );

  console.log("Initializing Global State...");
  console.log(" Program ID:", program.programId.toBase58());
  console.log(" Global State PDA:", globalStatePda.toBase58());

  try {
    // 3. Call the initialization instruction
    // We use .methods.initializeGlobalState() normally
    const tx = await program.methods
      .initializeGlobalState()
      .accounts({
        // Anchor 0.30+ resolves 'globalState' automatically, 
        // so we don't need to pass it, avoiding the TS error.
        admin: provider.wallet.publicKey,
        // systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log("✅ Success! Global State Initialized.");
    console.log("   Signature:", tx);
  } catch (error: any) {
    if (error.toString().includes("already in use")) {
      console.log("⚠️  Global State was already initialized. You are good to go!");
    } else {
      console.error("❌ Failed:", error);
    }
  }
}

main().then(() => process.exit(0)).catch(console.error);