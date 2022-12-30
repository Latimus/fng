use crate::state::*;
use anchor_lang::{prelude::*, solana_program::pubkey::Pubkey};

#[derive(Accounts)]
#[instruction(fng_date: u32)]
pub struct UpdateOracle<'info> {
    #[account(mut, constraint = payer.key == &config_fng.oracle_account)]
    pub payer: Signer<'info>,
    #[account(
    seeds = [b"config_fng"],
    bump = config_fng.bump,
    )]
    pub config_fng: Box<Account<'info, ConfigPda>>,

    #[account(
        mut,
        seeds = [format ! ("game{}", fng_date ).as_ref() ],
        bump = game_pda.bump,
        constraint = game_pda.oracle == 254,
        )]
    pub game_pda: Box<Account<'info, GamePda>>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub(crate) fn handler(ctx: Context<UpdateOracle>, fng_date: u32, fng: u8) -> Result<()> {
    if is_today(fng_date) == false {
        msg!("inside:{} input:{}", get_fng_date(), fng_date);
        return err!(ErrorModel::InvalidArgument701);
    }
    let game = &mut *ctx.accounts.game_pda;
    game.oracle = fng;

    Ok(())
}
