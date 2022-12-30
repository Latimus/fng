use crate::state::*;
use anchor_lang::{prelude::*, solana_program::pubkey::Pubkey};

#[derive(Accounts)]
#[instruction(fng_date: u32)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
    mut,
    seeds = [format!{"game{}", fng_date }.as_ref() ],
    bump = game_pda.bump,
    constraint = game_pda.oracle != 254,
    )]
    pub game_pda: Box<Account<'info, GamePda>>,
    #[account(
    mut,
    seeds = [b"player", payer.key.as_ref() ],
    bump = player_pda.bump,    
    )]
    pub player_pda: Box<Account<'info, PlayerPda>>,

    #[account(mut)]
    /// CHECK: check in handler
    pub bank_authority: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}

pub(crate) fn handler(ctx: Context<Withdraw>, fng_date: u32) -> Result<()> {
    let (bank_authority, bank_authority_bump) =
        Pubkey::find_program_address(&[&AUTHORITY_SEED], ctx.program_id);
    let authority_seeds = &[&AUTHORITY_SEED[..], &[bank_authority_bump]];
    if bank_authority != *ctx.accounts.bank_authority.key {
        return err!(ErrorModel::IllegalOwner);
    }
    let (game_pda, _game_pda_seed) =
        Pubkey::find_program_address(&[format!("game{}", fng_date).as_ref()], ctx.program_id);
    if game_pda != ctx.accounts.game_pda.key() {
        return err!(ErrorModel::IllegalOwner);
    }
    let game = &mut ctx.accounts.game_pda;
    let player = &mut *ctx.accounts.player_pda;
    let mut found: bool = false;
    let mut index: usize = 0;

    for (i, b) in player.player_bets.iter().enumerate() {
        if b.day == fng_date {
            found = true;
            index = i;
        }
    }
    if found == false {
        return err!(ErrorModel::NoBet);
    }

    let bet = player.player_bets.remove(index);
    let fng_bet: u8 = bet.fng; // player.player_bets[index.clone()].fng;
    let lamport_bet: u64 = bet.lamport; // player.player_bets[index.clone()].lamport;
    //check if more than 1 player or send bet $ and clean player bet, return
    let mut lamport_total: u64 = 0;
    let mut fng_bet_total: u64 = 0;
    for g in &game.games {
        lamport_total += g.lamport.clone();
        if g.fng == fng_bet {
            fng_bet_total = g.lamport.clone();
        }
    }

    //check if win or if i'm alone
    if fng_bet == game.oracle || lamport_bet == lamport_total {
        if anchor_lang::solana_program::program::invoke_signed(
            &anchor_lang::solana_program::system_instruction::transfer(
                &bank_authority,
                &ctx.accounts.payer.key(),
                (lamport_total / fng_bet_total) * lamport_bet,
            ),
            &[
                ctx.accounts.bank_authority.clone(),
                ctx.accounts.payer.to_account_info().clone(),
            ],
            &[authority_seeds],
        )
        .is_err()
        {
            return err!(ErrorModel::IllegalOwner);
        }
        msg!("You won!");
    } else {
        msg!("You lost!");
    }
    //clean player bet
    game.bet_count -= 1;
    player.bet_count -= 1;
    Ok(())
}
