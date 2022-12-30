use crate::state::*;
use anchor_lang::system_program::Transfer;
use anchor_lang::{prelude::*, solana_program::pubkey::Pubkey, system_program};

#[derive(Accounts)]
#[instruction(fng_date: u32)]
pub struct NewGame<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
    init,
    payer = payer,
    seeds = [format!("game{}", fng_date ).as_ref()  ],
    bump,
    space = 8 + std::mem::size_of::<GamePda>() + 100 * std::mem::size_of::<Games>(),
    )]
    pub game_pda: Box<Account<'info, GamePda>>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handler(ctx: Context<NewGame>, fng_date: u32) -> Result<()> {

    if get_fng_date() >= fng_date {
        return err!(ErrorModel::InvalidArgument);
    }
    let game = &mut *ctx.accounts.game_pda;
    game.bump = *ctx.bumps.get("game_pda").unwrap();
    game.bet_count = 0;
    game.oracle = 254;
    Ok(())
}
