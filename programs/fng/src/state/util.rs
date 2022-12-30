use anchor_lang::{prelude::*, solana_program::clock};
use chrono::prelude::*;
use chrono::NaiveDateTime;

pub const AUTHORITY_SEED: &[u8] = b"bank_authority";
pub const LAMPORTS_PER_SOL: u64 = 1_000_000_000;

pub fn is_today(fng_date: u32) -> bool {
    let tts = clock::Clock::get().unwrap().unix_timestamp;
    let dt = NaiveDateTime::from_timestamp_opt(tts, 0).unwrap();
    return format!("{}", fng_date) == format!("{}{:02}{:02}", dt.year(), dt.month(), dt.day());
}

pub fn get_fng_date() -> u32 {
    let tts = clock::Clock::get().unwrap().unix_timestamp;
    let dt = NaiveDateTime::from_timestamp_opt(tts, 0).unwrap();
    return format!("{}{:02}{:02}", dt.year(), dt.month(), dt.day())
        .parse()
        .unwrap();
}
