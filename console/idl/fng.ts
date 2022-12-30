export type Fng = {
  "version": "0.1.0",
  "name": "fng",
  "instructions": [
    {
      "name": "newGame",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gamePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fngDate",
          "type": "u32"
        }
      ]
    },
    {
      "name": "newPlayer",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "playerPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "closeGame",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "configFng",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "gamePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fngDate",
          "type": "u32"
        }
      ]
    },
    {
      "name": "updateOracle",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "configFng",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "gamePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fngDate",
          "type": "u32"
        },
        {
          "name": "fng",
          "type": "u8"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gamePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bankAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fngDate",
          "type": "u32"
        }
      ]
    },
    {
      "name": "newBet",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gamePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bankAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fngDate",
          "type": "u32"
        },
        {
          "name": "lamport",
          "type": "u64"
        },
        {
          "name": "fng",
          "type": "u8"
        }
      ]
    },
    {
      "name": "configFng",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "configPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "configPda",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ownerAccount",
            "type": "publicKey"
          },
          {
            "name": "oracleAccount",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "gamePda",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "betCount",
            "type": "u32"
          },
          {
            "name": "oracle",
            "type": "u8"
          },
          {
            "name": "games",
            "type": {
              "vec": {
                "defined": "Games"
              }
            }
          }
        ]
      }
    },
    {
      "name": "playerPda",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "betCount",
            "type": "u8"
          },
          {
            "name": "playerBets",
            "type": {
              "vec": {
                "defined": "PlayerBet"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Games",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fng",
            "type": "u8"
          },
          {
            "name": "lamport",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "PlayerBet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fng",
            "type": "u8"
          },
          {
            "name": "lamport",
            "type": "u64"
          },
          {
            "name": "day",
            "type": "u32"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidArgument",
      "msg": "The arguments provided to a program instruction where invalid"
    },
    {
      "code": 6001,
      "name": "InvalidArgument700",
      "msg": "[700] The arguments provided to a program instruction where invalid"
    },
    {
      "code": 6002,
      "name": "InvalidArgument701",
      "msg": "[701] The arguments provided to a program instruction where invalid"
    },
    {
      "code": 6003,
      "name": "InvalidArgument702",
      "msg": "[702] The arguments provided to a program instruction where invalid"
    },
    {
      "code": 6004,
      "name": "IllegalOwner",
      "msg": "Provided owner is not allowed"
    },
    {
      "code": 6005,
      "name": "BetExist",
      "msg": "Bet allready exist."
    },
    {
      "code": 6006,
      "name": "TooMuchBet",
      "msg": "Too much bet."
    },
    {
      "code": 6007,
      "name": "NoBet",
      "msg": "No bet found."
    }
  ]
};

export const IDL: Fng = {
  "version": "0.1.0",
  "name": "fng",
  "instructions": [
    {
      "name": "newGame",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gamePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fngDate",
          "type": "u32"
        }
      ]
    },
    {
      "name": "newPlayer",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "playerPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "closeGame",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "configFng",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "gamePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fngDate",
          "type": "u32"
        }
      ]
    },
    {
      "name": "updateOracle",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "configFng",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "gamePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fngDate",
          "type": "u32"
        },
        {
          "name": "fng",
          "type": "u8"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gamePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bankAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fngDate",
          "type": "u32"
        }
      ]
    },
    {
      "name": "newBet",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gamePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bankAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fngDate",
          "type": "u32"
        },
        {
          "name": "lamport",
          "type": "u64"
        },
        {
          "name": "fng",
          "type": "u8"
        }
      ]
    },
    {
      "name": "configFng",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "configPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "configPda",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ownerAccount",
            "type": "publicKey"
          },
          {
            "name": "oracleAccount",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "gamePda",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "betCount",
            "type": "u32"
          },
          {
            "name": "oracle",
            "type": "u8"
          },
          {
            "name": "games",
            "type": {
              "vec": {
                "defined": "Games"
              }
            }
          }
        ]
      }
    },
    {
      "name": "playerPda",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "betCount",
            "type": "u8"
          },
          {
            "name": "playerBets",
            "type": {
              "vec": {
                "defined": "PlayerBet"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Games",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fng",
            "type": "u8"
          },
          {
            "name": "lamport",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "PlayerBet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fng",
            "type": "u8"
          },
          {
            "name": "lamport",
            "type": "u64"
          },
          {
            "name": "day",
            "type": "u32"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidArgument",
      "msg": "The arguments provided to a program instruction where invalid"
    },
    {
      "code": 6001,
      "name": "InvalidArgument700",
      "msg": "[700] The arguments provided to a program instruction where invalid"
    },
    {
      "code": 6002,
      "name": "InvalidArgument701",
      "msg": "[701] The arguments provided to a program instruction where invalid"
    },
    {
      "code": 6003,
      "name": "InvalidArgument702",
      "msg": "[702] The arguments provided to a program instruction where invalid"
    },
    {
      "code": 6004,
      "name": "IllegalOwner",
      "msg": "Provided owner is not allowed"
    },
    {
      "code": 6005,
      "name": "BetExist",
      "msg": "Bet allready exist."
    },
    {
      "code": 6006,
      "name": "TooMuchBet",
      "msg": "Too much bet."
    },
    {
      "code": 6007,
      "name": "NoBet",
      "msg": "No bet found."
    }
  ]
};
