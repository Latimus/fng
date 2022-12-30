use crate::state::*;
use anchor_lang::{prelude::*, solana_program::pubkey::Pubkey};

#[derive(Accounts)]
pub struct NewPlayer<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
    init,
    payer = payer,
    seeds = [b"player", payer.key.as_ref() ],
    bump,
    space = 8 + std::mem::size_of::< PlayerPda > () + 10 * std::mem::size_of::< PlayerBet > (),
    )]
    pub player_pda: Box<Account<'info, PlayerPda>>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub(crate) fn handler(ctx: Context<NewPlayer>) -> Result<()> {
    let bet = &mut *ctx.accounts.player_pda;
    bet.bump = *ctx.bumps.get("player_pda").unwrap();
    bet.bet_count = 0;
    Ok(())
}
