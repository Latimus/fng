use crate::state::*;
use anchor_lang::system_program::Transfer;
use anchor_lang::{prelude::*, solana_program::pubkey::Pubkey, system_program};

#[derive(Accounts)]
#[instruction(fng_date: u32)]
pub struct NewBet<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
    mut,
    seeds = [format ! ("game{}", fng_date ).as_ref() ],
    bump = game_pda.bump,
    )]
    pub game_pda: Box<Account<'info, GamePda>>,
    #[account(
    mut,
    seeds = [b"player", payer.key.as_ref() ],
    bump = player_pda.bump,
    constraint = game_pda.oracle == 254,
    )]
    pub player_pda: Box<Account<'info, PlayerPda>>,
    #[account(mut)]
    /// CHECK: check in handler
    pub bank_authority: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

pub(crate) fn handler(ctx: Context<NewBet>, fng_date: u32, lamport: u64, fng: u8) -> Result<()> {
    if get_fng_date() >= fng_date {
        return err!(ErrorModel::InvalidArgument);
    }
    let (bank_authority, _bank_authority_bump) =
        Pubkey::find_program_address(&[&AUTHORITY_SEED], ctx.program_id);
    if bank_authority != *ctx.accounts.bank_authority.key {
        return err!(ErrorModel::IllegalOwner);
    }
    if fng < 1 || fng >= 100 {
        return err!(ErrorModel::InvalidArgument)
    }
    let game = &mut *ctx.accounts.game_pda;
    let mut found: bool = false;
    let mut index: usize = 0;

    if game.games.len() > 0 {
        for (i, g) in &mut game.games.iter().enumerate() {
            if g.fng == fng {
                index = i;
                found = true;
            }
        }
    }
    game.bet_count += 1;
    if found {
        game.games[index.clone()].lamport += lamport.clone();
    } else {
        game.games.push(Games {
            fng: fng.clone(),
            lamport: lamport.clone(),
        });
    }
    let player = &mut *ctx.accounts.player_pda;
    if player.player_bets.len() >= 10 {
        return err!(ErrorModel::TooMuchBet);
    }
    for b in &player.player_bets {
        if b.fng == fng && b.day == fng_date {
            return err!(ErrorModel::BetExist);
        }
    }
    player.bet_count += 1;
    player.player_bets.push(PlayerBet {
        fng: fng.clone(),
        lamport: lamport.clone(),
        day: fng_date,
    });

    system_program::transfer(ctx.accounts.send_lamports(), lamport)
        .expect("Error in transfer.");

    Ok(())
}

impl<'info> NewBet<'info> {
    fn send_lamports(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        let cpi_accounts = Transfer {
            from: self.payer.to_account_info().clone(),
            to: self.bank_authority.to_account_info().clone(),
        };
        CpiContext::new(self.system_program.to_account_info().clone(), cpi_accounts)
    }
}
