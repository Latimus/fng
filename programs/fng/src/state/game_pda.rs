use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct GamePda {
    pub bump: u8,
    pub bet_count: u8,
    pub oracle: u8,
    pub games: Vec<Games>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Default)]
pub struct Games {
    pub fng: u8,
    pub lamport: u64,
}
