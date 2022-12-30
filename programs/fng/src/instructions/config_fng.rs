use crate::state::*;
use anchor_lang::{prelude::*, solana_program::pubkey::Pubkey};

#[derive(Accounts)]
pub struct ConfigFNG<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    /// CHECK: only at init
    pub oracle: AccountInfo<'info>,
    #[account(
        init,
        payer = payer,
        seeds = [b"config_fng"],
        bump,
        space = 8 + std::mem::size_of::<ConfigPda>()
    )]
    pub config_pda: Box<Account<'info, ConfigPda>>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub(crate) fn handler(ctx: Context<ConfigFNG>) -> Result<()> {
    let config_fng = &mut ctx.accounts.config_pda;
    config_fng.owner_account = *ctx.accounts.payer.key;
    config_fng.oracle_account = *ctx.accounts.oracle.key;
    config_fng.bump = *ctx.bumps.get("config_pda").unwrap();
    Ok(())
}
