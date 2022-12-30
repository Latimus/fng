use anchor_lang::prelude::*;
use instructions::*;

declare_id!("7TZeqvQd27xfZRFnjygaVJA3x6CbUn54qs55kxiZXycG");

pub mod instructions;
pub mod state;

#[program]
pub mod fng {
    use super::*;

    pub fn new_game(ctx: Context<NewGame>, fng_date: u32) -> Result<()> {
        instructions::new_game::handler(ctx, fng_date)
    }
    pub fn new_player(ctx: Context<NewPlayer>) -> Result<()> {
        instructions::new_player::handler(ctx)
    }
    pub fn close_game(ctx: Context<CloseGame>, fng_date: u32) -> Result<()> {
        instructions::close_game::handler()
    }
    pub fn update_oracle(ctx: Context<UpdateOracle>, fng_date: u32, fng: u8) -> Result<()> {
        instructions::update_oracle::handler(ctx, fng_date, fng)
    }
    pub fn withdraw(ctx: Context<Withdraw>, fng_date: u32) -> Result<()> {
        instructions::withdraw::handler(ctx, fng_date)
    }
    pub fn new_bet(ctx: Context<NewBet>, fng_date: u32, lamport: u64, fng: u8) -> Result<()> {
        instructions::new_bet::handler(ctx, fng_date, lamport, fng)
    }
    pub fn config_fng(ctx: Context<ConfigFNG>) -> Result<()> {
        instructions::config_fng::handler(ctx)
    }
}
