use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct PlayerPda {
    pub bump: u8,
    pub bet_count: u8,
    pub player_bets: Vec<PlayerBet>,
}


#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Default)]
pub struct PlayerBet {
    pub fng: u8,
    pub lamport: u64,
    pub day: u32,
}
