// // use anchor_lang::prelude::*;
// // use anchor_spl::{
// //     associated_token::AssociatedToken,
// //     token::{self, Mint, MintTo, Token, TokenAccount},
// //     metadata::{
// //         create_metadata_accounts_v3,
// //         CreateMetadataAccountsV3,
// //         mpl_token_metadata::types::{DataV2, Creator}, // 'state' is now 'types'
// //     },
// // };

// // // IMPORTANT: Remember to replace this with YOUR program ID
// // declare_id!("8jTt3KWi5dczJxJcLRLMXuaFFe89NPqCrD6921YW3px9");

// // #[program]
// // pub mod faucet {
// //     use super::*;

// //     pub fn initialize_faucet(ctx: Context<InitializeFaucet>) -> Result<()> {
// //         msg!("Faucet mint initialized at address: {}", ctx.accounts.mint.key());
// //         Ok(())
// //     }

// //     pub fn airdrop(ctx: Context<Airdrop>, amount: u64) -> Result<()> {
// //         let bump = ctx.bumps.mint;
        
// //         token::mint_to(
// //             CpiContext::new_with_signer(
// //                 ctx.accounts.token_program.to_account_info(),
// //                 MintTo {
// //                     mint: ctx.accounts.mint.to_account_info(),
// //                     to: ctx.accounts.destination.to_account_info(),
// //                     authority: ctx.accounts.mint.to_account_info(),
// //                 },
// //                 &[&[b"faucet-mint", &[bump]]],
// //             ),
// //             amount,
// //         )?;
// //         Ok(())
// //     }

// //     pub fn initialize_metadata(ctx: Context<InitializeMetadata>) -> Result<()> {
// //         // 1. Prepare the PDA Signer seeds
// //         let seeds = &[&b"faucet-mint"[..], &[ctx.bumps.mint]];
// //         let signer = &[&seeds[..]];

// //         // 2. Define the Creator (The Mint PDA)
// //         let creator = vec![
// //             Creator {
// //                 address: ctx.accounts.mint.key(),
// //                 verified: true,
// //                 share: 100,
// //             },
// //         ];

// //         // 3. Define the Data struct
// //         // Note: We use 'types::DataV2' now instead of 'state::DataV2'
// //         let token_data = DataV2 {
// //             name: "Sun-Shit".to_string(),
// //             symbol: "SUN".to_string(),
// //             uri: "".to_string(), 
// //             seller_fee_basis_points: 0,
// //             creators: Some(creator),
// //             collection: None,
// //             uses: None,
// //         };

// //         // 4. Create the Context for the CPI
// //         let cpi_context = CpiContext::new_with_signer(
// //             ctx.accounts.token_metadata_program.to_account_info(),
// //             CreateMetadataAccountsV3 {
// //                 metadata: ctx.accounts.metadata.to_account_info(),
// //                 mint: ctx.accounts.mint.to_account_info(),
// //                 mint_authority: ctx.accounts.mint.to_account_info(),
// //                 payer: ctx.accounts.payer.to_account_info(),
// //                 update_authority: ctx.accounts.mint.to_account_info(),
// //                 system_program: ctx.accounts.system_program.to_account_info(),
// //                 rent: ctx.accounts.rent.to_account_info(),
// //             },
// //             signer,
// //         );

// //         // 5. Call the helper function (No manual invoke_signed needed!)
// //         create_metadata_accounts_v3(
// //             cpi_context,
// //             token_data,
// //             true, // is_mutable
// //             true, // update_authority_is_signer
// //             None, // collection_details
// //         )?;

// //         Ok(())
// //     }
// // }

// // #[derive(Accounts)]
// // pub struct InitializeFaucet<'info> {
// //     #[account(
// //         init_if_needed,
// //         payer = payer,
// //         seeds = [b"faucet-mint"],
// //         bump,
// //         mint::decimals = 6,
// //         mint::authority = mint,
// //     )]
// //     pub mint: Account<'info, Mint>,

// //     #[account(mut)]
// //     pub payer: Signer<'info>,

// //     pub system_program: Program<'info, System>,
// //     pub token_program: Program<'info, Token>,
// //     pub rent: Sysvar<'info, Rent>,
// // }

// // #[derive(Accounts)]
// // pub struct Airdrop<'info> {
// //     #[account(
// //         mut,
// //         seeds = [b"faucet-mint"],
// //         bump,
// //     )]
// //     pub mint: Account<'info, Mint>,

// //     #[account(
// //         init_if_needed,
// //         payer = payer,
// //         associated_token::mint = mint,
// //         associated_token::authority = receiver,
// //     )]
// //     pub destination: Account<'info, TokenAccount>,

// //     #[account(mut)]
// //     pub payer: Signer<'info>,

// //     /// CHECK: Safe
// //     pub receiver: UncheckedAccount<'info>,

// //     pub system_program: Program<'info, System>,
// //     pub token_program: Program<'info, Token>,
// //     pub associated_token_program: Program<'info, AssociatedToken>,
// // }

// // #[derive(Accounts)]
// // pub struct InitializeMetadata<'info> {
// //     /// CHECK: We manually validate the seeds below to avoid importing 'find_metadata_account'
// //     #[account(
// //         mut,
// //         seeds = [
// //             b"metadata", 
// //             token_metadata_program.key().as_ref(), 
// //             mint.key().as_ref()
// //         ],
// //         bump,
// //         seeds::program = token_metadata_program.key(),
// //     )]
// //     pub metadata: UncheckedAccount<'info>,

// //     #[account(
// //         mut,
// //         seeds = [b"faucet-mint"],
// //         bump,
// //     )]
// //     pub mint: Account<'info, Mint>,

// //     #[account(mut)]
// //     pub payer: Signer<'info>,

// //     pub system_program: Program<'info, System>,
// //     pub rent: Sysvar<'info, Rent>,
    
// //     /// CHECK: Metaplex Token Metadata Program
// //     pub token_metadata_program: UncheckedAccount<'info>,
// // }


// use anchor_lang::prelude::*;
// use anchor_lang::system_program::{transfer, Transfer}; // For SOL transfers
// use anchor_spl::{
//     associated_token::AssociatedToken,
//     token::{self, Mint, MintTo, Token, TokenAccount},
// };

// // REPLACE WITH YOUR NEW PROGRAM ID AFTER 'anchor build'
// declare_id!("8jTt3KWi5dczJxJcLRLMXuaFFe89NPqCrD6921YW3px9"); 

// #[program]
// pub mod faucet {
//     use super::*;

//     // 1. Initialize the Global State (Run this once)
//     pub fn initialize_global_state(ctx: Context<InitializeGlobalState>) -> Result<()> {
//         let global_state = &mut ctx.accounts.global_state;
//         global_state.admin = ctx.accounts.admin.key();
//         global_state.is_paused = false;
//         global_state.total_minted = 0;
//         Ok(())
//     }

//     // 2. Standard Airdrop with Rate Limiting
//     pub fn airdrop(ctx: Context<Airdrop>, amount: u64) -> Result<()> {
//         let global_state = &ctx.accounts.global_state;
//         let user_stats = &mut ctx.accounts.user_stats;
//         let clock = Clock::get()?;

//         // CHECK 1: Is the faucet paused?
//         require!(!global_state.is_paused, FaucetError::Paused);

//         // CHECK 2: Has it been 24 hours (86400 seconds)?
//         // Note: We use 10 seconds here for testing. Change to 86400 for production.
//         if user_stats.last_claim_timestamp != 0 {
//             require!(
//                 clock.unix_timestamp - user_stats.last_claim_timestamp > 10,
//                 FaucetError::RateLimitExceeded
//             );
//         }

//         // Perform Mint
//         let seeds = &[&b"faucet-mint"[..], &[ctx.bumps.mint]];
//         let signer = &[&seeds[..]];

//         token::mint_to(
//             CpiContext::new_with_signer(
//                 ctx.accounts.token_program.to_account_info(),
//                 MintTo {
//                     mint: ctx.accounts.mint.to_account_info(),
//                     to: ctx.accounts.destination.to_account_info(),
//                     authority: ctx.accounts.mint.to_account_info(),
//                 },
//                 signer,
//             ),
//             amount,
//         )?;

//         // Update State
//         user_stats.last_claim_timestamp = clock.unix_timestamp;
//         user_stats.total_claimed += amount;
        
//         // Update Global State (Needs mutable reference)
//         let global_state = &mut ctx.accounts.global_state;
//         global_state.total_minted += amount;

//         Ok(())
//     }

//     // 3. Buy Tokens (Premium Feature: 0.1 SOL for 1M Tokens)
//     pub fn buy_tokens(ctx: Context<BuyTokens>, amount_tokens: u64) -> Result<()> {
//         let global_state = &mut ctx.accounts.global_state;
//         require!(!global_state.is_paused, FaucetError::Paused);

//         // Step 1: Transfer SOL from User to Treasury (Global State PDA)
//         // Let's say price is fixed: 0.1 SOL for 1,000,000 Tokens
//         // Logic: For every 1 Token, cost is 100 Lamports (Example price)
//         let cost_in_lamports = amount_tokens / 10; // Simple math for demo

//         let cpi_context = CpiContext::new(
//             ctx.accounts.system_program.to_account_info(),
//             Transfer {
//                 from: ctx.accounts.payer.to_account_info(),
//                 to: global_state.to_account_info(), // Sending SOL to the contract PDA
//             },
//         );
//         transfer(cpi_context, cost_in_lamports)?;

//         // Step 2: Mint Tokens to User
//         let seeds = &[&b"faucet-mint"[..], &[ctx.bumps.mint]];
//         let signer = &[&seeds[..]];

//         token::mint_to(
//             CpiContext::new_with_signer(
//                 ctx.accounts.token_program.to_account_info(),
//                 MintTo {
//                     mint: ctx.accounts.mint.to_account_info(),
//                     to: ctx.accounts.destination.to_account_info(),
//                     authority: ctx.accounts.mint.to_account_info(),
//                 },
//                 signer,
//             ),
//             amount_tokens,
//         )?;

//         global_state.total_minted += amount_tokens;

//         Ok(())
//     }

//     // 4. Admin: Toggle Pause
//     pub fn toggle_pause(ctx: Context<AdminAction>) -> Result<()> {
//         let global_state = &mut ctx.accounts.global_state;
//         // Access control check is done in the Accounts struct constraints
//         global_state.is_paused = !global_state.is_paused;
//         Ok(())
//     }

//     // 5. Admin: Withdraw Accumulated SOL
//     pub fn withdraw_funds(ctx: Context<AdminAction>) -> Result<()> {
//         let global_state = &mut ctx.accounts.global_state;
//         let amount = global_state.to_account_info().lamports();

//         // We can't just transfer FROM a PDA using system_program::transfer directly 
//         // without a CPI, but simpler way for PDAs is to manually adjust lamports 
//         // since the program owns the account.
        
//         **global_state.to_account_info().try_borrow_mut_lamports()? -= amount;
//         **ctx.accounts.admin.try_borrow_mut_lamports()? += amount;

//         Ok(())
//     }
// }

// // --- DATA STRUCTURES ---

// #[account]
// pub struct GlobalState {
//     pub admin: Pubkey,        // 32
//     pub is_paused: bool,      // 1
//     pub total_minted: u64,    // 8
// }

// #[account]
// pub struct UserStats {
//     pub last_claim_timestamp: i64, // 8
//     pub total_claimed: u64,        // 8
// }

// // --- CONTEXTS ---

// #[derive(Accounts)]
// pub struct InitializeGlobalState<'info> {
//     #[account(
//         init,
//         seeds = [b"global-state"],
//         bump,
//         payer = admin,
//         space = 8 + 32 + 1 + 8
//     )]
//     pub global_state: Account<'info, GlobalState>,
//     #[account(mut)]
//     pub admin: Signer<'info>,
//     pub system_program: Program<'info, System>,
// }

// #[derive(Accounts)]
// pub struct Airdrop<'info> {
//     #[account(mut, seeds = [b"global-state"], bump)]
//     pub global_state: Account<'info, GlobalState>,

//     #[account(
//         init_if_needed,
//         payer = payer,
//         seeds = [b"user-stats", payer.key().as_ref()],
//         bump,
//         space = 8 + 8 + 8
//     )]
//     pub user_stats: Account<'info, UserStats>,

//     #[account(mut, seeds = [b"faucet-mint"], bump)]
//     pub mint: Account<'info, Mint>,

//     #[account(
//         init_if_needed,
//         payer = payer,
//         associated_token::mint = mint,
//         associated_token::authority = receiver,
//     )]
//     pub destination: Account<'info, TokenAccount>,

//     #[account(mut)]
//     pub payer: Signer<'info>,
//     /// CHECK: Receiver can be anyone
//     pub receiver: UncheckedAccount<'info>,

//     pub system_program: Program<'info, System>,
//     pub token_program: Program<'info, Token>,
//     pub associated_token_program: Program<'info, AssociatedToken>,
// }

// #[derive(Accounts)]
// pub struct BuyTokens<'info> {
//     #[account(mut, seeds = [b"global-state"], bump)]
//     pub global_state: Account<'info, GlobalState>,

//     #[account(mut, seeds = [b"faucet-mint"], bump)]
//     pub mint: Account<'info, Mint>,

//     #[account(
//         init_if_needed,
//         payer = payer,
//         associated_token::mint = mint,
//         associated_token::authority = payer,
//     )]
//     pub destination: Account<'info, TokenAccount>,

//     #[account(mut)]
//     pub payer: Signer<'info>,
    
//     pub system_program: Program<'info, System>,
//     pub token_program: Program<'info, Token>,
//     pub associated_token_program: Program<'info, AssociatedToken>,
// }

// #[derive(Accounts)]
// pub struct AdminAction<'info> {
//     #[account(
//         mut,
//         seeds = [b"global-state"],
//         bump,
//         has_one = admin // Constraint: Only the admin saved in state can call this!
//     )]
//     pub global_state: Account<'info, GlobalState>,

//     #[account(mut)]
//     pub admin: Signer<'info>,
// }

// // --- ERRORS ---

// #[error_code]
// pub enum FaucetError {
//     #[msg("Faucet is currently paused.")]
//     Paused,
//     #[msg("You are claiming too fast. Wait 24 hours.")]
//     RateLimitExceeded,
// }


use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, Mint, MintTo, Token, TokenAccount},
};

// REPLACE WITH YOUR PROGRAM ID
declare_id!("8jTt3KWi5dczJxJcLRLMXuaFFe89NPqCrD6921YW3px9"); 

#[program]
pub mod faucet {
    use super::*;

    // 1. Initialize Faucet Mint (Restored Feature)
    pub fn initialize_faucet(ctx: Context<InitializeFaucet>) -> Result<()> {
        msg!("Faucet mint initialized!");
        Ok(())
    }

    // 2. Initialize Global State (Admin Setup)
    pub fn initialize_global_state(ctx: Context<InitializeGlobalState>) -> Result<()> {
        let global_state = &mut ctx.accounts.global_state;
        global_state.admin = ctx.accounts.admin.key();
        global_state.is_paused = false;
        global_state.total_minted = 0;
        Ok(())
    }

    // 3. Airdrop with Rate Limiting
    pub fn airdrop(ctx: Context<Airdrop>, amount: u64) -> Result<()> {
        let global_state = &ctx.accounts.global_state;
        let user_stats = &mut ctx.accounts.user_stats;
        let clock = Clock::get()?;

        require!(!global_state.is_paused, FaucetError::Paused);

        // Rate limit check (10 seconds for testing, change to 86400 for prod)
        if user_stats.last_claim_timestamp != 0 {
            require!(
                clock.unix_timestamp - user_stats.last_claim_timestamp > 10,
                FaucetError::RateLimitExceeded
            );
        }

        let seeds = &[&b"faucet-mint"[..], &[ctx.bumps.mint]];
        let signer = &[&seeds[..]];

        token::mint_to(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                MintTo {
                    mint: ctx.accounts.mint.to_account_info(),
                    to: ctx.accounts.destination.to_account_info(),
                    authority: ctx.accounts.mint.to_account_info(),
                },
                signer,
            ),
            amount,
        )?;

        user_stats.last_claim_timestamp = clock.unix_timestamp;
        user_stats.total_claimed += amount;
        
        let global_state = &mut ctx.accounts.global_state;
        global_state.total_minted += amount;

        Ok(())
    }

    // 4. Buy Tokens
    pub fn buy_tokens(ctx: Context<BuyTokens>, amount_tokens: u64) -> Result<()> {
        let global_state = &mut ctx.accounts.global_state;
        require!(!global_state.is_paused, FaucetError::Paused);

        let cost_in_lamports = amount_tokens / 10000; 

        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            Transfer {
                from: ctx.accounts.payer.to_account_info(),
                to: global_state.to_account_info(), 
            },
        );
        transfer(cpi_context, cost_in_lamports)?;

        let seeds = &[&b"faucet-mint"[..], &[ctx.bumps.mint]];
        let signer = &[&seeds[..]];

        token::mint_to(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                MintTo {
                    mint: ctx.accounts.mint.to_account_info(),
                    to: ctx.accounts.destination.to_account_info(),
                    authority: ctx.accounts.mint.to_account_info(),
                },
                signer,
            ),
            amount_tokens,
        )?;

        global_state.total_minted += amount_tokens;
        Ok(())
    }
}

// --- ACCOUNTS ---

#[derive(Accounts)]
pub struct InitializeFaucet<'info> {
    #[account(
        init_if_needed,
        seeds = [b"faucet-mint"],
        bump,
        payer = payer,
        mint::decimals = 6,
        mint::authority = mint,
    )]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct InitializeGlobalState<'info> {
    #[account(
        init,
        seeds = [b"global-state"],
        bump,
        payer = admin,
        space = 8 + 32 + 1 + 8
    )]
    pub global_state: Account<'info, GlobalState>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Airdrop<'info> {
    #[account(mut, seeds = [b"global-state"], bump)]
    pub global_state: Account<'info, GlobalState>,

    #[account(
        init_if_needed,
        payer = payer,
        seeds = [b"user-stats", payer.key().as_ref()],
        bump,
        space = 8 + 8 + 8
    )]
    pub user_stats: Account<'info, UserStats>,

    #[account(mut, seeds = [b"faucet-mint"], bump)]
    pub mint: Account<'info, Mint>,

    #[account(
        init_if_needed,
        payer = payer,
        associated_token::mint = mint,
        associated_token::authority = receiver,
    )]
    pub destination: Account<'info, TokenAccount>,

    #[account(mut)]
    pub payer: Signer<'info>,
    /// CHECK: Receiver can be anyone
    pub receiver: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

#[derive(Accounts)]
pub struct BuyTokens<'info> {
    #[account(mut, seeds = [b"global-state"], bump)]
    pub global_state: Account<'info, GlobalState>,

    #[account(mut, seeds = [b"faucet-mint"], bump)]
    pub mint: Account<'info, Mint>,

    #[account(
        init_if_needed,
        payer = payer,
        associated_token::mint = mint,
        associated_token::authority = payer,
    )]
    pub destination: Account<'info, TokenAccount>,

    #[account(mut)]
    pub payer: Signer<'info>,
    
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

#[account]
pub struct GlobalState {
    pub admin: Pubkey,
    pub is_paused: bool,
    pub total_minted: u64,
}

#[account]
pub struct UserStats {
    pub last_claim_timestamp: i64,
    pub total_claimed: u64,
}

#[error_code]
pub enum FaucetError {
    #[msg("Faucet is currently paused.")]
    Paused,
    #[msg("You are claiming too fast. Wait 24 hours.")]
    RateLimitExceeded,
}