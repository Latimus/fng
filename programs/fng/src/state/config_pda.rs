use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct ConfigPda {
    pub owner_account: Pubkey,
    pub oracle_account: Pubkey,
    pub bump: u8,
}
