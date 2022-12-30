use crate::state::*;
use anchor_lang::{prelude::*, solana_program::pubkey::Pubkey};
#[derive(Accounts)]
#[instruction(fng_date: u32)]
pub struct CloseGame<'info> {
    #[account(mut, constraint = payer.key == &config_fng.oracle_account)]
    pub payer: Signer<'info>,
    #[account(
    seeds = [b"config_fng"],
    bump = config_fng.bump,
    )]
    pub config_fng: Box<Account<'info, ConfigPda>>,
    #[account(
    mut,
    seeds = [format!("game{}", fng_date ).as_ref() ],
    bump = game_pda.bump,
    close = payer,
    constraint = game_pda.bet_count == 0,
    )]
    pub game_pda: Box<Account<'info, GamePda>>,
    pub system_program: Program<'info, System>,

}

pub(crate) fn handler() -> Result<()> {
    Ok(())
}
