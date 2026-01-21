# Solana Faucet Project

This project is a decentralized application (dApp) on the Solana blockchain that functions as a token faucet. It allows users to claim "Sun-Shit" (SUN) tokens, which are minted on-demand to their wallet.

## 🏗 Architecture

The project consists of two main components:

1.  **Smart Contract (Program):** Built with [Anchor](https://www.anchor-lang.com/), a framework for Solana's Sealevel runtime.
    *   **Logic:** `programs/faucet/src/lib.rs`
    *   **Features:**
        *   `initialize_faucet`: Initializes a Program Derived Address (PDA) to act as the mint authority.
        *   `airdrop`: Mints a specific amount of tokens to the caller's Associated Token Account (ATA).
        *   `initialize_metadata`: Assigns Metaplex metadata (Name, Symbol) to the token mint.

2.  **Frontend:** Built with [Next.js](https://nextjs.org/) and TypeScript.
    *   **Logic:** `frontend/src/`
    *   **Integration:** Uses `@solana/wallet-adapter-react` for wallet connection and `@coral-xyz/anchor` to interact with the smart contract.

## 📂 Project Structure

```
.
├── programs/           # Solana smart contract code (Rust)
│   └── faucet/
│       └── src/lib.rs  # Main program logic
├── frontend/           # Next.js frontend application
│   └── src/
│       ├── components/ # React components (Faucet button, Wallet provider)
│       └── app/        # Next.js app router pages
├── tests/              # TypeScript tests & initialization scripts
├── migrations/         # Anchor deploy scripts
├── Anchor.toml         # Anchor configuration
└── package.json        # Root dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
*   [Rust & Cargo](https://rustup.rs/)
*   [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
*   [Node.js](https://nodejs.org/) & Yarn
*   [Anchor CLI](https://www.anchor-lang.com/docs/installation)

### 1. Setup & Backend Deployment

1.  **Install Dependencies:**
    ```bash
    yarn install
    ```

2.  **Build the Program:**
    ```bash
    anchor build
    ```

3.  **Get Your Program ID:**
    Run the following command to see your program's keypair address:
    ```bash
    anchor keys list
    ```

4.  **Update Program ID:**
    Copy the address from the previous step and update it in the following files:
    *   `programs/faucet/src/lib.rs`: `declare_id!("YOUR_PROGRAM_ID");`
    *   `Anchor.toml`: `[programs.localnet] faucet = "YOUR_PROGRAM_ID"`
    *   `frontend/src/components/Faucet.tsx`: `const programId = new anchor.web3.PublicKey("YOUR_PROGRAM_ID");`

    *Note: If you updated `lib.rs`, run `anchor build` again.*

5.  **Deploy to Devnet:**
    Ensure your Solana CLI is set to Devnet and you have SOL:
    ```bash
    solana config set --url devnet
    solana airdrop 2
    anchor deploy
    ```

6.  **Initialize the Faucet:**
    Run the initialization scripts to create the Token Mint and Metadata.
    *You may need to adjust the paths in `tests/initialize.ts` to match your `id.json` location.*

    ```bash
    # Initialize the Mint PDA
    yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/initialize.ts

    # Add Metadata (Name/Symbol)
    yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/initializeMetadata.ts
    ```

### 2. Frontend Setup

1.  **Prepare the IDL:**
    Copy the generated IDL file to the frontend source:
    ```bash
    cp target/idl/faucet.json frontend/src/idl.json
    ```

2.  **Install Frontend Dependencies:**
    ```bash
    cd frontend
    npm install
    # or
    yarn install
    ```

3.  **Run the App:**
    ```bash
    npm run dev
    ```

4.  **Access:**
    Open [http://localhost:3000](http://localhost:3000) in your browser. Connect your Phantom/Solflare wallet (on Devnet) and click "Get 100 Faucet Coins".

## 🧪 Testing

To run the integration tests located in `tests/`:

```bash
anchor test
```
