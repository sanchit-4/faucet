// programs/faucet/src/lib.rs

use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, Mint, MintTo, Token, TokenAccount},
};
use mpl_token_metadata::{
    pda::find_metadata_account,
    instruction::{create_metadata_accounts_v3, CreateMetadataAccountsV3InstructionArgs},
};

// IMPORTANT: Remember to replace this with YOUR program ID from `anchor keys list`
declare_id!("2CtSGNwpXpixS7acooqJSPVRHfdtjZytfuxvHo8zjWoz");

#[program]
pub mod faucet {
    use super::*;

    // This instruction is idempotent. It can be called many times, but will
    // only initialize the mint the very first time.
    pub fn initialize_faucet(ctx: Context<InitializeFaucet>) -> Result<()> {
        msg!("Faucet mint initialized at address: {}", ctx.accounts.mint.key());
        Ok(())
    }

    pub fn airdrop(ctx: Context<Airdrop>, amount: u64) -> Result<()> {
        // We need the bump seed for our PDA (which is the mint itself).
        let bump = ctx.bumps.mint;

        // Note: The original code had a subtle bug here. The authority for minting
        // is the mint itself (the PDA), not a separate authority account.
        token::mint_to(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                MintTo {
                    mint: ctx.accounts.mint.to_account_info(),
                    to: ctx.accounts.destination.to_account_info(),
                    authority: ctx.accounts.mint.to_account_info(), // The mint IS the authority
                },
                &[&[b"faucet-mint", &[bump]]], // The seeds for our PDA
            ),
            amount, // We pass the amount directly from the instruction
        )?;
        Ok(())
    }

    pub fn initialize_metadata(ctx: Context<InitializeMetadata>) -> Result<()> {
        let seeds = &[&b"faucet-mint"[..], &[ctx.bumps.mint]];
        let signer = &[&seeds[..]];

        let account_info = vec![
            ctx.accounts.metadata.to_account_info(),
            ctx.accounts.mint.to_account_info(),
            ctx.accounts.mint.to_account_info(), // Mint authority is the PDA
            ctx.accounts.payer.to_account_info(),
            ctx.accounts.mint.to_account_info(), // Update authority is the PDA
            ctx.accounts.system_program.to_account_info(),
            ctx.accounts.rent.to_account_info(),
        ];

        let creator = vec![
            mpl_token_metadata::state::Creator {
                address: ctx.accounts.mint.key(), // The PDA is the creator
                verified: true,
                share: 100,
            },
        ];

        let instruction_args = CreateMetadataAccountsV3InstructionArgs {
            data: mpl_token_metadata::state::DataV2 {
                name: "Sun-Shit".to_string(),     // <-- YOUR TOKEN NAME
                symbol: "SUN".to_string(),          // <-- YOUR TOKEN SYMBOL
                uri: "".to_string(), // You can link to a JSON file with an image here
                seller_fee_basis_points: 0,
                creators: Some(creator),
                collection: None,
                uses: None,
            },
            is_mutable: true,
            collection_details: None,
        };

        invoke_signed(
            &create_metadata_accounts_v3(
                ctx.accounts.token_metadata_program.key(),
                ctx.accounts.metadata.key(),
                ctx.accounts.mint.key(),
                ctx.accounts.mint.key(), // Mint authority
                ctx.accounts.payer.key(),
                ctx.accounts.mint.key(), // Update authority
                instruction_args,
            ),
            &account_info,
            signer,
        )?;

        Ok(())
    }
}

// This struct is a bit different. The MINT itself is the PDA.
#[derive(Accounts)]
pub struct InitializeFaucet<'info> {
    #[account(
        init_if_needed,
        payer = payer,
        seeds = [b"faucet-mint"],
        bump, // Anchor will find and provide the bump
        mint::decimals = 6,
        mint::authority = mint, // The mint's authority is ITSELF
    )]
    pub mint: Account<'info, Mint>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct Airdrop<'info> {
    // We fetch the mint PDA, verifying its seeds and bump.
    #[account(
        mut, // The mint's supply will be changed.
        seeds = [b"faucet-mint"],
        bump,
    )]
    pub mint: Account<'info, Mint>,

    // The destination for the new tokens.
    #[account(
        init_if_needed,
        payer = payer,
        associated_token::mint = mint,
        associated_token::authority = receiver, // The owner of this ATA is the `receiver`
    )]
    pub destination: Account<'info, TokenAccount>,

    #[account(mut)]
    pub payer: Signer<'info>,

    /// CHECK: The receiver can be any public key. We are not reading or writing to it,
    /// just using it as the authority for the associated token account.
    pub receiver: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

#[derive(Accounts)]
pub struct InitializeMetadata<'info> {
    /// CHECK: We are passing this in for the CPI
    #[account(
        mut,
        address=find_metadata_account(&mint.key()).0
    )]
    pub metadata: UncheckedAccount<'info>,

    #[account(
        mut,
        seeds = [b"faucet-mint"],
        bump,
    )]
    pub mint: Account<'info, Mint>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
    /// CHECK: We are passing this in for the CPI
    #[account(address = mpl_token_metadata::ID)]
    pub token_metadata_program: UncheckedAccount<'info>,
}