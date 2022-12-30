use anchor_lang::prelude::*;


#[error_code]
pub enum ErrorModel {
    #[msg("The arguments provided to a program instruction where invalid")]
    InvalidArgument,
    #[msg("[700] The arguments provided to a program instruction where invalid")]
    InvalidArgument700,
    #[msg("[701] The arguments provided to a program instruction where invalid")]
    InvalidArgument701,
    #[msg("[702] The arguments provided to a program instruction where invalid")]
    InvalidArgument702,
    #[msg("Provided owner is not allowed")]
    IllegalOwner,
    #[msg("Bet allready exist.")]
    BetExist,
    #[msg("Too much bet.")]
    TooMuchBet,
    #[msg("No bet found.")]
    NoBet,
}